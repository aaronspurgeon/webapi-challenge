const express = require("express");
const db = require("../data/helpers/actionModel");
const router = express.Router({
  mergeParams: true
});

router.get("/:actionId", (req, res, next) => {
  db.get(req.params.actionId)
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
      message: "Empty input fields."
    });
  }

  const newAction = {
    project_id: req.params.id,
    description: req.body.description,
    notes: req.body.notes,
    completed: false
  };

  db.insert(newAction)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      next(err);
    });
});

router.put("/:actionId", (req, res, next) => {
  if (!req.body) {
    return res.status(400).json({
      message: "Empty input fields."
    });
  }

  const update = {
    project_id: req.params.id,
    description: req.body.description,
    notes: req.body.notes,
    completed: false
  };

  db.update(req.params.actionId, update)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      next(err);
    });
});

router.delete("/:actionId", (req, res, next) => {
  db.remove(req.params.actionId)
    .then(count => {
      if (count) {
        res.status(200).json({
          message: "The action has been deleted"
        });
      } else {
        res.status(404).json({
          message: "Action does not exist."
        });
      }
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
