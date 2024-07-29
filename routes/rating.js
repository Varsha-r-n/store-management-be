var express = require("express");
var router = express.Router();
const RatingModel = require("../modals/Rating");
const {authenticateToken, checkAdmin} = require("../autheticateToken");

//checks if user is admin or not
async function checkOwnAccess(req, res, next) {
  const ratingId = req.params.id;
  let user = await UserModel.findById(req.user.id);
  if (user) {
    let rating = await RatingModel.findById(ratingId);
    if(rating.userId === req.user.id){
      next();
    }else{
      res.status(401).json({ message: "not authorised" });
    }
  }
}

/* GET average ratings for all stores. */
router.get("/", [authenticateToken, checkAdmin], async function (req, res) {
  let ratings = await RatingModel.find({});
  res.send(ratings);
});
router.get("/:store_id", authenticateToken, async function (req, res) {
  let rating = await RatingModel.findById(req.params.store_id);
  res.send({
    email: rating.userId,
    address: rating.storeId,
    name: rating.rating,
    createdDate: rating.createdDate,
    updatedDate: rating.updatedDate,
    deletedDate: rating.deletedDate,
  });
});
router.post("/", authenticateToken, async function (req, res) {
  try {
    req.body.userId = req.user.id;
    console.log(req.body)
    const SaveRating = new RatingModel(req.body);
    const rating = await SaveRating.save();
    res.json({ rating });
  } catch (error) {
    console.log(error);
    throw error;
  }
});

// Delete by id
router.delete("/:id", [authenticateToken, checkOwnAccess], async function (req, res) {
  const rating = await RatingModel.findByIdAndDelete(req.params.id);
  res.send(rating);
});

// Update by id
router.put("/:id", [authenticateToken, checkOwnAccess], async function (req, res) {
  const rating = await RatingModel.findByIdAndUpdate(req.params.id, req.body);
  res.send(rating);
});

module.exports = router;
