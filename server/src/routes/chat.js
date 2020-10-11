const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const { SessionsClient } = require('dialogflow');
const serviceAccount = require('../../diastole1147-ce8a2cd176c4.json')

router.post("/sendMessage", async (req, res, next) => {

  try {

    const { queryInput, sessionId } = req.body;

    const sessionClient = new SessionsClient({ credentials: serviceAccount });
    const session = sessionClient.sessionPath('diastole1147', sessionId);


    const responses = await sessionClient.detectIntent({ session, queryInput});

    const result = responses[0].queryResult;
    
    res.json({
      status: 200,
      response: result
    });

  } catch (err) {
    throw createError(err);
  }

});

module.exports = router;