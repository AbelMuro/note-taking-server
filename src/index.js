const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');   
const register = require('./Controllers/POST/Register.js');
const login = require('./Controllers/POST/Login.js');
const googleLogin = require('./Controllers/POST/GoogleLogin.js');
const sendLink = require('./Controllers/POST/SendLink.js');
const resetPassword = require('./Controllers/POST/ResetPassword.js');
const addNote = require('./Controllers/POST/AddNote.js')
const account = require('./Controllers/GET/Account.js');
const getNotes = require('./Controllers/GET/GetNotes.js');
const updateNote = require('./Controllers/PUT/UpdateNote.js');
const archiveNote = require('./Controllers/PUT/ArchiveNote.js');
const deleteNote = require('./Controllers/DELETE/DeleteNote.js');
const restoreNote = require('./Controllers/PUT/RestoreNote.js');
const changePassword = require('./Controllers/PUT/ChangePassword.js');
const logout = require('./Controllers/PUT/Logout.js');
const connectDB = require('./Database/db.js');
const app = express();
const router = express.Router();
const PORT = 4000;

connectDB();

app.use(express.json());
app.use(cors({
    origin: ['https://note-taking-app-front-end.netlify.app', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
    optionsSuccessStatus: 200
}));
app.use(cookieParser())
app.use('/.netlify/functions/app', register);
app.use('/.netlify/functions/app/login', login);
app.use('/.netlify/functions/app', sendLink);
app.use('/.netlify/functions/app', resetPassword);
app.use('/.netlify/functions/app', account);
app.use('/.netlify/functions/app', addNote);
app.use('/.netlify/functions/app', getNotes);
app.use('/.netlify/functions/app', updateNote);
app.use('/.netlify/functions/app', archiveNote);
app.use('/.netlify/functions/app', deleteNote);
app.use('/.netlify/functions/app', restoreNote);
app.use('/.netlify/functions/app', changePassword);
app.use('/.netlify/functions/app', logout);
app.use('/.netlify/functions/app', googleLogin);

router.get('/', (req, res) => {
    res.status(200).send('Hello World')
})

app.use('/.netlify/functions/app', router)

app.listen(PORT, (error) => {
    if(error){
        console.log(error);
        return;
    }

    console.log(`Server is running in port ${PORT}`);
})

module.exports = app;