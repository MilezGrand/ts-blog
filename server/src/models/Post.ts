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
        userId: {
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
    foreignKey: 'id',
    sourceKey: 'userId'
});
UserModel.belongsTo(PostModel, {
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
(async () => {
    await PostModel.sync();
    console.log('Posts table created successfully.');
})();

export default PostModel;