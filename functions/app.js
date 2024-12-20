const express = require('express'); 
const serverless = require('serverless-http'); 
const app = express(); 
const router = express.Router();

router.get('/', (req, res) => { 
    res.status(200).send('Hello World!'); 
}); 

app.use("/.netlify/functions/app", router);
module.exports.handler = serverless(app);