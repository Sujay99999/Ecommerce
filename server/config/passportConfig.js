const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const GitHubStrategy = require("passport-github2").Strategy;
// const facebookStrategy = require("passport-facebook").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const User = require("./../models/UserModel");

var extractCookieFn = function (req) {
  let jwtToken = null;
  console.log("req.headers", req.headers.authorization);
  if (req && req.cookies["jwt-cookie"]) {
    console.log("all cokkies present now are", req.cookies);
    jwtToken = req.cookies["jwt-cookie"];
    console.log(
      "cookies from passport-jwt callback",
      req.cookies["jwt-cookie"]
    );
    return jwtToken;
  }
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    //THE JAVASCRIPT IS with let and const is BLOCK SCOPED, NOT FUNCTION SCOPED
    console.log("oh yeahhh");
    jwtToken = req.headers.authorization.split(" ")[1];
    console.log("jwtToken is ", jwtToken);
    return jwtToken;
  }
  console.log("jwtToken is ", jwtToken);
  return jwtToken;
};
passport.use(
  new JwtStrategy(
    {
      // As the token can be either in the form of a cookie or a auth header, we use a custom token extractor fn
      jwtFromRequest: extractCookieFn,
      secretOrKey: process.env.JWT_SECRET,
      algorithms: ["HS256"],
      // passReqToCallback: true,
    },
    (jwtPayload, cb) => {
      // NOTE: As we are using a custom callback function, Here in the verify callback, we will only
      // get the decoded payload and pass it onto the custom callback function
      cb(null, jwtPayload);
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      passReqToCallback: true,
      proxy: true,
    },
    async (req, accessToken, refreshToken, profile, cb) => {
      try {
        if (!req.user) {
          // Case where the user signsup/ logsin  for the first time
          console.log("there is no req.user present");
          console.log(profile, accessToken);

          const user = await User.findOne({ googleId: profile.id });
          if (!user) {
            // Case where the user signs up for the first time
            const newUser = await User.create({
              name: profile.displayName,
              // NOTE: Make sure to only save the verified email address
              email: profile.emails[0].value,
              avatar: profile.photos[0].value,
              googleId: profile.id,
            });
            console.log("A new user is created and saved onto the DB");
            return cb(null, { user: newUser, provider: "google" });
          }
          console.log("An existing user is trying to log in");
          return cb(null, { user: user, provider: "google" });
        } else {
          // the case where, he is trying to connect with other account
          // NOTE: there is some inconsistency while logging with other google account, when the cookie is already present.
          // It is replacing the googleId, which must not be done
          console.log(
            "The user is already authenticated, but trying to add the google details to his user profile"
          );

          const user = await User.findById(req.user.id);

          if (!user.googleId) {
            await User.findByIdAndUpdate(req.user.id, { googleId: profile.id });
            console.log(
              "Added the googleid to the existing authenticated user"
            );
            return cb(null, { user: user, provider: "google" });
          }
          console.log("Trying to replace the already present googleID");
          throw new Error(
            "Trying to change the googleId of an existing authenticated user"
          );
        }
      } catch (error) {
        cb(error, false);
      }
    }
  )
);

// passport.use(
//   new GitHubStrategy(
//     {
//       clientID: process.env.GITHUB_CLIENT_ID,
//       clientSecret: process.env.GITHUB_CLIENT_SECRET,
//       callbackURL: process.env.GITHUB_CALLBACK_URL,
//       passReqToCallback: true,
//     },
//     (req, accessToken, refreshToken, profile, cb) => {
//       if (!req.user) {
//         console.log(profile.provider, accessToken);
//         cb(null, { id: profile.id, provider: profile.provider });
//       } else {
//         // the case where, he is trying to connect with other account
//         // NOTE: must add the new detils to the user, and then prvide the userid from the db
//         console.log(
//           " my work is succesfully. the user is trying to connect again with other social profile"
//         );
//         console.log("the current req.user is", req.user);
//         cb(null, req.user);
//       }
//     }
//   )
// );

// cant use facbook right now
// passport.use(
//   new facebookStrategy(
//     {
//       clientID: process.env.FACEBOOK_CLIENT_ID,
//       clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
//       callbackURL: process.env.FACEBOOK_CALLBACK_URL,
//       passReqToCallback: true,
//     },
//     (req, accessToken, refreshToken, profile, cb) => {
//       console.log(profile, accessToken);
//       cb(null, profile);
//     }
//   )
// );
