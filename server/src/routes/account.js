var express = require('express');
var router = express.Router();

var accountService = require("../services/accountService");
var userService = require('../services/userService');
var emailService = require("../services/emailService");


/* User sends email and password information, server replies with JWT token */
router.post('/login', async (req, res, next) => {
    const { email, password } = req.body;
    var idToken = await accountService.signInWithEmail(email, password);

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
    const { email, password, pInfo, role, role1, files } = req.body;

    var data = await userService.createUserAccount(email, password, pInfo, role);
    await userService.createUserInhouse(data.uid, email, pInfo, role, role1, files);

    await emailService.createUserEmail(data.uid, email, password, pInfo, role);
    
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