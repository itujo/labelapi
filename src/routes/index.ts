import MovimentCotroller from '@controllers/MovimentCotroller';

import { Router } from 'express';

const routes = Router();

// routes.get('/:lote', MovimentCotroller.index);
routes.get('/:lote', MovimentCotroller.show);
// routes.post('/', CadastroController.show);

export default routes;
