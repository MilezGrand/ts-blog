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
exports.update = exports.create = exports.remove = exports.getOne = exports.getAll = void 0;
const Post_1 = __importDefault(require("../models/Post"));
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield Post_1.default.findAll({ order: [['createdAt', 'DESC']] });
        res.send(posts);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить статьи',
        });
    }
});
exports.getAll = getAll;
// export const getLastTags = async (req: Request, res: Response) => {
//     try {
//         const posts = await PostModel.find().limit(5).exec();
//         const tags = posts
//             .map((obj) => obj.tags)
//             .flat()
//             .slice(0, 5);
//         res.json(tags);
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({
//             message: 'Не удалось получить тэги',
//         });
//     }
// };
const getOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postId = req.params.id;
        const post = yield Post_1.default.findOne({ where: { id: postId } });
        yield (post === null || post === void 0 ? void 0 : post.increment({ viewsCount: 1 }));
        if (!post) {
            return res.status(404).json({
                message: 'Статья не найдена',
            });
        }
        res.send(post);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить статью',
        });
    }
});
exports.getOne = getOne;
const remove = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postId = req.params.id;
        const post = yield Post_1.default.destroy({ where: { id: postId } });
        if (!post) {
            return res.status(404).json({
                message: 'Статья не найдена',
            });
        }
        res.json({ success: true });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось удалить статью',
        });
    }
});
exports.remove = remove;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield Post_1.default.create({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags.split(','),
            user: req.body.userId.id,
        });
        res.send(post);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось создать статью',
        });
    }
});
exports.create = create;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postId = req.params.id;
        yield Post_1.default.update({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags.split(','),
            user: req.body.userId.id,
        }, { where: { id: postId } });
        res.json({
            success: true,
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось обновить статью',
        });
    }
});
exports.update = update;
