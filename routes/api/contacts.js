const express = require("express");
const ctrl = require("../../controllers/contacts");
const {
  postValidation,
  putValidation,
  updateFavoriteSchema,
} = require("../../middlewares/validationMiddlewares");
const isValidId = require("../../middlewares/isValidId");
const authenticate = require("../../middlewares/authenticate");

const router = express.Router();

router.get("/", authenticate, ctrl.getAllContacts);

router.get("/:contactId", authenticate, isValidId, ctrl.getByIdContacts);

router.post("/", authenticate, postValidation, ctrl.postContacts);

router.delete("/:contactId", authenticate, isValidId, ctrl.deleteContacts);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  putValidation,
  ctrl.updateByIdContacts
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  updateFavoriteSchema,
  ctrl.updateByIdFavorite
);

module.exports = router;
