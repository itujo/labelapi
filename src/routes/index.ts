import MovimentController from '@controllers/MovimentController';

import { Router } from 'express';

const routes = Router();

routes.get('/:lote', MovimentController.show);

export default routes;
