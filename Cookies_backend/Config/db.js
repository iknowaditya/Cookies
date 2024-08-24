const mongoose = require("mongoose");

async function connectMongoDB(authUser) {
  return mongoose.connect(authUser);
}

module.exports = { connectMongoDB };
