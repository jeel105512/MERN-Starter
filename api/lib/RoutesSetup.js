import authRoutes from "../routes/auth.routes.js";
import userRoutes from "../routes/user.routes.js";

export default (app) => {
  app.use("/api/auth", authRoutes);
  app.use("/api/protected/user", userRoutes);
};
