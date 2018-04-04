const collect = require('./collect.js');

const targetLibraryList = [
  '淡江大學圖書館',
  '國立成功大學圖書館',
  '臺北市立圖書館',
  '國立臺灣大學圖書館',
  '國家圖書館',
];

const getTargetData = database => new Promise((resolve) => {
  let isMatch = false;
  for (const library of targetLibraryList) {
    for (const data of database) {
      if (data.library.includes(library)) {
        resolve(data);
        isMatch = true;
        break;
      }
    }
  }
  if (!isMatch) {
    resolve(null);
  }
});

const getDatabase = async (isbn) => {
  const database = await collect.getDatabase(isbn);
  const data = await getTargetData(database.results);
  console.log(`data: ${JSON.stringify(database.isbn)}`);
  console.log(`data: ${JSON.stringify(data)}`);
};

const isbnList = [
  9789861856216,
  9789861856469,
  9789861858456,
  9789861859828,
];

for (const isbn of isbnList) {
  getDatabase(isbn);
}
