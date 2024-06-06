import express, { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { container, inject, injectable } from "tsyringe";

container.register("IAuthService", {
  useClass: AuthService,
});

@injectable()
export class AuthController {
  constructor(@inject("IAuthService") private authService: AuthService) {
    this.auth = this.auth.bind(this);
  }

  public async auth(req: Request, res: Response) {
    try {
      const username = req.body.username;
      const password = req.body.password;

      ////////////////////////// SQL Injection detection //////////////////////////
      if (username.includes("'") || password.includes("'")) {
        console.log("SQL Injection detected - controller layer");
        const mockResponse = await this.authService.SQLi(username, password);

        return res.status(201).json(mockResponse);

        /////////////////////////// SQL Injection end//////////////////////////
      } else {
        // Normal authentication process
        const response = await this.authService.auth(username, password);
        console.log("Login detected, no anomalies - controller layer");
        if (response) {
          return res.status(response.status).json(response);
        } else {
          return res
            .status(500)
            .json({ message: "Response is undefined - controller layer" });
        }
      }
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
}
