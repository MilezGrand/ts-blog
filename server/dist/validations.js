"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postCreateValidation = exports.registerValidation = exports.loginValidation = void 0;
const express_validator_1 = require("express-validator");
exports.loginValidation = [
    (0, express_validator_1.body)('email', 'Неверный формат почты').isEmail(),
    (0, express_validator_1.body)('password', 'Пароль должен быть минимум 5 символов').isLength({ min: 5 }),
];
exports.registerValidation = [
    (0, express_validator_1.body)('email', 'Неверный формат почты').isEmail(),
    (0, express_validator_1.body)('password', 'Пароль должен быть минимум 5 символов').isLength({ min: 5 }),
    (0, express_validator_1.body)('fullName', 'Укажите имя').isLength({ min: 3 }),
    (0, express_validator_1.body)('avatarUrl', 'Неверная ссылка на аватарку').optional().isURL(),
];
exports.postCreateValidation = [
    (0, express_validator_1.body)('title', 'Введите заголовок статьи').isLength({ min: 3 }).isString(),
    (0, express_validator_1.body)('text', 'Введите текст статьи').isLength({ min: 3 }).isString(),
    (0, express_validator_1.body)('tags', 'Неверный формат тэгов (укажите массив)').optional().isString(),
    (0, express_validator_1.body)('imageUrl', 'Неверная ссылка на изображение').optional().isString(),
];
