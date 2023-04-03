import { DataTypes } from 'sequelize';
import db from '../db';

const UserModel = db.define(
    'user',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        fullName: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
        },
        passwordHash: {
            type: DataTypes.STRING,
            unique: true,
        },
        avatarUrl: {
            type: DataTypes.STRING,
        },
    },
    {
        tableName: 'users',
    },
);

UserModel.sync();

export default UserModel;
