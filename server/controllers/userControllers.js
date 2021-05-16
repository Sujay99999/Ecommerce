const passport = require("passport");

const User = require("./../models/UserModel");
const AppError = require("./../utils/AppError");

exports.passportWrapperMiddleware = (req, res, next) => {
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
};

exports.getAllWishlistItems = async (req, res, next) => {
  try {
    // 1) Get the user details from the req.user._id
    // 2) Get all the documents from the wishlist array (make sure that the arr is populated)
    if (!req.user._id) {
      return next(new AppError(400, "Please login/ signup again"));
    }
    // console.log(req.user._id, req.params.productId);

    const { wishlistArr } = await User.findById(req.user._id);

    // 3) Send back the response
    res.status(200).json({
      status: "success",
      count: wishlistArr.length,
      data: wishlistArr,
    });
  } catch (error) {
    next(error);
  }
};

exports.addWishlistItem = async (req, res, next) => {
  try {
    // 1) Get the user details from the req.user._id
    // 2) Update the wishlist array with the new product, whose id is taken from the query paramter
    if (!req.params.productId) {
      return next(
        new AppError(400, "Please provide the product id in the url")
      );
    }
    console.log(req.user._id, req.params.productId);

    const { wishlistArr } = await User.findById(req.user._id);

    if (!wishlistArr) {
      return next(new AppError(400, "Please login/ signup again"));
    }

    wishlistArr.push(req.params.productId);
    // console.log(wishlistArr);

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        wishlistArr,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedUser) {
      return next(new AppError(400, "Please login/ signup again"));
    }

    // 3) Send back the response
    res.status(200).json({
      status: "success",
      count: updatedUser.wishlistArr.length,
      data: updatedUser.wishlistArr,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteWishlistItem = async (req, res, next) => {
  try {
    // 1) Get the user details from the req.user._id
    // 2) Update the wishlist array with the new product, whose id is taken from the query paramter
    if (!req.params.productId) {
      return next(
        new AppError(400, "Please provide the product id in the url")
      );
    }
    console.log(req.user._id, req.params.productId);

    const { wishlistArr } = await User.findById(req.user._id);
    if (!wishlistArr) {
      return next(new AppError(400, "Please login/ signup again"));
    }

    if (!wishlistArr.length) {
      return next(new AppError(400, "There are no products in the wishlist"));
    }

    // Delete that item from the arr
    const productIndex = wishlistArr.findIndex(
      (el) => el === req.params.productId
    );
    console.log(wishlistArr.length);
    wishlistArr.splice(productIndex, 1);
    console.log(wishlistArr.length);

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        wishlistArr,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedUser) {
      return next(new AppError(400, "Please login/ signup again"));
    }

    // 3) Send back the response
    res.status(200).json({
      status: "success",
      count: updatedUser.wishlistArr.length,
      data: updatedUser.wishlistArr,
    });
  } catch (error) {
    next(error);
  }
};
