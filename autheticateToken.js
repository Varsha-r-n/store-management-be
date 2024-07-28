const JWT_SECRET = "ayivddkkeezbdsjxhzurjzixekoiipnq";
const jwt = require("jsonwebtoken");
const { listen } = require("./app");

const UserModel = require("./modals/User");
const RoleModel = require("./modals/Role");

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

async function checkAdmin(req, res, next) {
  let findUser = await UserModel.findById(req.user.id);
  if (findUser) {
    let findRole = await RoleModel.findById(findUser.userRole);
    if (findRole && findRole.role_name === "admin") {
      next();
    } else {
      res.status(401).json({ message: "not authorised" });
    }
  }
}

async function checkStoreOwnerRole(req, res, next) {
  let findUser = await UserModel.findById(req.user.id);
  if (findUser) {
    let findRole = await RoleModel.findById(findUser.userRole);
    if (findRole && findRole.role_name === "store_owner") {
      next();
    } else {
      res.status(401).json({ message: "not authorised" });
    }
  }
}

async function checkAdminOrStoreOwnerRole(req, res, next) {
  let findUser = await UserModel.findById(req.user.id);
  if (findUser) {
    let findRole = await RoleModel.findById(findUser.userRole);
    console.log(findRole)
    if (
      findRole &&
      (findRole.role_name === "store_owner" || findRole.role_name === "admin")
    ) {
      next();
    } else {
      res.status(401).json({ message: "not authorised" });
    }
  }
}

module.exports = {
  authenticateToken,
  checkAdmin,
  checkStoreOwnerRole,
  checkAdminOrStoreOwnerRole,
};
