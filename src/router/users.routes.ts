import express from "express";
import {
  deleteUser,
  getAllUsers,
  getPhotos,
  getSPhotos,
} from "../controllers/users.controller.js";
import { isAuthenticated } from "../middlewares/checkAuth.js";

export default (router: express.Router) => {
  router.get("/users", isAuthenticated, getAllUsers);
  router.get("/photos", getPhotos);
  router.get("/photos/:id", getSPhotos);
  router.delete("/users/:id", isAuthenticated, deleteUser);
};
