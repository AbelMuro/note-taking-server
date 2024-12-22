const serverless = require('serverless-http'); 
const app = require('../src/index.js'); 
const connectDB = require('../src/Database/db.js');

const handler = serverless(app);
module.exports.handler = async (e, context) => {
    await connectDB();
    const result = await handler(e, context);
    return result;
};