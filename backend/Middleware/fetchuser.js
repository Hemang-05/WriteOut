var jwt = require("jsonwebtoken");
const JWT_SECRET = "qwertyuio";
const User = require('../models/User');

const fetchuser = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "Not valid Token" });
  }

  try {
    //  console.log(token);
    
    const data = jwt.verify(token, JWT_SECRET);
    console.log(data);
    req.user = data.user;

    next();
  } catch (error) {
    res.status(401).send({ error: "Not valid Token" });
  }
};

module.exports = fetchuser;
