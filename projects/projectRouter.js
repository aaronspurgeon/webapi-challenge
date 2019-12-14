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

module.exports = router;
