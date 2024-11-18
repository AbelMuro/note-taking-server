const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');   
const register = require('./Controllers/POST/Register.js');
const login = require('./Controllers/POST/Login.js');
const sendLink = require('./Controllers/POST/SendLink.js');
const resetPassword = require('./Controllers/POST/ResetPassword.js');
const account = require('./Controllers/GET/Account.js');
const connectDB = require('./Database/db.js');
const app = express();
const PORT = 4000;

connectDB();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
    optionsSuccessStatus: 200
}));
app.use(cookieParser())

app.use(register);
app.use(login);
app.use(sendLink);
app.use(resetPassword);
app.use(account);

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