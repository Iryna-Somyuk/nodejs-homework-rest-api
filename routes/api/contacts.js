const express = require("express");
const ctrl = require("../../controllers/contacts");

const router = express.Router();

router.get("/", ctrl.getAllContacts);

router.get("/:contactId", ctrl.getByIdContacts);

router.post("/", ctrl.postContacts);

router.delete("/:contactId", ctrl.deleteContacts);

router.put("/:contactId", ctrl.updateByIdContacts);

module.exports = router;
