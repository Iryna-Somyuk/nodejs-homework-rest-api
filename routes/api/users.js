const express = require("express");
const ctrl = require("../../controllers/auth");
const { userValidation } = require("../../middlewares/userValidation");

const authenticate = require("../../middlewares/authenticate");
const upload = require("../../middlewares/upload");
const { postVerify } = require("../../middlewares/validationMiddlewares");

const router = express.Router();

router.post("/register", userValidation, ctrl.register);
router.get("/verify/:verificationToken", ctrl.emailVerify);
router.post("/verify", postVerify, ctrl.resendVerifyEmail);
router.post("/login", userValidation, ctrl.login);
router.get("/current", authenticate, ctrl.getCurrent);
router.post("/logout", authenticate, ctrl.logout);
router.patch("/avatars", authenticate, upload.single("avatar"),ctrl.updateAvatar);

module.exports = router;
