import { Router } from 'express';
import controller from './controllers';

const router = Router();

router.get('/', controller.default);

router.get('/*', controller.notFound);
router.post('/*', controller.notFound);
router.put('/*', controller.notFound);
router.delete('/*', controller.notFound);

export default router;
