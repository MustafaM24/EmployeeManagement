// // Create a file named "models.js"

// const mongoose = require('mongoose');

// const employeeSchema = new mongoose.Schema({
//   employee: { type: String, required: true },
//   // project: {type: mongoose.Schema.Types.ObjectId, ref: 'Project'},
//   projects: [{type: mongoose.Schema.Types.ObjectId, ref: 'Project'}],
//   department: [{type: mongoose.Schema.Types.ObjectId, ref: 'Department'}],
//   // Add other properties specific to an employee

// }, { timestamps: true });

// const Employee = mongoose.model('Employee', employeeSchema);


// module.exports = Employee

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  // employeeId: { type: String, required: true },
  email: { type: String, required: true },
  password: {type: String, required: true},
  // privilages: {type: String,
  //   enum: ['employee'],
  //   required: true,},
  project: [{type: mongoose.Schema.Types.ObjectId, ref: 'Project'}],
  department: [{type: mongoose.Schema.Types.ObjectId, ref: 'Department'}],
  contact: [{
    phone: { type: String },
    address: { type: String }
  }],
  personalDetails: [{
    dateOfBirth: { type: Date },
    gender: { type: String },
    maritalStatus: { type: String },
    nationality: { type: String }
  }],
  employmentHistory: [{
    employer: { type: String },
    jobTitle: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    responsibilities: { type: String }
  }],
  performanceReviews: [{
    date: { type: Date },
    criteria: { type: String },
    rating: { type: Number },
    comments: { type: String },
    goals: { type: String }
  }],
  documents: [{ type: String }],
  trainingPrograms: [{ program: {type: String} }],
  performanceMetrics: [{
    metric: { type: String },
    value: { type: Number }
  }],
  feedback: [{
    date: { type: Date },
    message: { type: String }
  }]
}, { timestamps: true });

// Before saving the employee, hash the password
employeeSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

employeeSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};



// const Admin = mongoose.model('Admin', adminSchema);

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
