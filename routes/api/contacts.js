const express = require("express");
const ctrl = require("../../controllers/contacts");
const { postValidation, putValidation } = require("../../middlewares/validationMiddlewares")

const router = express.Router();

router.get("/", ctrl.getAllContacts);

router.get("/:contactId", ctrl.getByIdContacts);

router.post("/", postValidation, ctrl.postContacts);

router.delete("/:contactId", ctrl.deleteContacts);

router.put("/:contactId", putValidation, ctrl.updateByIdContacts);

module.exports = router;
