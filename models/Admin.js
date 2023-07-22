// const mongoose = require('mongoose');

// const adminSchema = new mongoose.Schema({
//   adminName: { type: String, required: true },
//   email: {type: String, required: true},
//   password: {type: String, required: true}
//   // Add other properties specific to a department
// }, { timestamps: true });

// const Admin = mongoose.model('Admin', adminSchema);

// module.exports = Admin

// // Create a file named "models.js"

// const mongoose = require('mongoose');

// const AdminSchema = new mongoose.Schema({
//   Admin: { type: String, required: true },
//   // project: {type: mongoose.Schema.Types.ObjectId, ref: 'Project'},
//   projects: [{type: mongoose.Schema.Types.ObjectId, ref: 'Project'}],
//   department: [{type: mongoose.Schema.Types.ObjectId, ref: 'Department'}],
//   // Add other properties specific to an Admin

// }, { timestamps: true });

// const Admin = mongoose.model('Admin', AdminSchema);


// module.exports = Admin







// const mongoose = require('mongoose');

// const AdminSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   // AdminId: { type: String, required: true },
//   email: { type: String, required: true },
//   username: { type: String, required: true },
//   password: { type: String, required: true },
// }, { timestamps: true });

// const Admin = mongoose.model('Admin', AdminSchema);

// module.exports = Admin;




const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
<<<<<<< Updated upstream

=======
  privileges: { type: String, default: 'admin' },
  // privilages: {type: String,
  //   enum: ["admin"],
  //   required: true,},
>>>>>>> Stashed changes
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
