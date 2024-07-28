var express = require("express");
var router = express.Router();
const RatingModel = require("../modals/Rating");
const authenticateToken = require("../autheticateToken");

/* GET ratings listing. */
router.get("/", authenticateToken, async function (req, res) {
  let ratings = await RatingModel.find({});
  res.send(ratings);
});
router.get("/:id", authenticateToken, async function (req, res) {
  let rating = await RatingModel.findById(req.params.id);
  res.send({
    email: rating.userId,
    address: rating.storeId,
    name: rating.rating,
    createdDate: rating.createdDate,
    updatedDate: rating.updatedDate,
    deletedDate: rating.deletedDate,
  });
});
router.post("/", async function (req, res) {
  try {
    const SaveRating = new RatingModel(req.body);
    const rating = await SaveRating.save();
    res.json({ rating });
  } catch (error) {
    console.log(error);
    throw error;
  }
});

// Delete by id
router.delete("/:id", async function (req, res) {
  const rating = await RatingModel.findByIdAndDelete(req.params.id);
  res.send(rating);
});

// Update by id
router.put("/:id", async function (req, res) {
  const rating = await RatingModel.findByIdAndUpdate(req.params.id, req.body);
  res.send(rating);
});

module.exports = router;
