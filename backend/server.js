require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const workoutRoutes = require('./routes/workoutRoutes');
const userRoutes = require('./routes/userRoutes');

// Initialize the app
const app = express();

// Middlewares
// this middleware parse the req.body to json and return it
app.use(express.json());

// Our logger middleware
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// GET request
app.get('/', (req, res) => {
  res.send('Hello to the app');
});

// Workouts Api requests
app.use('/api/workouts', workoutRoutes);

// Users Api requests
app.use('/api/user', userRoutes);

// Connect to MongoDB and listen to requests
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // Connect to DB and listening to requests
    app.listen(process.env.PORT, () => {
      console.log(
        `Server is connected to DB and listening on PORT=${process.env.PORT}`
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });
