const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 15,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    min: 8,
  },
  team: {
    type: String,
  },
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
  date: { type: Date, default: Date.now },
});

userSchema.pre('save', function (next) {
  let user = this;

  if (user.isModified('password')) {
    bcrypt.genSalt(saltRounds)
    .then(salt => {
      return bcrypt.hash(user.password, salt);
    })
    .then((hash) => {
      user.password = hash;
      next();
    })
    .catch((err) => {
      return next(err);
    });
  } else next();
});

userSchema.methods.comparePassword = async function (plainPassword) {
  return bcrypt
  .compare(plainPassword, this.password)
  .then((isMatch) => isMatch)
  .catch((err) => err);
}

userSchema.methods.generateToken = function() {
  const token = jwt.sign(this._id.toHexString(), 'secretToken');
  this.token = token;
  return this.save()
  .then((user) => user)
  .catch((err) => err);
};

userSchema.statics.findByToken = function(token) {
  let user = this;

  return jwt.verify(token, 'secretToken', function (err, decoded) {
    return user
          .findOne({ _id: decoded, token: token })
          .then((user) => user)
          .catch((err) => err);
  });
};

const User = mongoose.model('User', userSchema);
module.exports = { User };