const serverless = require('serverless-http'); 
const app = require('../src/index.js'); 
const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    res.send("App is running..");
});

app.use("/.netlify/functions/app", router);

module.exports.handler = serverless(app);