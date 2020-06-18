import { Router } from 'express';
import commande from '../controllers/commandes';

const router = Router();

router
  .post('/api/v1/commande', commande.postCommande);

export default router;
