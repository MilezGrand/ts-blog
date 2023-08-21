import express from 'express';
import { Request, Response } from 'express';
import multer from 'multer';
import cors from 'cors';
import { openConnection } from './db.js';
import authRouter from './routes/auth.routes';
import postRouter from './routes/post.routes';

const app = express();

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads');
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });

app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use(cors());

app.use('/auth', authRouter);
app.use('/posts', postRouter);

app.post('/upload', upload.single('image'), (req: Request, res: Response) => {
    res.json({
        url: `/uploads/${req?.file?.originalname}`,
    });
});

// app.get('/tags', PostController.getLastTags);

openConnection();

app.listen(4444, () => {
    console.log('Server OK');
});

// Заменить bcrypt на scrypt, а лучше на sha-512
// bcrypt - не является безопасным
// scrypt - слишком энергоёмкий алгоритм для проекта
// sha-512 - оптимальная скорость вычисления и степень защиты, является стандартом