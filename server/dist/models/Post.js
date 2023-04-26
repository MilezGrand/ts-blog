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
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    imageUrl: {
        type: sequelize_1.DataTypes.STRING,
    },
}, {
    tableName: 'posts',
});
PostModel.hasOne(User_1.default, {
    foreignKey: 'id',
    sourceKey: 'userId'
});
User_1.default.belongsTo(PostModel, {
    foreignKey: 'id'
});
// PostModel.hasOne(UserModel, {
//     sourceKey: 'userId',
//     foreignKey: 'id',
//     as: 'user_id'
// });
// PostModel.hasOne(UserModel, {
//     sourceKey: 'userFullname',
//     foreignKey: 'fullName',
// });
// PostModel.sync();
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield PostModel.sync();
    console.log('Posts table created successfully.');
}))();
exports.default = PostModel;
