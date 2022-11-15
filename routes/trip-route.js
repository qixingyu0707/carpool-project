const router = require("express").Router();
const Trip = require("../models").trip;
const tripValidation = require("../validation").tripValidation;

router.use((req, res, next) => {
  console.log("trip route正在接受一個request...");
  next();
});

// 獲得系統中的所有課程
router.get("/", async (req, res) => {
  try {
    let tripFound = await Trip.find({})
      .populate("driver", ["username", "email"]) //populate是mongoose里的语法可以显示这个driver的名字而不是数字id
      .exec(); //exec会变成一个promise
    return res.send(tripFound);
  } catch (e) {
    return res.status(5000).send(e);
  }
});

// 用Driver id來尋找課程
router.get("/driver/:_driver_id", async (req, res) => {
  let { _driver_id } = req.params;
  let tripsFound = await Trip.find({ driver: _driver_id })
    .populate("driver", ["username", "email"])
    .exec(); //exec会变成一个promise
  return res.send(tripsFound);
});

// 用passenger id來尋注册過的課程
router.get("/passenger/:_passenger_id", async (req, res) => {
  let { _passenger_id } = req.params;
  let tripsFound = await Trip.find({ passengers: _passenger_id })
    .populate("driver", ["username", "email"])
    .exec();
  return res.send(tripsFound);
});

// 用行程名稱尋找trip
router.get("/findByName/:name", async (req, res) => {
  let { name } = req.params;
  try {
    let tripFound = await Trip.find({ title: name })
      .populate("driver", ["email", "username"])
      .exec();
    return res.send(tripFound);
  } catch (e) {
    return res.status(500).send(e);
  }
});

// 用行程id尋找trip
router.get("/:_id", async (req, res) => {
  let { _id } = req.params;
  try {
    let tripFound = await Trip.findOne({ _id })
      .populate("driver", ["email"])
      .exec();
    return res.send(tripFound);
  } catch (e) {
    return res.status(500).send(e);
  }
});

// 新增課程
router.post("/", async (req, res) => {
  // 驗證數據符合規範
  let { error } = tripValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  if (req.user.isPassenger()) {
    return res
      .status(400)
      .send(
        "Only Driver can post new trip. If you are Driver please login with Driver account."
      );
  }

  let { title, description, price } = req.body;
  try {
    let newTrip = new Trip({
      title,
      description,
      price,
      driver: req.user._id,
    });
    let savedTrip = await newTrip.save();
    return res.send("new trip has been saved.");
  } catch (e) {
    console.log(Trip);
    console.log(e);
    return res.status(500).send("Can not make new trip.");
  }
});

// 讓學生透過課程id來註冊新課程
router.post("/enroll/:_id", async (req, res) => {
  let { _id } = req.params;
  try {
    let trip = await Trip.findOne({ _id }).exec();
    trip.passengers.push(req.user._id);
    await trip.save();
    return res.send("Your enroll is successful!");
  } catch (e) {
    return res.send(e);
  }
});

// 更改行程
router.patch("/:_id", async (req, res) => {
  // 驗證數據符合規範
  let { error } = tripValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let { _id } = req.params;
  // 確認行程存在
  try {
    let tripFound = await Trip.findOne({ _id });
    if (!tripFound) {
      return res
        .status(400)
        .send("Can not find trip, not able to update trip.");
    }

    // 使用者必須是此trip driver，才能編輯行程
    if (tripFound.driver.equals(req.user._id)) {
      let updatedTrip = await Trip.findOneAndUpdate({ _id }, req.body, {
        new: true,
        runValidators: true,
      });
      return res.send({
        message: "trip has been update successfully!",
        updatedTrip,
      });
    } else {
      return res
        .status(403)
        .send("Only the driver of this trip can edit the trip.");
    }
  } catch (e) {
    return res.status(500).send(e);
  }
});

router.delete("/:_id", async (req, res) => {
  let { _id } = req.params;
  // 確認行程存在
  try {
    let tripFound = await Trip.findOne({ _id }).exec();
    if (!tripFound) {
      return res.status(400).send("Can not find trip not able to delete.");
    }

    // 使用者必須是此行程driver，才能刪除行程
    if (tripFound.driver.equals(req.user._id)) {
      await Trip.deleteOne({ _id }).exec();
      return res.send("Trip has been deleted.");
    } else {
      return res
        .status(403)
        .send("Only the driver of this trip can delete the trip.");
    }
  } catch (e) {
    return res.status(500).send(e);
  }
});

module.exports = router;
//student
//course
//instructor
