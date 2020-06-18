import db from '../database/database';
import CheckLog from '../middleware/verifySession';

const goLoginPage = '/api/v1/auth/signin';

class postArticles {
  static async postInfo(req, res) {
    const {
      prodName, details, pictures, prodOwner, prod_id, price, devise, id_category,
    } = req.body;
    // const { prod_id } = req.params;
    const sql = `INSERT INTO produits(prod_id,prodName,details,pictures,prodOwner,price,devise,id_category) VALUES('','${prodName}','${details}','${pictures}','${prodOwner}','${price}','${devise}','${id_category}')`;
    const sql1 = `SELECT * FROM produits WHERE prod_id='${prod_id}'`;
    const sql3 = `SELECT id_category, category_name FROM category
    INNER JOIN 
    produits USING(id_category)`;

    db.query(sql, (err, rows, fields) => {
      db.query(sql1, (err1, result, field) => {
        res.send({
          message: 'data inserted',
          data: result[0],
        });
      });
    });
  }

  // done
  static async getSingle(req, res) {
    const { prod_id } = req.params;
    console.log(req.params);
    const sql1 = `SELECT * FROM produits WHERE prod_id='${prod_id}'`;

    db.query(sql1, (err, rows, fields) => {
      if (rows.length > 0) {
        res.send({
          data: rows[0],
        });
      } else {
        res.send({
          message: 'produit non trouve',
        });
      }
    });
  }

  static async getAll(req, res) {
    const fromPage = '/api/v1/post';

    // CheckLog.connection(req.session.userSession, req, res, fromPage, goLoginPage,() => {});

    const sql3 = 'SELECT * FROM produits';
    db.query(sql3, (err, rows, fields) => {
      if (err) return res.send({ err });
      // res.send({
      //   data: rows,
      // });
      console.log(req.cookies);
      res.render('checkout', {
        data: rows,

      });
    });
  }

  static async getIndex(req, res) {
    const sql = 'SELECT pictures FROM produits LIMIT 6';
    db.query(sql, (err, rows, fields) => {
      res.render('index', {
        data: rows,
      });
      console.log(rows);
    });
  }

  static async deletePost(req, res) {
    const { prod_id } = req.params;
    const sql = `DELETE FROM produits WHERE prod_id = ${prod_id}`;
    const sql1 = `SELECT * FROM produits WHERE prod_id = ${prod_id}`;

    db.query(sql, (err, rows, fields) => {
      if (err) throw err;
      if (rows.affectedRows === 0) {
        res.send({
          message: 'No data found',
        });
      } else {
        res.send({
          message: 'data successfully deleted',
        });
      }
    });
  }

  static async getCheckout(req, res) {
    res.render('checkout');
  }

  static async getCart(req, res) {
    res.render('cart');
  }

  static async updatePost(req, res) {
    const {
      prodName, details, pictures, prodOwner, price, devise,
    } = req.body;
    const { prod_id } = req.params;

    const sql = `UPDATE produits SET prodName = '${prodName}', details ='${details}', pictures ='${pictures}', prodOwner ='${prodOwner}', price ='${price}', devise ='${devise}' WHERE prod_id = ${prod_id} `;
    db.query(sql, (err, rows, fields) => {
      if (err) return res.send({ err });
      if (rows.affectedRows === 0) {
        res.send({
          message: 'No data to update',
        });
      } else {
        res.send({
          message: 'data successfully updated',
          data: rows[0],
        });
      }
    });
  }

  static async searchPost(req, res) {
    const { id } = req.params;
    const sql = `SELECT * FROM produits WHERE prod_id = '${id}`;
    const sql1 = 'SELECT COUNT(prodName) FROM produits';

    db.query(sql, (err, rows, fields) => {
      db.query(sql1, (err1, rows1, fields) => {
        if (err1) return res.send({ err1 });
        res.send({
          message: `${rows1} data have been found`,
          data: rows[0],
        });
      });
    });
  }
}

export default postArticles;
