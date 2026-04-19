import express from "express";
import { getAllUsers } from "../controllers/users.controller.js";
import { isAuthenticated } from "../middlewares/checkAuth.js";

export default (router: express.Router) => {
  router.get("/users", isAuthenticated, getAllUsers);
};
