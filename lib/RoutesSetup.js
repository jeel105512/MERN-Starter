import authRoutes from "../routes/auth.routes.js";

export default (app) => {
  app.use("/api/auth", authRoutes);
};
