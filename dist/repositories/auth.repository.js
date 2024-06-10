"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRepository = void 0;
const users_1 = require("../users/users");
class AuthRepository {
    constructor() { }
    auth(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = users_1.users.find((user) => user.email === email);
            if (!user) {
                return {
                    status: 401,
                    message: "User not found",
                };
            }
            else if (user.password !== password) {
                return {
                    status: 401,
                    message: "Password does not match",
                };
            }
            else {
                return {
                    status: 200,
                    message: "Credentials Correct",
                };
            }
        });
    }
    SQLi() {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                status: 201,
                message: "SQL Injection Detected >:(",
            };
        });
    }
}
exports.AuthRepository = AuthRepository;
