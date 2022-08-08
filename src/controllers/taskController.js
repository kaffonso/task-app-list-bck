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

        return res.status(200).json(response.rows);
      }
    );
  },

  //
  async getUncompleted(req, res, next) {
    pool.query(
      `Select * FROM public.task WHERE completed = false`,
      (err, response) => {
        if (err) return next(err);

        return res.status(200).json(response.rows);
      }
    );
  },

  // create one task
  async create(req, res, next) {
    const { description } = req.body;

    if (!description || description.trim() === "") {
      // verify if field description is filled
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

  // delete all tasks
  async deleteAll(req, res, next) {
    pool.query(
      `DELETE FROM public.task`,
      (err, response) => {
        if (err) return next(err);

        return res.status(200).json(response.rows);
      }
    );
  },

  // update one task
  async update(req, res, next) {
    const { id } = req.params;
    const { description } = req.body;

    if (!description || description.trim() === "") {
      // verify if field description is filled
      return res.status(400).json({ error: "Fields must be filled!" });
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
  async changeStatus(req, res, next) {
    const { id } = req.params;
    let status, completed;

    pool.query(
      `select completed from public.task WHERE id = ${id}`,
      (err, response) => {
        if (err) return next(err);

        if (response.rowCount === 0) {
          // verifiy if the row count is 0, meaning it returned nothing
          return res.status(400).json({ error: "ID does not exist" });
        }

        status = response.rows[0].completed; // get the status of the actual task

        if (status === true) {
          // verify if its true it will change it to false and vice-versa
          completed = false;

        } else
          completed = true;

        pool.query(
          `UPDATE public.task SET completed='${completed}', "updatedAt"=CURRENT_TIMESTAMP WHERE id = ${id} RETURNING *`,
          (err, response) => {
            if (err) return next(err);

            return res.status(200).json(response.rows);
          }
        );
      }
    );
  },
};

