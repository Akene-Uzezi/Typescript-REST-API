import crypto from "crypto";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
dotenv.config();
export const random = () => crypto.randomBytes(128).toString("base64");
export const authentication = async (password: string): Promise<string> => {
  return bcrypt.hash(password, 12);
};
export const verify = async (
  password: string,
  hashedPassword: string,
): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};
