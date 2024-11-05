import { Router } from 'express';
import * as processesController from '../controllers/processesController';

const router = Router();

router.post('/', processesController.createProcess);
router.get('/', processesController.getProcesses);
router.get('/:id', processesController.getProcessById);
router.put('/:id', processesController.updateProcess);
router.delete('/:id', processesController.deleteProcess);

export default router;
