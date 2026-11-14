import { Router } from 'express';
import { ask } from '../controllers/chat.controller.js';
import { validateBody } from '../middleware/validate.js';

const router = Router();

router.post('/', validateBody({ question: { required: true, type: 'string' } }), ask);

export default router;
