import collect from './collect.js';

const targetLibraryList = [
  '淡江大學圖書館',
  '國立成功大學圖書館',
  '臺北市立圖書館',
  '國立臺灣大學圖書館',
  '國家圖書館',
];

const isEmptyData = (data) => {
  if (data == null) {
    return true;
  }
  return false;
};

const setData = database => new Promise((resolve) => {
  let isMatch = false;
  let res = {
    target: null,
    data: {
      library: null,
      url: null,
    },
  };
  if (isEmptyData(database)) {
    res.target = '查無資料';
    resolve(res);
    isMatch = true;
  }
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
    res.target = '沒有符合特定圖書館的資料';
    resolve(res);
  }
});

const getDatabase = async (isbn) => {
  const database = await collect(isbn);
  const data = await setData(database.results);
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
