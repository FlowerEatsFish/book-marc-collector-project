import collect from './collect.js';

const targetLibraryList = [
  '淡江大學圖書館',
  '國立成功大學圖書館',
  '臺北市立圖書館',
  '國立臺灣大學圖書館',
  '國家圖書館',
];

const getTargetData = database => new Promise((resolve) => {
  let isMatch = false;
  let res = {
    target: null,
    data: null,
  };
  for (const library of targetLibraryList) {
    for (const data of database) {
      if (data.library.includes(library)) {
        res = {
          target: library,
          data,
        };
        resolve(res);
        isMatch = true;
        break;
      }
    }
  }
  if (!isMatch) {
    res = {
      target: '無',
      data: null,
    };
    resolve(res);
  }
});

const getDatabase = async (isbn) => {
  const database = await collect(isbn);
  const data = await getTargetData(database.results);
  const res = {
    isbn,
    library: data.data.library,
    target: data.target,
    url: data.data.url,
  };
  // console.log(`data: ${JSON.stringify(data)}`);
  return res;
};

export default getDatabase;
