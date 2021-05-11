// This is the page that contains all the routes for users, who want want to expand their profile

const express = require("express");
const passport = require("passport");

const authController = require("./../controllers/authControllers");

const router = express.Router();

router.use(passport.authenticate("jwt", { session: false }));

// Route for connecting the local User with google credentials
router.get(
  "/google",
  (req, res, next) => {
    console.log(
      "the req.user prior to connecting with other acc is ",
      req.user
    );
    next();
  },
  passport.authorize("google", {
    session: false,
    scope: ["profile", "email"],
  })
);

module.exports = router;
