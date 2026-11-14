import { Router } from 'express';

import investigationRoutes from './investigation.routes.js';
import rankingRoutes from './ranking.routes.js';
import chatRoutes from './chat.routes.js';
import analyticsRoutes from './analytics.routes.js';

const router = Router();

router.use('/investigations', investigationRoutes);
router.use('/ranking', rankingRoutes);
router.use('/chat', chatRoutes);
router.use('/analytics', analyticsRoutes);

export default router;
