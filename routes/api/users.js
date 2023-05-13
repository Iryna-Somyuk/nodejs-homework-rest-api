const express = require("express");
const ctrl = require("../../controllers/auth");
const { userValidation } = require("../../middlewares/userValidation");

const authenticate = require("../../middlewares/authenticate");

const router = express.Router();

router.post("/register", userValidation, ctrl.register);
router.post("/login", userValidation, ctrl.login);
router.get("/current", authenticate, ctrl.getCurrent);
router.post("/logout", authenticate, ctrl.logout);

module.exports = router;
