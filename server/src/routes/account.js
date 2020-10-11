const express = require('express');
const router = express.Router();

const accountService = require("../services/accountService");
const userService = require('../services/userService');

/* User sends email and password information, server replies with JWT token */
router.post('/login', async (req, res, next) => {
    const { email, password } = req.body;
    const idToken = await accountService.signInWithEmail(email, password);

    res.json({
        status: 200,
        data: {
            idToken: idToken
        },
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
    });
});

/* Register a new admin account */
router.post('/account', async (req, res, next) => {
    const { email, password} = req.body;

    const data = await accountService.createPersonAccount(email, password);
    //await accountService.createPersonProfile(data.uid, email);
    
    res.json({
        status: 200,
        response: "USER_CREATED",
        data: data,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
    });
    
});