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
const path = require("path");
const port = process.env.PORT || 8080; //process.env.PORT是Heroku自动动态设定

// 連結MongoDB
mongoose
  .connect(process.env.MONGODB_CONNECTION)
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
//云端专用
app.use(express.static(path.join(__dirname), "client", "build"));

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
//云端
if (
  process.env.NODE_ENV === "production" ||
  process.env.NODE_ENV === "staging"
) {
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname), "client", "build", "index.html");
  });
}

//因为react会预设使用3000所以我们最好要错开 使用8080
app.listen(port, () => {
  console.log("後端伺服器聆聽在port 8080...");
});
