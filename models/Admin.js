const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  // privilages: {type: String,
  //   enum: ["admin"],
  //   required: true,},
});

// Before saving the employee, hash the password
adminSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
      return next();
    }
  
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  
    next();
  });
  
  adminSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };



const Admin = mongoose.model('Admin', adminSchema);

// adminSchema.methods.comparePassword = function(stringPass, hashPass) {
//     return await bcrypt.compare(stringPass, hashPass)
//   };

module.exports = Admin;
