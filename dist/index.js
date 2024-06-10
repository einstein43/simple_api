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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("./controllers/auth.controller");
const tsyringe_1 = require("tsyringe");
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.options("*", (0, cors_1.default)());
app.use((0, cors_1.default)({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"], // Specify allowed headers
}));
const authController = tsyringe_1.container.resolve(auth_controller_1.AuthController);
app.post("/auth", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return yield authController.auth(req, res);
}));
app.get("/", (req, res) => {
    res.send("Welcome to The Clinic's API. Contact the network administrator for more information.");
});
app.listen(4000, () => {
    console.log(`Server running`);
});
module.exports = app;
