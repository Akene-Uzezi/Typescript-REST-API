import express from "express";
import { deleteUser, getAllUsers } from "../controllers/users.controller.js";
import { isAuthenticated } from "../middlewares/checkAuth.js";

export default (router: express.Router) => {
  router.get("/users", isAuthenticated, getAllUsers);
  router.delete("/users/:id", isAuthenticated, deleteUser);
};
