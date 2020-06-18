import { Router } from 'express';
import prodController from '../controllers/post_details';
import cloudinaryUpload from '../middleware/cloudinary';
import multer from '../config/multer';
import Auth from '../middleware/validateToken';

const router = Router();
router
  .get('/', prodController.getIndex)
  .post('/product', Auth, multer.array('pictures', Infinity), cloudinaryUpload, prodController.postInfo)
  .get('/:id/produit', prodController.searchPost)
  .get('/products', Auth, prodController.getAll) // done
  .get('/onePost/:prod_id', prodController.getSingle) // done
  .patch('/:prod_id', prodController.updatePost) // done
  .delete('/:prod_id', prodController.deletePost)
  .get('/checkout', Auth, prodController.getCheckout)
  .get('/cart', prodController.getCart); // done

export default router;
