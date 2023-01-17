const express = require('express');
const bcrypt = require('bcryptjs');

const jsonwebtoken = require('jsonwebtoken');
const {registration,login,userdata} = require('../controllers/userController');
const auth = require('../middleware/auth');
const router = express.Router();

module.exports = router;

router.post('/api/v1/saveUser',registration);
router.post('/api/v1/loginUser',login);
router.post('/api/v1/userdata',userdata);


