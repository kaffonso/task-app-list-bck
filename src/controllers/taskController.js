const pool = require("../config/database");

module.exports = {
  // get all tasks
  async getAll(req, res, next) {
    pool.query("SELECT * FROM public.task", (err, response) => {
      if (err) return next(err);

      if (response.rowCount === 0) {
        // verifiy if the row count is 0, meaning it returned nothing
        return res.status(204).json({ error: "No task" });
      }

      return res.status(200).json(response.rows);
    });
  },

  // get one task by id
  async getOne(req, res, next) {
    const { id } = req.params;
    pool.query(
      `Select * FROM public.task WHERE id = ${id}`,
      (err, response) => {
        if (err) return next(err);

        if (response.rowCount === 0) {
          // verifiy if the row count is 0, meaning it returned nothing
          return res.status(400).json({ error: "ID does not exist" });
        }

        return res.status(200).json(response.rows);
      }
    );
  },

  //get all tasks that are completed
  async getCompleted(req, res, next) {
    pool.query(
      `Select * FROM public.task WHERE completed = true`,
      (err, response) => {
        if (err) return next(err);

        if (response.rowCount === 0) {
          // verifiy if the row count is 0, meaning it returned nothing
          return res.status(400).json({ error: "No completed task" });
        }

        return res.status(200).json(response.rows);
      }
    );
  },

  // create one task
  async create(req, res, next) {
    const { description } = req.body;

    if (!description) { // verify if fieled description is filled
      return res.status(400).json({ error: "Fields must be filled!" });
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

  // delete one task by id
  async delete(req, res, next) {
    const { id } = req.params;

    console.log(id);

    pool.query(
      `DELETE FROM public.task WHERE id = ${id} RETURNING *`,
      (err, response) => {
        if (err) return next(err);

        if (response.rowCount === 0) {
          // verifiy if the row count is 0, meaning it returned nothing
          return res.status(400).json({ error: "ID does not exist" });
        }
        // console.log(response.rowCount)
        return res.status(200).json(response.rows);
      }
    );
  },

  // update one task
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
          // verifiy if the row count is 0, meaning it returned nothing
          return res.status(400).json({ error: "ID does not exist" });
        }

        return res.status(200).json(response.rows);
      }
    );
  },

  // change completed status of one taskk
  async complete(req, res, next) {
    const { id } = req.params;

    pool.query(
      `UPDATE public.task SET completed='true' WHERE id = ${id} RETURNING *`,
      (err, response) => {
        if (err) return next(err);

        if (response.rowCount === 0) {
          // verifiy if the row count is 0, meaning it returned nothing
          return res.status(400).json({ error: "ID does not exist" });
        }

        return res.status(200).json(response.rows);
      }
    );
  },
};

// function verifyRowCount(response, res) {
//   if (response.rowCount === 0) {
//     return res.status(400).json({ error: "ID does not exist" });
//   }
// }
