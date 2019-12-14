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

router.put("/:id", (req, res, next) => {
  if (!req.body) {
    return res.status(400).json({
      message: "Missing input fields"
    });
  }

  const update = {
    name: req.body.name,
    description: req.body.description,
    completed: false
  };

  db.update(req.params.id, update)
    .then(data => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(404).json({
          message: "The post could not be found"
        });
      }
    })
    .catch(err => {
      next(err);
    });
});

router.delete("/:id", (req, res, next) => {
  db.remove(req.params.id)
    .then(count => {
      if (count) {
        res.status(200).json({
          message: "The post has been deleted"
        });
      } else {
        res.status(404).json({
          message: "Project does not exist."
        });
      }
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
