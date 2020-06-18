import db from '../database/database';

class Commandes {
  static async postCommande(req, res) {
    const {
      id_commande, id_user, id_produit, created_at,
    } = req.body;
    const sql = `SELECT id_user,id_commande, prod_id FROM commande
    INNER JOIN 
    users USING(id_user)
    INNER JOIN 
    produits USING(prod_id)`;
    db.query(sql, (err, rows, fields) => {
      const sql1 = `INSERT INTO commande(id_user,prod_id) VALUES('${rows[0].id_user}','${rows[0].prod_id}')`;
      db.query(sql1, (err1, row1, fields) => {
        res.send({
          message: 'data succussfully inserted',
          data: row1[0],
        });
      });
    });
  }

  static async getSingleCommande(req, res) {

  }

  static async getAllCommande(req, res) {

  }

  static async deleteSingleCommande(req, res) {

  }

  static async deleteMultipleCommande(req, res) {

  }

  static async UpdateSingleCommande(req, res) {

  }

  static async UpdateMultipleCommande(req, res) {

  }
}

export default Commandes;
