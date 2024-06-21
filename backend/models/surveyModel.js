const mongoose = require('mongoose');

const surveySchema = new mongoose.Schema({
  companyName: String,
  surveyQuestion: String,
  surveyResponses: [
    {
      phoneNumber: String,
      response: String,
    },
  ],
});

module.exports = mongoose.model('Survey', surveySchema);
