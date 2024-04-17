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
      const response = await this.authService.auth(username, password);
      if (response) {
        return res.status(response.status).json(response);
      } else {
        return res.status(500).json({ message: "Response is undefined" });
      }
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
}
