const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const authRoute = require("./routes").auth;
const tripRoute = require("./routes").trip;
const passport = require("passport");
require("./config/passport")(passport);
const cors = require("cors");

// 連結MongoDB
mongoose
  .connect("mongodb://localhost:27017/mernDB")
  .then(() => {
    console.log("連結到mongodb...");
  })
  .catch((e) => {
    console.log(e);
  });

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/user", authRoute);
// trip route應該被jwt保護
// 只有在你的HTTP request里面有夹带token才能使用这个trip route
// 如果request header內部沒有jwt，則request就會被視為是unauthorized
// 如果在下面这样设置了middleware的话 每一个与/api/trips有关的都会去执行passport.authenticate
// passport.authenticate会使用passport.js里面的JwtStrategy
app.use(
  "/api/trips",
  passport.authenticate("jwt", { session: false }),
  tripRoute
);

//因为react会预设使用3000所以我们最好要错开 使用8080
app.listen(8080, () => {
  console.log("後端伺服器聆聽在port 8080...");
});
