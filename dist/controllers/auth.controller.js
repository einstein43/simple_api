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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("../services/auth.service");
const tsyringe_1 = require("tsyringe");
tsyringe_1.container.register("IAuthService", {
    useClass: auth_service_1.AuthService,
});
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
        this.auth = this.auth.bind(this);
    }
    auth(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const username = req.body.username;
                const password = req.body.password;
                ////////////////////////// SQL Injection detection //////////////////////////
                if (username.includes("'") || password.includes("'")) {
                    console.log("SQL Injection detected - controller layer");
                    const mockResponse = yield this.authService.SQLi(username, password);
                    return res.status(201).json(mockResponse);
                    /////////////////////////// SQL Injection end//////////////////////////
                }
                else {
                    // Normal authentication process
                    const response = yield this.authService.auth(username, password);
                    console.log("Login detected, no anomalies - controller layer");
                    if (response) {
                        return res.status(response.status).json(response);
                    }
                    else {
                        return res
                            .status(500)
                            .json({ message: "Response is undefined - controller layer" });
                    }
                }
            }
            catch (error) {
                return res.status(500).json({ message: error.message });
            }
        });
    }
};
exports.AuthController = AuthController;
exports.AuthController = AuthController = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("IAuthService")),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
