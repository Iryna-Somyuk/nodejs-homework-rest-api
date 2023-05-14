const Contact = require("../models/contacts");
const httpError = require("../helpers/HttpError");
const ctrlWrapper = require("../helpers/ctrlWrapper");

const getAllContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  const data = await Contact.find({ owner }, "", { skip, limit });
  res.json(data);
};

const getByIdContacts = async (req, res) => {
  const { contactId } = req.params;
  const data = await Contact.findById(contactId);
  if (!data) {
    throw httpError(404, "Not found");
  }
  res.json(data);
};

const postContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const data = await Contact.create({ ...req.body, owner });
  res.status(201).json(data);
};

const deleteContacts = async (req, res) => {
  const { contactId } = req.params;
  const data = await Contact.findByIdAndRemove(contactId);
  if (!data) {
    throw httpError(404, "Not found");
  }
  res.json({ message: "Contact deleted" });
};

const updateByIdContacts = async (req, res) => {
  const { contactId } = req.params;

  const data = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!data) {
    throw httpError(404, "Not found");
  }
  res.status(200).json(data);
};

const updateByIdFavorite = async (req, res) => {
  const { contactId } = req.params;

  const data = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!data) {
    throw httpError(404, "Not found");
  }
  res.status(200).json(data);
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getByIdContacts: ctrlWrapper(getByIdContacts),
  postContacts: ctrlWrapper(postContacts),
  deleteContacts: ctrlWrapper(deleteContacts),
  updateByIdContacts: ctrlWrapper(updateByIdContacts),
  updateByIdFavorite: ctrlWrapper(updateByIdFavorite),
};
