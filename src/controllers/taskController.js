const pool = require("../config/database");

module.exports = {
  async getAll(req, res, next) {
    pool.query("select * from public.task").then((dados) => {
      res.json(dados.rows);
    });
  },

  async create(req, res, next) {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ error: "All fields must be filled!" });
    }

    pool.query(
      `INSERT INTO public.task (title, description, completed, "createdAt", "updatedAt") values` +
        `('${title}','${description}', default, CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)`,
      (err, response) => {
        if (err) return next(err);
        res
          .status(200)
          .json([{ ok: "Note Created Sucessfully" }, { title, description }]);
      }
    );
  },

  async delete(req, res, next){
    const {id} = req.body;

    pool.query(``)
  }
};
