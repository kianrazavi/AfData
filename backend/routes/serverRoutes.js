const express = require('express');
const router = express.Router();
const Survey = require('../models/surveyModel');

router.post('/', async (req, res) => {
  const newSurvey = new Survey(req.body);
  try {
    await newSurvey.save();
    res.status(201).send(newSurvey);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post('/webhook', (req, res) => {
  // Process incoming webhook data from WhatsApp
  console.log(req.body);
  res.sendStatus(200);
});

module.exports = router;
