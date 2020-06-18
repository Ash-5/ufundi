import { Router } from 'express';
import cartController from '../controllers/cart';
import Auth from '../middleware/validateToken';

const router = Router();

router
  .get('/api/v1/add-to-cart/:prod_id', Auth, cartController.getCart);
export default router;
