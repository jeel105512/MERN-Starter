import express from "express";
import passport from "passport";

import { profile } from "../controllers/user.controller.js";

const router = express.Router();

router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  profile
);

export default router;