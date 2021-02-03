const { render } = require('ejs');
const { Router } = require('express');

const authController = require('../controllers/authController');

const { requireAuth, checkUser,check_admin } = require('../middleware/authMiddleware');

const router = Router();

router.get('/signup', authController.signup_get);
router.post('/signup', authController.signup_post);

router.get('/login', authController.login_get);
router.post('/login', authController.login_post);

router.get('/logout', authController.logout_get);
router.get('/topic', requireAuth,authController.topic_get);

router.get('/question',requireAuth, authController.question_get);
router.get('/topic', requireAuth,authController.topic_get);


//router.get('/index/:topic',authController.question_get);

router.post('/topic', authController.topic_post);
router.post('/added',requireAuth, authController.added_post);
router.get('/experience',(req,res)=>{res.render('company')});
router.get('/experience/:company',authController.company_get);
router.post('/thanku',authController.thanku_post);
router.post('/company',authController.company_post);
module.exports = router;