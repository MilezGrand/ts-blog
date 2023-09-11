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

UserModel.hasMany(PostModel, {
  foreignKey: 'userId',
});

PostModel.belongsTo(UserModel);

PostModel.sync();

export default PostModel;
