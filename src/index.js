const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');   
const register = require('./Controllers/POST/Register.js');
const login = require('./Controllers/POST/Login.js');
const googleLogin = require('./Controllers/POST/GoogleLogin.js');
const sendLink = require('./Controllers/POST/SendLink.js');
const resetPassword = require('./Controllers/POST/ResetPassword.js');
const addNote = require('./Controllers/POST/AddNote.js')
const getNotes = require('./Controllers/GET/GetNotes.js');
const updateNote = require('./Controllers/PUT/UpdateNote.js');
const archiveNote = require('./Controllers/PUT/ArchiveNote.js');
const deleteNote = require('./Controllers/DELETE/DeleteNote.js');
const restoreNote = require('./Controllers/PUT/RestoreNote.js');
const changePassword = require('./Controllers/PUT/ChangePassword.js');
const logout = require('./Controllers/PUT/Logout.js');
const connectDB = require('./Database/db.js');
const app = express();
const PORT = 4000;

connectDB();

app.use(express.json());
app.use(cors({
    origin: 'https://note-taking-app-front-end.netlify.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
    optionsSuccessStatus: 200
}));
app.use((req, res, next) => { 
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups'); 
    next();
});
app.use(cookieParser())
app.use(register);
app.use(login);
app.use(sendLink);
app.use(resetPassword);
app.use(addNote);
app.use(getNotes);
app.use(updateNote);
app.use(archiveNote);
app.use(deleteNote);
app.use(restoreNote);
app.use(changePassword);
app.use(logout);
app.use(googleLogin);

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

module.exports = app;