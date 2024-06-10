"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
require("reflect-metadata");
const tsyringe_1 = require("tsyringe");
const auth_repository_1 = require("../repositories/auth.repository");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
tsyringe_1.container.register("IAuthRepository", {
    useClass: auth_repository_1.AuthRepository,
});
let AuthService = class AuthService {
    constructor(authRepository) {
        this.authRepository = authRepository;
        this.logFilePath = path_1.default.join(__dirname, "../logs/logs.txt");
        this.auth = this.auth.bind(this);
        this.SQLi = this.SQLi.bind(this);
    }
    logToFile(message) {
        const timestamp = new Date().toISOString();
        const logMessage = `${timestamp} - ${message}\n`;
        fs_1.default.appendFile(this.logFilePath, logMessage, (err) => {
            if (err) {
                console.error("Failed to write to log file:", err);
            }
        });
    }
    auth(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Login detected, no anomalies - service layer");
            try {
                const response = yield this.authRepository.auth(username, password);
                const logMsg = "Login detected: " + username + " " + password + " - " + response.message;
                console.log(logMsg);
                this.logToFile(logMsg);
                fetch("https://localhost:55000/events", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ logMsg }),
                });
                return response;
            }
            catch (error) {
                return { status: 500, message: error.message };
            }
        });
    }
    SQLi(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const logMsg = "Login detected: " +
                username +
                " " +
                password +
                " - !!!!SQLi detected!!!!";
            console.log(logMsg);
            this.logToFile(logMsg);
            const url = 'https://172.0.2.75:55000/events';
            const body = {
                events: [
                    "API Event",
                    `SQL Injection detected: ${username} ${password} - ${logMsg}`
                ]
            };
            const token = 'eyJhbGciOiJFUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3YXp1aCIsImF1ZCI6IldhenVoIEFQSSBSRVNUIiwibmJmIjoxNzE3Njc5MDc5LCJleHAiOjE4MTc2NzkwNzksInN1YiI6ImFwaV93ZWIiLCJyYW5fYXMiOmZhbHNlLCJyYmFjX3JvbGVzIjpbMV0sInJiYWNfbW9kZSI6IndoaXRlIn0.AaukWtCBnZqgJoFm3qydDTycnrsUipCDQIqof7dcAN52iiRPpmovsfCi2D6GiNOKRIhuSbQ8V5y1921xZufMsJRNAGz2GSFgtA8IomQzVbxmcDtwS0x1AEy8nmbqjXXFJlTcrFN4HznhGBjff3w_Cu3XRJsDDEqZWv8AXSVRG2sBLr41';
            try {
                const response = yield fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(body),
                });
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }
                const data = yield response.json();
                console.log('Success:', data);
            }
            catch (error) {
                console.error('Error:', error);
            }
            // try {
            //   console.log("SQL Injection mock response being created - service layer");
            //   return await this.authRepository.SQLi();
            // } catch (error: any) {
            //   return { status: 500, message: error.message };
            // }
        });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("IAuthRepository")),
    __metadata("design:paramtypes", [auth_repository_1.AuthRepository])
], AuthService);
