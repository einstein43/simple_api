import "reflect-metadata";

import express, { Request, Response } from 'express';
import { AuthController } from './controllers/auth.controller';
import { container } from "tsyringe";
import { AuthService } from './services/auth.service';
import AuthRepository from './repositories/auth.repository';

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;


const authController = container.resolve(AuthController);
const authService = container.resolve(AuthService);
const authRepository = container.resolve(AuthRepository);

app.post('/auth', async (req: Request, res: Response) => {
    return await authController.auth(req, res);
  });


  app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
  });


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });

  module.exports = app;