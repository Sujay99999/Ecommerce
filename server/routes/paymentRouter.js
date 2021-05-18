const express = require("express");

const paymentController = require("./../controllers/paymentControllers");
const authController = require("./../controllers/authControllers");

const router = express.Router();

router.post(
  "/",
  authController.passportWrapperMiddleware,
  paymentController.initiateTransaction
);

module.exports = router;
