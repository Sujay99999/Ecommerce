const { v4: uuidv4 } = require("uuid");
const axios = require("axios");

const PaytmChecksum = require("./../utils/PaytmChecksum");
const AppError = require("./../utils/AppError");

exports.initiateTransaction = async (req, res, next) => {
  try {
    // 1) Make sure that the user is logged in
    if (!req.user) {
      return next(new AppError(401, "Please log in again"));
    }

    // 2) Get the total amount and the email from the req.body
    let { transactionAmount, email } = req.body;

    // Make sure to conver the integer value to the string
    transactionAmount = JSON.stringify(transactionAmount);

    if (req.user.email !== email) {
      return next(
        new AppError(
          401,
          "The transaction initiated doesnt seem to be coming from the same user"
        )
      );
    }

    // 3) Get all the details required for the transaction
    let paytmTransactionParams = {};

    // Make sure to add the details to the body of the obj
    paytmTransactionParams.body = {
      requestType: "Payment",
      mid: process.env.PAYTM_MERCHANT_ID,
      websiteName: process.env.PAYTM_WEBSITE_NAME,
      orderId: uuidv4(),
      callbackUrl: process.env.PAYTM_CALLBACK_URL,
      txnAmount: {
        value: transactionAmount,
        currency: "INR",
      },
      userInfo: {
        custId: req.user._id,
        email: req.user.email,
        firstName: req.user.name.split(" ")[0],
        lastName: req.user.name.split(" ")[1],
      },

      // add goods key too ..
    };

    const paytmChecksumResultHash = await PaytmChecksum.generateSignature(
      JSON.stringify(paytmTransactionParams.body),
      process.env.PAYTM_MERCHANT_KEY
    );

    paytmTransactionParams.head = {
      signature: paytmChecksumResultHash,
    };
    console.log(paytmTransactionParams.head.signature);
    // console.log(
    //   paytmTransactionParams.head.signature === paytmChecksumResultHash
    // );
    console.log(paytmTransactionParams.body.orderId);
    // console.log(
    //   `${JSON.stringify({
    //     mid: process.env.PAYTM_MERCHANT_ID,
    //     orderId: paytmTransactionParams.body.orderId,
    //   })}`
    // );
    // console.log("key is ", process.env.PAYTM_MERCHANT_KEY);

    // const isVerifySignature = await PaytmChecksum.verifySignature(
    //   JSON.stringify(paytmTransactionParams.body),
    //   process.env.PAYTM_MERCHANT_KEY,
    //   paytmChecksumResultHash
    // );
    // if (!isVerifySignature)

    const post_data = JSON.stringify(paytmTransactionParams);
    console.log(
      `https://securegw-stage.paytm.in/theia/api/v1/initiateTransaction?mid=${process.env.PAYTM_MERCHANT_ID}&orderId=${paytmTransactionParams.body.orderId}`
    );
    console.log(JSON.stringify(paytmTransactionParams));

    const transactionResponse = await axios({
      url: `https://securegw-stage.paytm.in/theia/api/v1/initiateTransaction?mid=${process.env.PAYTM_MERCHANT_ID}&orderId=${paytmTransactionParams.body.orderId}`,
      method: "POST",
      body: paytmTransactionParams,
      // port: 1234,
      headers: {
        "Content-Type": "application/json",
        "Content-Length": JSON.stringify(paytmTransactionParams).length,
        Accept: "*/*",
      },
    });

    // 4) Send back the response
    console.log(transactionResponse.data.data);
    res.status(transactionResponse.status).json({
      status: transactionResponse.statusText,
      data: transactionResponse.data,
    });
  } catch (error) {
    next(error);
  }
};
