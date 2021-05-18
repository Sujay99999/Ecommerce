// This is the page that contains all the routes for users, who want want to expand their profile

const express = require("express");
const passport = require("passport");

const authController = require("./../controllers/authControllers");
const User = require("./../models/UserModel");

const router = express.Router();

router.use((req, res, next) => {
  passport.authenticate(
    "jwt",
    { session: false },
    async (err, jwtPayload, info) => {
      try {
        // Here, the data passed only is the decoded payload.
        if (err) {
          console.log(err);
          return next(err);
        }
        if (!jwtPayload) {
          console.log(
            "there is no user logged in intailly, so passing onto next middleware"
          );
          return next();
        }
        let verifiedUser;
        // 1) Get the decoded payload value from the cookie
        console.log("jwtpayload extracted is", jwtPayload);

        // 2) If the provider is google, verify if the verifiedUser really exists in the DB, and add it
        // directly to the verifiedUser
        if (jwtPayload.provider === "google") {
          verifiedUser = await User.findById(jwtPayload.id);

          if (!verifiedUser) {
            return next(
              new AppError(
                400,
                "User not found based on the cookie provided. Please log in again"
              )
            );
          }

          req.user = verifiedUser;
          console.log("the user added to the req", req.user);
          return next();
        }
        // 3) If the provider is the local strategy, veify the verifiedUser and also check for the password
        // property, and make sure that the token provided is valid
        if (jwtPayload.provider === "local") {
          verifiedUser = await User.findById(jwtPayload.id);
          if (!verifiedUser) {
            return next(
              new AppError(
                400,
                "User not found based on the cookie provided. Please log in again"
              )
            );
          }
          // check if the password has been changed
          // this might be the case when the jwt is extracted and used with another user -- very imp
          if (verifiedUser.checkPasswordChangedAtProperty(jwtPayload.iat)) {
            next(
              new AppError(
                401,
                "The password has been changed, Please log in again."
              )
            );
          }
        }
        req.user = verifiedUser;
        console.log("the user added to the req", req.user);
        return next();
      } catch (error) {
        next(error);
      }
    }
  )(req, res, next);
});

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
