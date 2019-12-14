const express = require("express");
const db = require("../data/helpers/actionModel");
const router = express.Router({
  mergeParams: true
});

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
