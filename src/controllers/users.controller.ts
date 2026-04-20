import express from "express";
import { deleteUserById, getUsers } from "../db/users.js";
const getAllUsers = async (req: express.Request, res: express.Response) => {
  try {
    const users = await getUsers();
    return res.status(200).json(users);
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

export { getAllUsers, deleteUser };
