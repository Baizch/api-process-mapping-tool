import { Router } from 'express';
import * as areasController from '../controllers/areasController';

const router = Router();

router.post('/', areasController.createArea);
router.get('/', areasController.getAreas);
router.get('/:id', areasController.getAreaById);
router.put('/:id', areasController.updateArea);
router.delete('/:id', areasController.deleteArea);

export default router;
