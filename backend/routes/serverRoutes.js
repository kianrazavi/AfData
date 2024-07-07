const express = require('express');
const router = express.Router();
const Survey = require('../models/surveyModel');

// Route for creating surveys
router.post('/', async (req, res) => {
  const newSurvey = new Survey(req.body);
  try {
    await newSurvey.save();
    res.status(201).send(newSurvey);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Route for webhook data (responses)
router.post('/webhook', (req, res) => {
  // Process incoming webhook data from WhatsApp
  console.log(req.body);
  res.sendStatus(200);
});

// Route to get all surveys
router.get('/', async (req, res) => {
  try {
    const surveys = await Survey.find();
    res.status(200).send(surveys);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Route to get a specific survey by ID
router.get('/:id', async (req, res) => {
  try {
    const survey = await Survey.findById(req.params.id);
    if (survey) {
      res.status(200).send(survey);
    } else {
      res.status(404).send('Survey not found');
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

// Route for submitting survey responses
router.post('/responses', async (req, res) => {
  const { surveyId, phoneNumber, answers } = req.body;
  try {
    const survey = await Survey.findById(surveyId);
    if (survey) {
      survey.surveyResponses.push({
        phoneNumber,
        answers
      });
      await survey.save();
      res.status(200).send('Response submitted successfully');
    } else {
      res.status(404).send('Survey not found');
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

// Mock endpoint to simulate WhatsApp webhook
router.post('/mock-webhook', async (req, res) => {
  const mockData = req.body;
  // Process the mock data as if it were coming from the WhatsApp webhook
  try {
    const survey = await Survey.findById(mockData.surveyId);
    if (survey) {
      survey.surveyResponses.push({
        phoneNumber: mockData.phoneNumber,
        answers: mockData.answers, // Ensure answers are processed correctly
      });
      await survey.save();
      res.status(200).send('Mock data processed successfully');
    } else {
      res.status(404).send('Survey not found');
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
