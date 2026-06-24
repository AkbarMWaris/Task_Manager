const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
<<<<<<< HEAD
    lowercase: true,
    match: [/^[^\s@]+@[^\s@]+\.(com|in)$/i, 'Email must end with .com or .in']
=======
    lowercase: true
>>>>>>> c0c4e34b8870a2d6bd3634d9e56ef0971caa6570
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function () {
<<<<<<< HEAD
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
=======
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  
>>>>>>> c0c4e34b8870a2d6bd3634d9e56ef0971caa6570
});

// Compare entered password with hashed password
userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Never send password hash back in JSON responses
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

module.exports = mongoose.model('User', userSchema);
