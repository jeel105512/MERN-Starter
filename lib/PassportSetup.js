import passport from "passport";
import JwtStrategy from "passport-jwt/lib/strategy.js";
import ExtractJwt from "passport-jwt/lib/extract_jwt.js";
import GoogleStrategy from "passport-google-oauth20/lib/strategy.js";
import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";

// JWT Strategy configuration
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  "jwt",
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const user = await User.findById(jwt_payload.id);
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    } catch (err) {
      console.error(err);
      return done(err, false);
    }
  })
);

// Google OAuth Strategy Configuration
passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user already exists in our database
        let user = await User.findOne({ googleId: profile.id });
        if (user) {
          return done(null, user);
        }

        // If not, create a new user
        const generatedPassword =
          Math.random().toString(36).slice(-8) +
          Math.random().toString(36).slice(-8);
        const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
        user = new User({
          googleId: profile.id,
          name: profile.displayName,
          email: profile.email,
          password: hashedPassword,
          profilePicture: profile.photoURL,
        });
        await user.save();
        done(null, user);
      } catch (error) {
        console.error(error);
        done(error, false, { message: "Server error" });
      }
    }
  )
);

// Serialize and deserialize user methods (for sessions, if needed)
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
