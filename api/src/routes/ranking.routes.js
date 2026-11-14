import { Router } from 'express';
import { rank } from '../controllers/ranking.controller.js';
import { validateBody } from '../middleware/validate.js';

const router = Router();

router.post('/', validateBody({ scenario: { required: true, type: 'object' } }), rank);

export default router;
