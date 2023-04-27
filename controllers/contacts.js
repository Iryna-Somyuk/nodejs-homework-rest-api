const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../models/contacts");
const httpError = require("../helpers/HttpError");
const ctrlWrapper = require("../helpers/ctrlWrapper");



const getAllContacts = async (req, res) => {
  const data = await listContacts();
  res.json(data);
};

const getByIdContacts = async (req, res) => {
  const { contactId } = req.params;
  const data = await getContactById(contactId);
  if (!data) {
    throw httpError(404, "Not found");
  }
  res.json(data);
};

const postContacts = async (req, res) => {
  const data = await addContact(req.body);
  res.status(201).json(data);
};

const deleteContacts = async (req, res) => {
  const { contactId } = req.params;
  const data = await removeContact(contactId);
  if (!data) {
    throw httpError(404, "Not found");
  }
  res.json({ message: "contact deleted" });
};

const updateByIdContacts = async (req, res) => {
  const { contactId } = req.params;
  const data = await updateContact(contactId, req.body);
  if (!data) {
    throw httpError(404, "Not found");
  }
  res.json(data);
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getByIdContacts: ctrlWrapper(getByIdContacts),
  postContacts: ctrlWrapper(postContacts),
  deleteContacts: ctrlWrapper(deleteContacts),
  updateByIdContacts: ctrlWrapper(updateByIdContacts),
};
