import collect from './collect';

const targetLibraryList = [
  '淡江大學圖書館',
  '國立成功大學圖書館',
  '臺北市立圖書館',
  '國家圖書館',
  '國立臺灣大學圖書館',
  '國立臺灣師範大學圖書館',
  '國立陽明大學圖書館',
  '臺北醫學大學圖書館',
  '國立中正大學圖書館',
  '國立中央大學圖書館',
  '國立中山大學圖書館',
  '新北市立圖書館',
  '臺中市立圖書館',
  '輔仁大學圖書館',
  '國立高雄科技大學圖書館',
  '國立高雄師範大學圖書館',
  '國立屏東大學圖書館',
  '國立公共資訊圖書館',
  '中央警察大學圖書館',
  '南投縣政府文化局圖書館',
  '臺東縣政府文化處圖書館',
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
