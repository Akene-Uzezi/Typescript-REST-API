import express from "express";
import _ from "lodash";
const { merge, get, identity } = _;
import { getUserBySessionToken } from "../db/users.js";

const isAuthenticated = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  try {
    const sessionToken = req.cookies["authcook"];
    if (!sessionToken) {
      return res.sendStatus(403);
    }
    const existingUser = await getUserBySessionToken(sessionToken);
    if (!existingUser) {
      return res.sendStatus(403);
    }
    merge(req, { identity: existingUser });

    next();
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
};

export { isAuthenticated };
