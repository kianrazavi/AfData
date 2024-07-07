const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const surveyRoutes = require('./routes/serverRoutes');
const cors = require('cors'); // Import cors package

// Import Mongo URI
require('dotenv').config();

// Create the express app
const app = express();
const PORT = process.env.PORT || 5001;

// Mount middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/api/surveys', surveyRoutes);
app.use('/api', surveyRoutes);
app.use('/api/webhook', surveyRoutes); // Mounting webhook routes
app.use('/api/mock-webhook', surveyRoutes); // Mounting mock webhook routes

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
