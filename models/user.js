const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// User schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Register user
userSchema.statics.registerUser = async function (username, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new this({ username, password: hashedPassword });
  return newUser.save();
};

// Login user
userSchema.statics.loginUser = async function (username, password) {
  const user = await this.findOne({ username });
  if (!user) throw new Error('User not found');

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error('Invalid credentials');

  const token = jwt.sign({ userId: user._id }, 'secretKey');
  return token;
};

const User = mongoose.model('User', userSchema);
module.exports = User;
