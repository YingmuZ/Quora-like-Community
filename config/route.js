const express = require('express');
const router = express.Router();

const apps = require('../controller/userControl');
const control = require('../controller/questionControl')
const auth = require('../middleware/authentication');


router.all('*', auth.checkUser);
router.get('/', apps.homepage);
router.get('/auth', apps.showAuthPage);
router.get('/logOut', apps.loggingOut);
router.post('/signUp', apps.signUp);
router.post('/logIn', apps.logIn);


module.exports = router;