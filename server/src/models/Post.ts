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
      // unique: true,
    },
    imageUrl: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: 'posts',
  },
);

// PostModel.hasOne(UserModel, {
//   foreignKey: 'id',
//   sourceKey: 'userId',
// });

// UserModel.belongsTo(PostModel, {
//   foreignKey: 'id',
// });

UserModel.hasMany(PostModel, {
  foreignKey: 'userId',
});

PostModel.belongsTo(UserModel);

PostModel.sync();
// (async () => {
//     await PostModel.sync();
//     console.log('Posts table created successfully.');
// })();

export default PostModel;
