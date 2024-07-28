var express = require("express");
var router = express.Router();
const RoleModel = require("../modals/Role");

const {authenticateToken, checkAdmin} = require("../autheticateToken");

async function defaultRoleRun() {
  let findAdminRole = await RoleModel.find({ role_name: "admin" });
  if (findAdminRole.length === 0) {
    const defaultAdmin = {
      role_name: "admin",
    };
    const defaultStoreOwner = {
      role_name: "store_owner",
    };
    const defaultNormalUser = {
      role_name: "normal_user",
    };
    const SaveAdminRole = new RoleModel(defaultAdmin);
    const admin = await SaveAdminRole.save();

    const SaveStoreOwnerRole = new RoleModel(defaultStoreOwner);
    const storeOwner = await SaveStoreOwnerRole.save();

    const SaveNormalUserRole = new RoleModel(defaultNormalUser);
    const normalUser = await SaveNormalUserRole.save();
  }
}

defaultRoleRun();

/* GET roles listing. */
router.get("/", [authenticateToken, checkAdmin], async function (req, res) {
  let roles = await RoleModel.find({});
  res.send(roles);
});
router.get("/:id", [authenticateToken, checkAdmin], async function (req, res) {
  let role = await RoleModel.findById(req.params.id);
  res.send({
    role_name: role.role_name,
    createdDate: rating.createdDate,
    updatedDate: rating.updatedDate,
    deletedDate: rating.deletedDate,
  });
});
router.post("/", [authenticateToken, checkAdmin], async function (req, res) {
  try {
    const SaveRole = new RoleModel(req.body);
    const role = await SaveRole.save();
    res.json({ role });
  } catch (error) {
    console.log(error);
    throw error;
  }
});

// Delete by id
router.delete("/:id", [authenticateToken, checkAdmin], async function (req, res) {
  const role = await RoleModel.findByIdAndDelete(req.params.id);
  res.send(role);
});

// Update by id
router.put("/:id", [authenticateToken, checkAdmin], async function (req, res) {
  const role = await RoleModel.findByIdAndUpdate(req.params.id, req.body);
  res.send(role);
});

module.exports = router;
