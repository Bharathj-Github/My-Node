const mongoose = require('mongoose');
const schema = require('./schema');

const model = new mongoose.model("registration",schema);

module.exports = model