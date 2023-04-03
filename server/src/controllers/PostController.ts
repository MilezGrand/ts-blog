import { Model } from 'sequelize';
import PostModel from '../models/Post';
import { Request, Response } from 'express';
import { Post } from '../types';

export const getAll = async (req: Request, res: Response) => {
    try {
        const posts = await PostModel.findAll({ order: [['createdAt', 'DESC']] });
        res.send(posts);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить статьи',
        });
    }
};

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

export const getOne = async (req: Request, res: Response) => {
    try {
        const postId = req.params.id;
        const post: Model<Post> | null = await PostModel.findOne({ where: { id: postId } });
        await post?.increment({ viewsCount: 1 });

        if (!post) {
            return res.status(404).json({
                message: 'Статья не найдена',
            });
        }

        res.send(post);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить статью',
        });
    }
};

export const remove = async (req: Request, res: Response) => {
    try {
        const postId = req.params.id;
        const post: number = await PostModel.destroy({ where: { id: postId } });

        if (!post) {
            return res.status(404).json({
                message: 'Статья не найдена',
            });
        }

        res.json({ success: true });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось удалить статью',
        });
    }
};

export const create = async (req: Request, res: Response) => {
    try {
        const post: Model<Post> = await PostModel.create({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags.split(','),
            user: req.body.userId.id,
        });

        res.send(post);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось создать статью',
        });
    }
};

export const update = async (req: Request, res: Response) => {
    try {
        const postId = req.params.id;

        await PostModel.update(
            {
                title: req.body.title,
                text: req.body.text,
                imageUrl: req.body.imageUrl,
                tags: req.body.tags.split(','),
                user: req.body.userId.id,
            },
            { where: { id: postId } },
        );

        res.json({
            success: true,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось обновить статью',
        });
    }
};
