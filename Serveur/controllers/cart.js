import db from '../database/database';
import dummy from '../database/cart';

class Cart {
  static async getCart(req, res) {
    const { prod_id } = req.params;
    const data = dummy.find((post) => post.id === parseInt(prod_id));
    if (!data) return res.send({ message: 'no data found' });
    res.send(data);
  }
}
export default Cart;
