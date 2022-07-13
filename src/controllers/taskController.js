const pool = require("../config/database");

module.exports = {
  async getAll(req, res, next) {
    pool.query("SELECT * FROM public.task").then((dados) => {
      if (dados.rowCount == 0) {
        return res.status(204).json({ ok: "No Data" });
      }
      res.status(200).json(dados.rows);
    });
  },

  async getOne(req, res, next) {
    const { id } = req.params;
    pool.query(
      `Select * FROM public.task WHERE id = ${id}`,
      (err, response) => {
        if (err) return next(err);

        if (response.rowCount === 0) {
          return res.status(400).json({ error: "ID does not exist" });
        }

        return res.status(200).json(response.rows);
      }
    );
  },

  async getCompleted(req, res, next) {
    pool.query(
      `Select * FROM public.task WHERE completed = true`,
      (err, response) => {
        if (err) return next(err);

        if (response.rowCount === 0) {
          return res.status(400).json({ error: "No completed task" });
        }

        return res.status(200).json(response.rows);
      }
    );
  },

  async create(req, res, next) {
    const { description } = req.body;

    if (!description) {
      return res.status(400).json({ error: "All fields must be filled!" });
    }

    pool.query(
      `INSERT INTO public.task (description, completed, "createdAt", "updatedAt") values` +
        `('${description}', DEFAULT, CURRENT_TIMESTAMP,CURRENT_TIMESTAMP) RETURNING *`,
      (err, response) => {
        if (err) return next(err);
        res.status(201).json(response.rows);
      }
    );
  },

  async delete(req, res, next) {
    const { id } = req.params;

    console.log(id);

    if (req.params.length === 0) {
      return res.status(400).json({ error: "All fields must be filled!" });
    }

    pool.query(
      `DELETE FROM public.task WHERE id = ${id} RETURNING *`,
      (err, response) => {
        if (err) return next(err);

        if (response.rowCount === 0) {
          return res.status(400).json({ error: "ID does not exist" });
        }
        // console.log(response.rowCount)
        return res.status(200).json(response.rows);
      }
    );
  },

  async update(req, res, next) {
    const { id } = req.params;
    const { description } = req.body;

    if (!description) {
      return res.status(400).json({ error: "All fields must be filled!" });
    }

    pool.query(
      `UPDATE public.task SET description='${description}', "updatedAt" = CURRENT_TIMESTAMP where task.id = ${id} RETURNING *`,
      (err, response) => {
        if (err) return next(err);

        if (response.rowCount === 0) {
          return res.status(400).json({ error: "ID does not exist" });
        }

        return res.status(200).json(response.rows);
      }
    );
  },

  async complete(req, res, next) {
    const { id } = req.params;

    pool.query(`UPDATE public.task SET completed='true' WHERE id = ${id} RETURNING *`, (err, response) => {
      if (err) return next(err)

      if (response.rowCount === 0) {
        return res.status(400).json({ error: "ID does not exist" });
      }

      return res.status(200).json(response.rows);
    });
  },
};
