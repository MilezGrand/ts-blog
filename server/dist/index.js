"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const cors_1 = __importDefault(require("cors"));
const db_js_1 = require("./db.js");
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const post_routes_1 = __importDefault(require("./routes/post.routes"));
const index_1 = require("./utils/index");
const app = (0, express_1.default)();
const storage = multer_1.default.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads');
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    },
});
const upload = (0, multer_1.default)({ storage });
app.use(express_1.default.json());
app.use('/uploads', express_1.default.static('uploads'));
app.use((0, cors_1.default)());
app.use('/auth', auth_routes_1.default);
app.use('/posts', post_routes_1.default);
app.post('/upload', index_1.checkAuth, upload.single('image'), (req, res) => {
    var _a;
    res.json({
        url: `/uploads/${(_a = req === null || req === void 0 ? void 0 : req.file) === null || _a === void 0 ? void 0 : _a.originalname}`,
    });
});
// app.get('/tags', PostController.getLastTags);
(0, db_js_1.openConnection)();
app.listen(4444, () => {
    console.log('Server OK');
});
// Заменить bcrypt на scrypt, а лучше на sha-512
// bcrypt - не является безопасным
// scrypt - слишком энергоёмкий алгоритм для твоего проекта
// sha-512 - оптимальная скорость вычисления и степень защиты, является стандартом
