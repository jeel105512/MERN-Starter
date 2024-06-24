import express from "express";

import {
  register,
  login,
  google,
  googleCallback,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/google", google);
router.get("/google/callback", googleCallback);

export default router;