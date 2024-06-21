import express, { urlencoded } from "express";
import dotenv from "dotenv";
import MongooseSetup from "./lib/MongooseSetup.js";
import RoutesSetup from "./lib/RoutesSetup.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(urlencoded({ extended: true }));

MongooseSetup();
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
