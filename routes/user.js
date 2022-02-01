const express = require('express');
const router = express.Router();

const { signup, signin } = require('../controllers/user');

router.get('/', (req, res) => {
    res.send('Hello user!');
});

router.post('/signup', signup);
router.post('/signin', signin);

module.exports = router;