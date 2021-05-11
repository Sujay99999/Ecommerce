<!-- API -->

This server application exposes only an API that provides the details of the products

/products ==> Gives all the products of all categories available
/products/category ==> Returns a array of all categories available
/products/category/:categoryName ==> Gives all the products of the respective category available
/products/:productId ==> Gives the detailed info of the product

/users/login-basic => Logs in with the provided email and password and returns you back the jwt
/users/signup-basic => Creates a new user with the provided email and password and returns you back the jwt
/users/google + /users/google/redirect => Logs in with the google and returns back the jwt
/users/github + /users/github/redirect => Logs in with the github and returns back the jwt

/users/forgetPassword => Sends back a reset token to the email of the user
/users/resetPassword => Verifies the token provides as a query parameter, and updates the password

/users/updatePassword => Updates the password when the user is authenticated only

/forgetPassword => Allows the user to be sent a mail enabling him to recover his password with a special token
/resetPassword => Allows the user to update his password when the valid reset token is provided

/me => Returns the basic profile information of the user, if AUTHENTICATED

<!-- DATABASES -->

1. Products
   Here, we have all products of all categories in one database
   Each product has a key named category, that places it in its respective category
