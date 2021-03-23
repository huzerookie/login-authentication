const { mongoose } = require('./mongoose');
const validator = require("validator");
const bcrypt = require("bcrypt");
// First Name, Last Name, Email ID, Password, a unique employeeID and Organization Name
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
    //Custom Validator
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid Email");
      }
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  employeeId: {
    type: String,
    required: true,
    trim: true
  },
  organization: {
    type: String,
    required: true,
    trim: true,
  }
});

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid Credentials");
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) throw new Error("Invalid Credentials");
  return user;
}

userSchema.statics.checkDuplicates = async (email) => {
  const user = await User.findOne({ email });
  if (user) throw new Error('Please register with a different email or Login');
  return user;
}
const User = mongoose.model("User", userSchema);
module.exports = User

