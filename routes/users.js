var express = require('express');
var router = express.Router();
const UserModel = require("../modals/User")
const RoleModel = require("../modals/Role");

const jwt = require('jsonwebtoken');
const JWT_SECRET = "ayivddkkeezbdsjxhzurjzixekoiipnq";
const authenticateToken = require('../autheticateToken');


async function defaultUserRun() {
  let findAdminRole = await RoleModel.find({ role_name: "admin" });
  let findAdmin = await UserModel.find({email: 'admin@gmail.com'});
  if(findAdminRole.length > 0 && findAdmin.length === 0){
    const defaultUser = {
      email: 'admin@gmail.com',
      address: 'admin address',
      name: 'admin',
      password:'admin',
      userRole: findAdminRole[0]['_id'],
    }
    const SaveUser = new UserModel(defaultUser)
    const user = await SaveUser.save();
  }
}
defaultUserRun()

//checks if user is admin or not
async function checkAdmin(req, res, next){
  let findUser = await UserModel.findById(req.user.id);
  if(findUser){
    let findRole = await RoleModel.findById(findUser.userRole);
    if(findRole && findRole.role_name === 'admin'){
      next();
    }else{
      res.status(401).json({message: "not authorised"})
    }
  }
  
}

/* GET users listing. */
router.get('/', [authenticateToken, checkAdmin], async function(req, res) {
  
  let users = await UserModel.find({});
  res.send(users);
});
router.get('/:id', authenticateToken, async function(req, res) {
  let user = await UserModel.findById(req.params.id);
  res.send({
    email: user.email,
    address: user.address,
    name: user.name,
    userRole: user.userRole,
    createdDate: rating.createdDate,
    updatedDate: rating.updatedDate,
    deletedDate: rating.deletedDate,
  });
});
router.post('/register', async function(req, res) {
  try{
    let findNormalUserRole = await RoleModel.find({ role_name: "normal_user" });
    if(findNormalUserRole.length === 0){
      res.error('normal user role not found')
    }
    const roleId = findNormalUserRole[0]['_id'];
    req.body['userRole'] = roleId;
    console.log(req.body);
    const SaveUser = new UserModel(req.body)
    const user = await SaveUser.save();
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET);
    res.json({ token });
  }catch(error){
    console.log(error);
    throw error;
  }
});

router.post('/login', async function(req, res, next) {
  try{
     const loginCredentials = {
      email: req.body.email,
      password: req.body.password
     }
    let user = await UserModel.find(loginCredentials);
    console.log(loginCredentials)
    if(user.length > 0){
      user = user[0];
      const token = jwt.sign({ id: user.id, username: user.email }, JWT_SECRET);
      res.json({ token, id: user.id });
    }else{
      res.status(403).send('Unauthorized')
    }
  }catch(error){
    console.log(error);
    throw error;
  }
});

module.exports = router;
