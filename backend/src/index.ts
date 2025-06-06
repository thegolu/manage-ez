import express from "express";
import dotenv from "dotenv";
import connectMongo from "./database/mongo";
import { errorMiddleware } from "./middlewares/error.middleware";
import cookieParser from "cookie-parser";
import SetupRoutes from "./modules";
import { responseMiddleware } from "./middlewares/response.middleware";

const { error: envError } = dotenv.config({
  path: [
    `${__dirname}/../.env`, // for local development purpose
    `${__dirname}/../.${process.env.NODE_ENV || "dev"}.env`,
  ],
});

if (envError) {
  console.log("Error loading environment variables", envError);
  process.exit(1);
}

connectMongo();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(responseMiddleware);

SetupRoutes(app);

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
