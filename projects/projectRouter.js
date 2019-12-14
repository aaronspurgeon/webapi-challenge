const express = require("express");
const db = require("../data/helpers/projectModel");
const router = express.Router();

// get,
//   insert,
//   update,
//   remove,
//   getProjectActions,

router.get("/", (req, res, next) => {
  db.get()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      next(err);
    });
});

router.post("/", (req, res, next) => {
  if (!req.body) {
    return res.status(400).json({
      message: "Missing input fields"
    });
  }

  const newProject = {
    name: req.body.name,
    description: req.body.description,
    completed: false
  };

  db.insert(newProject)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
