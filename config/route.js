const express = require('express');
const router = express.Router();

const apps = require('../controller/userControl');
const control = require('../controller/questionControl');
const auth = require('../middleware/authentication');


router.all('*', auth.checkUser);
router.get('/', apps.homepage);
router.get('/auth', apps.showAuthPage);
router.get('/logOut', apps.loggingOut);
router.post('/signUp', apps.signUp);
router.post('/logIn', apps.logIn);

router.get('/addQuestion', auth.checkToken, control.addQuestion)
router.post('/postQuestion', control.postQuestion)

router.all('/question/:id', control.viewQuestion)

router.all('/question/edit/:id', control.editQuestion)
router.get('/question/delete/:id', control.deleteQuestion)
router.get('/comment/delete/:id', control.deleteComment)


module.exports = router;