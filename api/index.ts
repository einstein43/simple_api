import "reflect-metadata";
import cors from "cors";
import express, { Request, Response } from "express";
import { AuthController } from "./controllers/auth.controller.js";
import { container } from "tsyringe";
import { AuthService } from "./services/auth.service";
import { AuthRepository } from "./repositories/auth.repository";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());
app.options("*", cors());
app.use(
  cors({
    origin: "*", // Replace with your frontend domain
    methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // Specify allowed headers
  })
);

const authController = container.resolve(AuthController);

app.post("/auth", async (req: Request, res: Response) => {
  return await authController.auth(req, res);
});

app.get("/", (req: Request, res: Response) => {
  res.send(
    "Welcome to The Clinic's API. Contact the network administrator for more information."
  );
});

app.listen(4000, () => {
  console.log(`Server running`);
});

module.exports = app;
