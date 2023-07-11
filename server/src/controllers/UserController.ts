import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import UserModel from '../models/User';
import { Request, Response } from 'express';
import { User } from '../types';
import { Model } from 'sequelize';

export const login = async (req: Request, res: Response) => {
  try {
    const user: Model<User> | null = await UserModel.findOne({
      where: { email: req.body.email },
    });
    if (!user) {
      return res.status(404).json({
        message: 'Пользователь не найден',
      });
    }

    const isValidPass = await bcrypt.compare(req.body.password, user.dataValues.passwordHash);

    if (!isValidPass) {
      return res.status(400).json({
        message: 'Неверный логин или пароль',
      });
    }

    const token = jwt.sign(
      {
        id: user.dataValues.id,
      },
      'secret123',
      {
        expiresIn: '30d',
      },
    );

    const { passwordHash, ...userData } = user.dataValues;

    res.send({
      ...userData,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      message: 'Не удалось авторизоваться',
    });
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user: Model<User> = await UserModel.create({
      email: req.body.email,
      fullName: req.body.fullName,
      avatarUrl: req.body.avatarUrl,
      passwordHash: hash,
    });

    const token = jwt.sign(
      {
        id: user.dataValues.id,
      },
      'secret123',
      {
        expiresIn: '30d',
      },
    );

    const { passwordHash, ...userData } = user.dataValues;

    res.send({
      ...userData,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: 'Не удалось зарегестрироваться',
    });
  }
};

export const getMe = async (req: Request, res: Response) => {
  try {
    const user: Model<User> | null = await UserModel.findOne({
      where: { id: req.body.userId.id },
    });

    if (!user) {
      return res.status(404).json({
        message: 'Пользователь не найден',
      });
    }

    const { passwordHash, ...userData } = user.dataValues;

    res.send(userData);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Нет доступа',
    });
  }
};
