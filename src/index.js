const express = require('express');
const cors = require('cors');
const register = require('./Controllers/POST/Register.js');
const connectDB = require('./Database/db.js');
const app = express();
const PORT = 4000;

connectDB();

app.use(express());
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
    optionsSuccessStatus: 200
}));

app.use(register);

app.get('/', (req, res) => {
    res.status(200).send('Hello World')
})

app.listen(PORT, (error) => {
    if(error){
        console.log(error);
        return;
    }

    console.log(`Server is running in port ${PORT}`);
})