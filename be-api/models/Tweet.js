var mongoose = require('mongoose');
var TweetSchema = new mongoose.Schema({
  userFullName: String,
  text: String
});
module.exports = mongoose.model('Tweet', TweetSchema);
