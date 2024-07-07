const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the question schema
const QuestionSchema = new Schema({
  type: {
    type: String,
    enum: ['multiple_choice', 'true_false', 'short_answer', 'long_answer'],
    required: true
  },
  questionText: { type: String, required: true },
  options: [String], // Used for multiple choice questions
  correctAnswer: String, // Can be used for validation in true/false and multiple choice
});

// Define the answer schema
const AnswerSchema = new Schema({
  questionId: { type: Schema.Types.ObjectId, required: true },
  answer: Schema.Types.Mixed, // Mixed type to handle different types of answers
});

// Define the survey schema
const SurveySchema = new Schema({
  companyName: { type: String, required: true },
  surveyQuestions: [QuestionSchema],
  surveyResponses: [{
    phoneNumber: { type: String },
    answers: [AnswerSchema] // Array of answers
  }]
});

module.exports = mongoose.model('Survey', SurveySchema);
