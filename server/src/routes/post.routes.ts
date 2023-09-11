import { Router } from 'express';
import { PostController } from '../controllers/index';
import { postCreateValidation } from '../validations';
import { checkAuth, handleValidationErrors } from '../utils';

const router = Router();

router.get('/', PostController.getAll);
router.post('/', checkAuth, postCreateValidation, handleValidationErrors, PostController.create);
router.get('/:id', PostController.getOne);
router.delete('/:id', checkAuth, PostController.remove);
router.patch('/:id', checkAuth, postCreateValidation, handleValidationErrors, PostController.update);
export default router;
