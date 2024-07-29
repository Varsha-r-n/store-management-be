var express = require("express");
var router = express.Router();
const StoreModel = require("../modals/Store");
const UserModel =  require("../modals/User");
const RoleModel = require("../modals/Role");
const {
  authenticateToken,
  checkAdminOrStoreOwnerRole
} = require("../autheticateToken");

//checks if user is admin or not
async function checkStoreCRUDAccess(req, res, next) {
  let user = await UserModel.findById(req.user.id);
  if (user) {
    let findRole = await RoleModel.findById(user.userRole);
    if (findRole && findRole.role_name === "admin") {
      next();
    } else {
      if (findRole.role_name === "store_owner") {
        const findStore = await StoreModel.findById(req.params.id);
        if (findStore.createdBy === req.user.id) {
          next();
        } else {
          res.status(401).json({ message: "not authorised" });
        }
      } else {
        res.status(401).json({ message: "not authorised" });
      }
    }
  }
}

/* GET stores listing. */
router.get("/", [authenticateToken], async function (req, res) {
  let stores = await StoreModel.find({});
  res.send(stores);
});
router.get("/:id", [authenticateToken], async function (req, res) {
  let store = await StoreModel.findById(req.params.id);
  res.send({
    name: store.name,
    email: store.email,
    address: store.address,
    createdDate: rating.createdDate,
    updatedDate: rating.updatedDate,
    deletedDate: rating.deletedDate,
  });
});
router.post(
  "/",
  [authenticateToken, checkAdminOrStoreOwnerRole],
  async function (req, res) {
    try {
      req.body["createdBy"] = req.user.id;
      const Savestore = new StoreModel(req.body);
      const store = await Savestore.save();
      res.json({ store });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

// Delete by id
router.delete(
  "/:id",
  [authenticateToken, checkStoreCRUDAccess],
  async function (req, res) {
    const store = await StoreModel.findByIdAndDelete(req.params.id);
    res.send(store);
  }
);

// Update by id
router.put("/:id", [authenticateToken, checkStoreCRUDAccess], async function (req, res) {
  const store = await StoreModel.findByIdAndUpdate(req.params.id, req.body);
  res.send(store);
});

module.exports = router;
