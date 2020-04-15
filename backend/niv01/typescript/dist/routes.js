"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var CreateUser_1 = __importDefault(require("./services/CreateUser"));
function helloWorld(req, res) {
    var user = CreateUser_1.default('jose-luiz', 'jose@jose.com', '124');
    return res.json(user);
}
exports.default = helloWorld;
