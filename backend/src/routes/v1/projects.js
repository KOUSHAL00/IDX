import express from 'express';
import { createProjectController, projectTree } from '../../controllers/projectController.js';

const router = express.Router();

router.post('/',createProjectController);

router.get('/:projectId/tree',projectTree);

export default router;