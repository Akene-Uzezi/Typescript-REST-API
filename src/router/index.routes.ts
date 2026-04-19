import express from "express";
import authentication from "./authentication.routes.js";
import users from "./users.routes.js";
const router = express.Router();

export default (): express.Router => {
  authentication(router);
  users(router);
  return router;
};
