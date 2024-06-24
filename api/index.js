import express, { urlencoded } from "express";
import dotenv from "dotenv";
import MongooseSetup from "./lib/MongooseSetup.js";
import RoutesSetup from "./lib/RoutesSetup.js";
// import PassportSetup from "./lib/PassportSetup.js";
import "./lib/PassportSetup.js";
import passport from "./lib/PassportSetup.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(urlencoded({ extended: true }));

// Set up mongoose
MongooseSetup();
// Initialize Passport
app.use(passport.initialize());
// Set up routes
RoutesSetup(app);

app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal server error";
  res.status(statusCode).json({
    success: false,
    status: statusCode,
    message,
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on: http://localhost:${port}`);
});
