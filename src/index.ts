import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const app = express();
app.use(
  cors({
    credentials: true,
  }),
);
app.use(compression());
app.use(bodyParser.json());
app.use(cookieParser());

app.listen(8080, () => {
  console.log("Server is running on http://localhost:8080/");
});

const MongoUri = process.env.MongoUri;

mongoose.Promise = Promise;
mongoose.connect(MongoUri as string);
mongoose.connection.on("error", (err: Error) => console.log(err));
