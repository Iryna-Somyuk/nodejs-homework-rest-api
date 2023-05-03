const express = require("express");
const ctrl = require("../../controllers/contacts");
const {
  postValidation,
  putValidation,
  updateFavoriteSchema,
} = require("../../middlewares/validationMiddlewares");
const isValidId = require("../../middlewares/isValidId");

const router = express.Router();

router.get("/", ctrl.getAllContacts);

router.get("/:contactId", isValidId, ctrl.getByIdContacts);

router.post("/", postValidation, ctrl.postContacts);

router.delete("/:contactId", isValidId, ctrl.deleteContacts);

router.put("/:contactId", isValidId, putValidation, ctrl.updateByIdContacts);

router.patch("/:contactId/favorite", isValidId, updateFavoriteSchema, ctrl.updateByIdFavorite);

module.exports = router;
