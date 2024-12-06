const express = require('express');
const router = express.Router();

router.put('/logout', async (req, res) => {
    res.clearCookie('accessToken');
    res.status(200).send('User has been logged out');
});

module.exports = router;