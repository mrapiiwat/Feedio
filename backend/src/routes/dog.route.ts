import { Router } from 'express';
import * as dogController from '../controller/dog.controller';

const router = Router();

router.get('/dog', dogController.getDogs);
router.get('/dog/:id', dogController.getDogById);
router.post('/dog', dogController.createDog);
router.put('/dog/:id', dogController.updateDog);
router.delete('/dog/:id', dogController.deleteDog);

export default router;