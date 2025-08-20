const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = process.env.JWT_SECRET || "meowisacat@fav!pet.1";


router.post('/createUser', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must be at least 5 characters').isLength({ min: 5 }),
  body('userName', 'User name must be at least 3 characters').isLength({ min: 3 })
], async (req, res) => {

  let success = false;   // ✅ start with false

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success, errors: errors.array() }); // send success: false
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    const savedUser = await User.create({
      userName: req.body.userName,
      email: req.body.email,
      password: secPass
    });

    const data = {
      user: {
        id: savedUser.id
      }
    };
    const authToken = jwt.sign(data, JWT_SECRET);

    success = true; // ✅ on success
    res.json({ success, authToken });

  } catch (err) {
    console.error("🔥 Error caught:", err);
    if (err.code === 11000) {
      return res.status(400).json({ success, error: 'Email already in use' }); // send success: false
    }
    res.status(500).json({ success, error: 'Server error' });
  }
});




// Authenticate a user login
router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
  let success = false;
   const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
const {email , password} = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Please try to login with correct credentials" });
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      success = false;
      return res.status(400).json({ success , error: "Please try to login with correct credentials" });
    }
    const data = {
      user: {
        id: user.id
      }
    }
    const authToken = jwt.sign(data, JWT_SECRET);
    success = true;
    res.json({success , authToken });
  } catch (error) {
    console.error("🔥 Error caught:", error);
    res.status(500).send({ error: 'Server error' });
  }

});

//get logged in user details
router.post('/getUser',fetchuser, async (req, res) => {
  const userId = req.user.id;
  try {
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error("🔥 Error caught:", error);
    res.status(500).send({ error: 'Server error' });
  }
});   

module.exports = router;
