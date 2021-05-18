const express = require("express");
const passport = require("passport");

const User = require("./../models/UserModel");

const connectRouter = require("./../routes/connectRoutes");

const authController = require("../controllers/authControllers");
const userController = require("../controllers/userControllers");

const router = express.Router();

// const passportJWTCustomCallback = ()

router.use("/connect", connectRouter);

router.post(
  "/signup-basic",
  authController.basicSignup,
  authController.createCookie
);

router.post(
  "/login-basic",
  authController.basicLogin,
  authController.createCookie
);

router.post("/forgetPassword", authController.basicForgetPassword);
router.patch(
  "/basicResetPassword/:resetToken",
  authController.basicResetPassword,
  authController.createCookie
);

router.patch(
  "/updateMyPassword",
  authController.passportWrapperMiddleware,
  authController.updatePassword
);

router.get(
  "/google",
  (req, res, next) => {
    console.log("called from 1st call");
    next();
  },
  passport.authenticate("google", {
    session: false,
    scope: ["profile", "email"],
  })
);
router.get(
  "/google/redirect",
  authController.passportWrapperMiddleware,
  passport.authenticate("google", {
    session: false,
    scope: ["profile", "email"],
    failureRedirect: "/",
  }),
  // middleware for sending the cookie back to the browser
  authController.createCookie
);

router.use(
  "/protected",
  authController.passportWrapperMiddleware,
  (req, res, next) => {
    res.send(req.user);
  }
);

router.get(
  "/getAllWishlistProduct",
  authController.passportWrapperMiddleware,
  userController.getAllWishlistItems
);
router
  .route("/addWishlistProduct/:productId")
  .post(
    authController.passportWrapperMiddleware,
    userController.addWishlistItem
  )
  .delete(
    authController.passportWrapperMiddleware,
    userController.deleteWishlistItem
  );

module.exports = router;
