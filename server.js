const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const Joi = require('joi');


const app = express();
// Require the employees router
const employeesRouter = require('./routes/employees.js');
const departmentsRouter = require('./routes/departments.js');
const projectsRouter = require('./routes/projects.js');
const adminRouter = require('./routes/admin.js');

const auth = require('./Middleware/authenticate.js');

const uri = "mongodb+srv://admin:testadmin@cluster0.lg3speo.mongodb.net/?retryWrites=true&w=majority"
// Middleware
app.use(express.json());

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: true,
  maxPoolSize: 1000,
});

const db = mongoose.connection;

db.on("error", async function (error) {
  console.err("[❌ database] Connection error " + error);
  process.exit(); 
});

db.once("open", async function () {
  console.log("[🔌 database] Connected");
});

app.get('/ping', (req, res) => {
  res.sendStatus(200);
});


app.use('/api/employees', employeesRouter);
// app.use('/api/departments', departmentsRouter);
// app.use('/api/projects', projectsRouter);

// app.use('/api/admin', adminRouter)
// Add admin routes
app.use('/api/admin/employees', adminRouter); // Admin routes for employees
app.use('/api/admin/departments', departmentsRouter); // Admin routes for departments
app.use('/api/admin/projects', projectsRouter); // Admin routes for projects

// Employee routes accessible only by admins
// app.use('/api/employees', adminAuthMiddleware, employeesRouter); // Employee routes


// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

// Register a new user
app.post('/register', auth.register);

// Login
app.post('/login', auth.login);

// // Protected routes
// app.use('/api/employees', adminRouter);
// app.use('/api/departments', departmentsRouter);
// app.use('/api/projects', projectsRouter);


// mustafamadraswala
// PasswordEmployee24,SNctmZJIsmtOLjnP
// const uri = "mongodb+srv://mustafamadraswala:<PasswordEmployee24>@cluster0.go26hms.mongodb.net/?retryWrites=true&w=majority";
