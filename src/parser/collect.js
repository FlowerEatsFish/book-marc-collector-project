import axios from 'axios';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const isEmptyData = (htmlCode) => {
  if (htmlCode.includes('沒有查獲符合查詢條件的館藏')) {
    return true;
  }
  return false;
};

const getClassName = (htmlCode) => {
  if (htmlCode.includes('browseEntryData')) {
    return 'browseEntryData';
  } else if (htmlCode.includes('briefcitTitle')) {
    return 'briefcitTitle';
  } else if (htmlCode.includes('bibItemsEntry')) {
    return 'bibItemsEntry';
  }
  return null;
};

const parserDataText = (htmlCode, targetPosition, className) => {
  const hostname = 'http://nbinet3.ncl.edu.tw';
  let text = null;
  let { min, max } = 0;

  if (className !== 'bibItemsEntry') {
    min = htmlCode.indexOf('href="', targetPosition);
    max = htmlCode.indexOf('"', min + 7);
    text = `${hostname}${htmlCode.slice(min + 6, max)}`;
  } else {
    min = htmlCode.indexOf('&nbsp;', targetPosition);
    max = htmlCode.indexOf('</td>', min + 8);
    text = htmlCode.slice(min + 6, max);
    text = text.replace(' \n', '');
    text = text.replace(/<[^>]*>/gi, '');
  }
  return text;
};

const collectData = (htmlCode) => {
  const className = getClassName(htmlCode);
  const container = [];
  const targetPosition = [];
  let initial = 0;

  if (className === null) {
    container.push('無');
  } else {
    while (htmlCode.indexOf(className, initial) !== -1) {
      targetPosition.push(htmlCode.indexOf(className, initial));
      initial = htmlCode.indexOf(className, initial) + 1;
    }
    targetPosition.forEach((value) => {
      container.push(parserDataText(htmlCode, value, className));
    });
  }
  return container;
};

const collectHtmlCode = url => new Promise((resolve) => {
  axios({
    method: 'get',
    url,
  })
    .then((response) => {
      resolve(response.data);
    });
});

const setUrl = (type, value) => {
  let url = null;

  switch (type) {
    case 'isbn':
      url = `http://nbinet3.ncl.edu.tw/search~S1*cht/?searchtype=i&searcharg=${value}&searchscope=1`;
      break;
    case 'url':
      url = value;
      break;
    default:
      break;
  }
  return url;
};

const collectAllResult = async (isbn) => {
  const url = setUrl('isbn', isbn);
  let htmlCode = await collectHtmlCode(url);

  if (isEmptyData(htmlCode)) {
    return null;
  }

  let className = getClassName(htmlCode);
  let template = null;
  let container1 = [];
  let container2 = [];
  let container3 = [];

  switch (className) {
    case 'browseEntryData':
      console.log(`Run ${className}`);
      template = collectData(htmlCode);
      container1 = container1.concat(template);

      for (const value of container1) {
        htmlCode = await collectHtmlCode(value);
        className = getClassName(htmlCode);

        switch (className) {
          case 'briefcitTitle':
            template = collectData(htmlCode);
            container2 = container2.concat(template);
            await sleep(250);

            for (const value of container2) {
              htmlCode = await collectHtmlCode(value);
              template = collectData(htmlCode);
              template = {
                url: value,
                library: template,
              };
              container3 = container3.concat(template);
              await sleep(250);
            }
            break;
          case 'bibItemsEntry':
            template = collectData(htmlCode);
            template = {
              url: value,
              library: template,
            };
            container3 = container3.concat(template);
            await sleep(250);
            break;
          default:
            break;
        }
      }

      return container3;
    case 'briefcitTitle':
      console.log(`Run ${className}`);
      template = collectData(htmlCode);
      container2 = container2.concat(template);

      for (const value of container2) {
        htmlCode = await collectHtmlCode(value);
        template = collectData(htmlCode);
        template = {
          url: value,
          library: template,
        };
        container3 = container3.concat(template);
        await sleep(250);
      }

      return container3;
    case 'bibItemsEntry':
      console.log(`Run ${className}`);
      template = collectData(htmlCode);
      template = {
        url,
        library: template,
      };
      container3 = container3.concat(template);

      return container3;
    default:
      break;
  }
  return null;
};

const getDatabase = async (isbn) => {
  const res = {
    isbn,
    results: await collectAllResult(isbn),
  };
  return res;
};

export default getDatabase;
