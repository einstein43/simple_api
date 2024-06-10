import "reflect-metadata";

import { container, inject, injectable } from "tsyringe";
import { AuthRepository } from "../repositories/auth.repository";
import fs from "fs";
import path from "path";
import fetch from "node-fetch";
container.register("IAuthRepository", {
  useClass: AuthRepository,
});

@injectable()
export class AuthService {
  private logFilePath = path.join(__dirname, "../logs/logs.txt");

  constructor(
    @inject("IAuthRepository") private authRepository: AuthRepository
  ) {
    this.auth = this.auth.bind(this);
    this.SQLi = this.SQLi.bind(this);
  }

  private logToFile(message: string) {
    const timestamp = new Date().toISOString();
    const logMessage = `${timestamp} - ${message}\n`;
    fs.appendFile(this.logFilePath, logMessage, (err) => {
      if (err) {
        console.error("Failed to write to log file:", err);
      }
    });
  }

  public async auth(username: string, password: string) {
    console.log("Login detected, no anomalies - service layer");

    try {
      const response = await this.authRepository.auth(username, password);

      const logMsg =
        "Login detected: " +
        username +
        " " +
        password +
        " - " +
        response.message;
      console.log(logMsg);
      this.logToFile(logMsg);

       

      return response;
    } catch (error: any) {
      return { status: 500, message: error.message };
    }
  }

  public async SQLi(username: string, password: string) {
    const logMsg =
      "Login detected: " +
      username +
      " " +
      password +
      " - !!!!SQLi detected!!!!";
    console.log(logMsg);
    this.logToFile(logMsg);

    const url = "https://10.0.2.75/events";
    const body = {
      events: [
        "API Event",
        `SQL Injection detected: ${username} ${password} - ${logMsg}`,
      ],
    };
    const token =
      "eyJhbGciOiJFUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3YXp1aCIsImF1ZCI6IldhenVoIEFQSSBSRVNUIiwibmJmIjoxNzE3Njc5MDc5LCJleHAiOjE4MTc2NzkwNzksInN1YiI6ImFwaV93ZWIiLCJyYW5fYXMiOmZhbHNlLCJyYmFjX3JvbGVzIjpbMV0sInJiYWNfbW9kZSI6IndoaXRlIn0.AaukWtCBnZqgJoFm3qydDTycnrsUipCDQIqof7dcAN52iiRPpmovsfCi2D6GiNOKRIhuSbQ8V5y1921xZufMsJRNAGz2GSFgtA8IomQzVbxmcDtwS0x1AEy8nmbqjXXFJlTcrFN4HznhGBjff3w_Cu3XRJsDDEqZWv8AXSVRG2sBLr41";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Success:", data);
    } catch (error) {
      console.error("Error:", error);
    }

    // try {
    //   console.log("SQL Injection mock response being created - service layer");
    //   return await this.authRepository.SQLi();
    // } catch (error: any) {
    //   return { status: 500, message: error.message };
    // }
  }
}
