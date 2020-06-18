import db from '../database/database';

class Category {
  static async getCategory(req, res) {
    const sql = 'SELECT * FROM category';
    db.query(sql, (err, rows, fields) => {
      res.send({
        data: rows[0],
      });
    });
  }

  static async deleteCategorie(req, res) {
    const { id_category } = req.params;
    const sql = `DELETE FROM category WHERE id_category = ${id_category}`;
    db.query(sql, (err, rows, fields) => {
      if (err) return res.send({ err });
      if (rows.affectedRows === 0) {
        res.send({
          message: 'No data found to delete',
        });
      } else {
        res.send({
          message: 'les donnees ont ete effacees avec succes',
        });
      }
    });
  }

  static async updateCategory(req, res) {
    const { categoy_name } = req.body;
    const { id_category } = req.params;
    const sql = `UPDATE category SET category_name = '${categoy_name}' WHERE id_category = ${id_category}`;

    db.query(sql, (err, rows, fields) => {
      if (rows.affectedRows === 0) {
        res.send({
          message: 'Pas des donnees a mettre a jour',
        });
      } else {
        res.send({
          message: 'les donness ont ete mis a jour avec succes',
        });
      }
    });
  }
  
}
export default Category;
