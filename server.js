const express = require('express');
const mongoose = require('mongoose');

const app = express();
// Require the employees router
const employeesRouter = require('./routes/employees.js');
const departmentsRouter = require('./routes/departments.js');
const projectsRouter = require('./routes/projects.js');

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
// mongoose.connect(uri, 
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//     .then(() => {
//       console.log('Connected to MongoDB');
//     })
//     .catch((error) => {
//       console.error('Error connecting to MongoDB:', error);
//     });
  

app.get('/ping', (req, res) => {
  res.sendStatus(200);
});

// Use the employees router
app.use('/api/employees', employeesRouter.router);
app.use('/api/departments', departmentsRouter.router);
app.use('/api/projects', projectsRouter.router);

// app.use('/api/employees', employeesRouter.employees);
// app.use('/api/departments', departmentsRouter.departments);
// app.use('/api/projects', projectsRouter.projects);


// mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log('Connected to MongoDB');
//   })
//   .catch((error) => {
//     console.error('Error connecting to MongoDB:', error);
//   });
// // Event for successful connection
// mongoose.connection.on('connected', () => {
//   console.log('Connected to MongoDB');
// });
// async function connectToMongoDB() {
//   try {
//     await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
//     console.log('Connected to MongoDB');
//   } catch (error) {
//     console.error('Error connecting to MongoDB:', error);
//   }
// }
// connectToMongoDB();

// // Event for connection error
// mongoose.connection.on('error', (error) => {
//   console.error('Error connecting to MongoDB:', error);
// });

// // Event for disconnected connection
// mongoose.connection.on('disconnected', () => {
//   console.log('Disconnected from MongoDB');
// });
// mongoose.connect(uri, 
// {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => {
//     console.log('Connected to MongoDB');
//   })
//   .catch((error) => {
//     console.error('Error connecting to MongoDB:', error);
//   });


// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

// mustafamadraswala
// PasswordEmployee24,SNctmZJIsmtOLjnP
// const uri = "mongodb+srv://mustafamadraswala:<PasswordEmployee24>@cluster0.go26hms.mongodb.net/?retryWrites=true&w=majority";
