import { DataTypes } from 'sequelize';
import db from '../db';
import UserModel from './User';

const PostModel = db.define(
    'post',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
        },
        text: {
            type: DataTypes.STRING,
            unique: true,
        },
        tags: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            defaultValue: [],
        },
        viewsCount: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        user: {
            type: DataTypes.INTEGER,
        },
        imageUrl: {
            type: DataTypes.STRING,
        },
    },
    {
        tableName: 'posts',
    },
);

PostModel.hasOne(UserModel, {
    sourceKey: 'user',
    foreignKey: 'id',
    as: 'user_id'
});

PostModel.sync();

export default PostModel;
