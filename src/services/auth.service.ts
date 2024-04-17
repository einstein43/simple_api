import "reflect-metadata";

import { container, inject, injectable } from "tsyringe";
import AuthRepository from "../repositories/auth.repository";
import authRepository from "../repositories/auth.repository";

container.register("IAuthRepository", {
  useClass: AuthRepository,
});

@injectable()
export class AuthService {
  constructor(
    @inject("IAuthRepository") private authRepository: AuthRepository
  ) {
    this.auth = this.auth.bind(this);
  }

  public async auth(username: string, password: string) {
    try {
     return await this.authRepository.auth(username, password);

      
    } catch (error: any) {
      return { status: 500, message: error.message };
    }
  }
}
