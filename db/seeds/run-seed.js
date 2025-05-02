const devData = require("../data/development-data/index.js");
const testData = require("../data/test-data/index.js");
const seed = require("./seed.js");
const db = require("../connection.js");

const runSeed = () => {
  if (
    process.env.NODE_ENV === "development" ||
    process.env.NODE_ENV === "production"
  ) {
    return seed(devData).then(() => db.end());
  } else {
    return seed(testData).then(() => db.end());
  }
};

runSeed();
