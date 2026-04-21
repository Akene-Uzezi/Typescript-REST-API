import express from "express";
import { createUser, getUserByEmail } from "../db/users.js";
import { authentication, random, verify } from "../helpers/auth.helper.js";
import redisClient from "../helpers/redisClient.helper.js";

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.sendStatus(400);
    }

    const user = await getUserByEmail(email).select("+authentication.password");
    if (!user) {
      return res.sendStatus(400);
    }
    const isMatch = await verify(password, user.authentication!.password);
    if (!isMatch) {
      return res.sendStatus(403);
    }
    user.authentication!.sessionToken = await authentication(
      user._id.toString(),
    );
    await user.save();
    res.cookie("authcook", user.authentication!.sessionToken, {
      domain: "localhost",
      path: "/",
    });
    res.status(200).json(user).end();
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
};

export const register = async (req: express.Request, res: express.Response) => {
  const key = "users:all";
  try {
    const { email, password, username } = req.body;
    if (!email || !password || !username) {
      return res.sendStatus(400);
    }
    const existingUser = await getUserByEmail(email);
    if (existingUser) return res.sendStatus(400);
    const user = await createUser({
      email,
      username,
      authentication: {
        password: await authentication(password),
      },
    });
    console.log("clear cache");
    await redisClient.del(key);
    return res.status(200).json(user).end();
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
};
