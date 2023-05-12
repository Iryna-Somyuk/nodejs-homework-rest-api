const express = require("express");
const ctrl = require("../../controllers/auth");
const {
    userValidation,
  } = require("../../middlewares/userValidation");
  const isValidId = require("../../middlewares/isValidId");


const router = express.Router();

router.post("/register", userValidation, ctrl.register);
router.post("/login", userValidation, ctrl.login);


module.exports = router;