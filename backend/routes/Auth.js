const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
let fetchuser = require("../Middleware/fetchuser");
const JWT_SECRET = "qwertyuio";
//Create a user
router.post(
  "/createuser",
  [
    body("email", "Enter Valid email").isEmail(),
    body("name", "Enter Name with more than 2 characters").isLength({ min: 3 }),
    body("password", "minimum length of 3").isLength({ min: 5 }),
  ],
  async (req, res) => {

    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success , errors: errors.array() });
    }

    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({success , error: "User Already exists!" });
      }

      const salt = await bcrypt.genSalt(10);
      const NewPass = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        name: req.body.name,
        password: NewPass,
        email: req.body.email,
      });

      //     .then((user) => res.json(user));

      const data = {
        user: {
          id: user.i,
        },
      };

      const token_ = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({success ,  token_ });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("error occured");
    }
  }
);

//Authenticating user
router.post(
  "/login",
  [
    body("email", "Enter Valid email").isEmail(),
    // body("name", "Enter Name with more than 2 characters").isLength({ min: 3 }),
    body("password", "Should not be empty").exists(),
  ],
  async (req, res) => {
   let success = false 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
  
    
    try {
      let user = await User.findOne({ email });
      if (!email) {
        return res.status(400).json({ success ,error: "Invalid Details" });
      }

      const passCompare = await bcrypt.compare(password, user.password);
      if (!passCompare) {
        return res.status(400).json({ success,error: "Invalid Details" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };

      const token_ = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success , token_ });


    } catch (error) {
      console.error(error.message);
      res.status(500).send("error occured");
    }
  }
);

//Get User Details from Token

router.post(
  "/getuser",
 fetchuser,
  async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    try {
       userId = req.user.id;
       console.log(req.user.id);
      let user_ = await User.findById(userId).select("-password");
      res.send(user_);
      console.log(user_);


      
      
    } catch (error) {
      console.error(error.message);
      res.status(500).send("error occured");
      
    }


  });

module.exports = router;
