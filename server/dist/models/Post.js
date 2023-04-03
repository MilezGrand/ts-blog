"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../db"));
const User_1 = __importDefault(require("./User"));
const PostModel = db_1.default.define('post', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
    },
    text: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
    },
    tags: {
        type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.STRING),
        defaultValue: [],
    },
    viewsCount: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0,
    },
    user: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    imageUrl: {
        type: sequelize_1.DataTypes.STRING,
    },
}, {
    tableName: 'posts',
});
PostModel.hasOne(User_1.default, {
    sourceKey: 'user',
    foreignKey: 'id',
    as: 'user_id'
});
PostModel.sync();
exports.default = PostModel;
