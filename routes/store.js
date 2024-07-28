var express = require("express");
var router = express.Router();
const StoreModel = require("../modals/Store");
const authenticateToken = require("../autheticateToken");

/* GET stores listing. */
router.get("/", authenticateToken, async function (req, res) {
  let stores = await StoreModel.find({});
  res.send(stores);
});
router.get("/:id", authenticateToken, async function (req, res) {
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
router.post("/", async function (req, res) {
  try {
    const Savestore = new StoreModel(req.body);
    const store = await Savestore.save();
    res.json({ store });
  } catch (error) {
    console.log(error);
    throw error;
  }
});

// Delete by id
router.delete("/:id", async function (req, res) {
  const store = await StoreModel.findByIdAndDelete(req.params.id);
  res.send(store);
});

// Update by id
router.put("/:id", async function (req, res) {
  const store = await StoreModel.findByIdAndUpdate(req.params.id, req.body);
  res.send(store);
});

module.exports = router;




