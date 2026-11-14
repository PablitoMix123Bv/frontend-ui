import { Router } from 'express';
import { trends, flammability } from '../controllers/analytics.controller.js';

const router = Router();

router.post('/trends', trends);
router.post('/flammability-map', flammability);

export default router;
