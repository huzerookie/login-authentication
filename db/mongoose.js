const mongoose = require("mongoose");
//const mongooseURL = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/login-authentication-api';
const mongooseURL = 'mongodb+srv://huzerookie:A$$h0les@cluster0.fuaif.mongodb.net/login-authentication-api?retryWrites=true&w=majority'
//Connection Setup for Mongoose
console.log(mongooseURL)
mongoose.connect(mongooseURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true, //Creates indexes for faster record access
  useFindAndModify: false, //For avoiding deprication warnings
});

// const me = new User({
//   name: "       Tron             ",
//   email: "ASAS@FERFEF.EREFE",
//   password: "      someStrong     key11   ",
// });
// me.save()
//   .then((result) => console.log(result))
//   .catch((error) => console.log(error));
module.exports = {
  mongoose,
}