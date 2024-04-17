import "reflect-metadata";

import express, { Request, Response } from "express";
import { AuthController } from "./controllers/auth.controller";
import { container } from "tsyringe";
import { AuthService } from "./services/auth.service";
import { AuthRepository } from "./repositories/auth.repository";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json());
//const port = process.env.PORT || 5000;

const authController = container.resolve(AuthController);

app.post("/auth", async (req: Request, res: Response) => {
  
  return await authController.auth(req, res);
});

app.get("/", (req: Request, res: Response) => {
  res.send("Hello0000000000 World!");
});

app.listen(5000, () => {
  console.log(`Server running at http://localhost:5000`);
});

module.exports = app;
