const JWT_SECRET = "ayivddkkeezbdsjxhzurjzixekoiipnq";
const jwt = require("jsonwebtoken");
const { listen } = require("./app");
// Middleware to authenticate the token
const authenticateToken = (req, res, next) => {
  let token = req.headers.authorization;
  if (!token) return res.sendStatus(401);
  try {
    if (token.indexOf("Bearer") > -1) {
      token = token.split(" ")[1];
    }
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        console.log(err);
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = authenticateToken;
