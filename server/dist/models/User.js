"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../db"));
const UserModel = db_1.default.define('user', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    fullName: {
        type: sequelize_1.DataTypes.STRING,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
    },
    passwordHash: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
    },
    avatarUrl: {
        type: sequelize_1.DataTypes.STRING,
    },
}, {
    tableName: 'users',
});
UserModel.sync();
exports.default = UserModel;
