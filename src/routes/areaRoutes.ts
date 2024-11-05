import { Router } from 'express';
import * as areaController from '../controllers/areaController';

const router = Router();

router.post('/', areaController.createArea);
router.get('/', areaController.getAreas);
router.get('/:id', areaController.getAreaById);
router.put('/:id', areaController.updateArea);
router.delete('/:id', areaController.deleteArea);

export default router;
