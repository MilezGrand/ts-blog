import { Router } from 'express';
import { UserController } from '../controllers/index';
import { loginValidation } from '../validations';
import { checkAuth, handleValidationErrors } from '../utils';

const router = Router();

router.get('/me', checkAuth, handleValidationErrors, UserController.getMe);
router.post('/register', UserController.register);
router.post('/login', loginValidation, handleValidationErrors, UserController.login);

export default router;