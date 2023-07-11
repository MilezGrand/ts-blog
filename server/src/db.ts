import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';

dotenv.config();

export const db = new Sequelize(
  process.env.DB_NAME || 'postgres',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASS || 'postgres',
  {
    dialect: 'postgres',
    host: process.env.DB_HOST,
    logging: false,
  },
);

export const openConnection = () => {
  try {
    console.log('Connected to database');
    return db.authenticate();
  } catch (error) {
    console.log(error);
  }
};

export const closeConnection = () => {
  return db.close();
};

export default db;
