<!-- API -->

This server application exposes only an API that provides the details of the products

/products ==> Gives all the products of all categories available
/products/category ==> Returns a array of all categories available
/products/category/:categoryName/brands ==> Gives an array of all brands of the product
/products/category/:categoryName ==> Gives all the products of the respective category available
/products/:productId ==> Gives the detailed info of the product

API Features

FILTER ==> <feildName>[<mongoDB operator>]=<value>
?finalPrice[lte]=5000
Please use this only in very specific cases

MATCH ==> true/false
?verified=true
This is used to filter out all the unverified products

FILTERSPECIFIC ==> <feildName>=<value>
?brand=MI
Make sure that the url is encoded for the spaces

SORT ==>
?sort=finalPrice,fullName

SELECT ==> low/high
?feildsCapacity=low

PAGINATION ==>
?page=5&limit=10
The default values for limit is 5
The total product count is present in the response

/users/login-basic => Logs in with the provided email and password and returns you back the jwt
/users/signup-basic => Creates a new user with the provided email and password and returns you back the jwt
/users/google + /users/google/redirect => Logs in with the google and returns back the jwt
/users/github + /users/github/redirect => Logs in with the github and returns back the jwt

/users/forgetPassword => Sends back a reset token to the email of the user
/users/resetPassword => Verifies the token provides as a query parameter, and updates the password

/users/updatePassword => Updates the password when the user is authenticated only

/users/addWishlistProduct/:productId => Adds a new product to the wishlist
/users/getAllWishlistProduct => Gets all the products available in the wishlist

/forgetPassword => Allows the user to be sent a mail enabling him to recover his password with a special token
/resetPassword => Allows the user to update his password when the valid reset token is provided

/me => Returns the basic profile information of the user, if AUTHENTICATED

/payments => Iniaties a transaction and returns the transactionId and the checksum with the other parameters

<!-- DATABASES -->

1. Products
2. Users
3. Bookings
