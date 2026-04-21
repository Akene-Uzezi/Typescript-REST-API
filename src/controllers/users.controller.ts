import express from "express";
import redisClient from "../helpers/redisClient.helper.js";
const expiration: number = 3600;
import { deleteUserById, getUsers } from "../db/users.js";
const getAllUsers = async (req: express.Request, res: express.Response) => {
  const key = "users:all";
  try {
    const cachedUsers = await redisClient.get(key);
    if (cachedUsers) {
      console.log("users hit");
      return res.status(200).json(JSON.parse(cachedUsers));
    } else {
      console.log("users hit");
      const users = await getUsers();
      redisClient.setEx(key, expiration, JSON.stringify(users));
      return res.status(200).json(users);
    }
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
};

const deleteUser = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    const deletedUser = await deleteUserById(id as string);
    return res.json(deletedUser);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

const getPhotos = async (req: express.Request, res: express.Response) => {
  try {
    const cachedData = await redisClient.get("photos");
    if (cachedData) {
      console.log("cache hit");
      return res.status(200).json(JSON.parse(cachedData));
    } else {
      console.log("cache miss");
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/photos",
      );
      const data = await response.json();
      redisClient.setEx("photos", expiration, JSON.stringify(data));
      return res.status(200).json(data);
    }
  } catch (err) {
    console.log(err);
    return res.sendStatus(404);
  }
};

const getSPhotos = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    const cachedData = await redisClient.get(`photos?albumId=${id}`);
    if (cachedData) {
      console.log("specific hit");
      return res.status(200).json(JSON.parse(cachedData));
    } else {
      console.log("specific miss");
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/photos/${id}`,
      );
      const data = await response.json();
      redisClient.setEx(
        `photos?albumId=${id}`,
        expiration,
        JSON.stringify(data),
      );
      return res.status(200).json(data);
    }
  } catch (err) {
    console.log(err);
    return res.sendStatus(404);
  }
};

export { getAllUsers, deleteUser, getPhotos, getSPhotos };
