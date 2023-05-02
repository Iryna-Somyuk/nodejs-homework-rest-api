// const fs = require('fs/promises')

// const fs = require("fs/promises");
// const path = require("path");
// const { nanoid } = require("nanoid");

// const contactsPath = path.join(__dirname, "/contacts.json");

// const getPath = async (filePath) => {
//   const data = await fs.readFile(filePath);
//   return JSON.parse(data);
// };

// const listContacts = async () => {
//   try {
//     const readData = await getPath(contactsPath);
//     return readData;
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// const getContactById = async (contactId) => {
//   try {
//     const readData = await getPath(contactsPath);
//     const result = readData.find((item) => item.id === contactId);
//     return result;
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// const removeContact = async (contactId) => {
//   try {
//     const readData = await getPath(contactsPath);
//     const result = readData.find((item) => item.id === contactId);
//     const deleteById = readData.filter((item) => item.id !== result.id);
//     const resultRemove = await fs.writeFile(
//       contactsPath,
//       JSON.stringify(deleteById, null, 2)
//     );
//     return result;
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// const addContact = async (body) => {
//   try {
//     const { name, email, phone } = body;
//     const readData = await getPath(contactsPath);
//     const newContact = {
//       id: nanoid(),
//       name,
//       email,
//       phone,
//     };
//     const newData = [...readData, newContact];

//     const addContacts = await fs.writeFile(
//       contactsPath,
//       JSON.stringify(newData, null, 2)
//     );

//     return newContact;
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// const updateContact = async (contactId, body) => {
//   try {
//     const { name, email, phone } = body;

//     const readData = await getPath(contactsPath);

//     readData.forEach((el) => {
//       if (el.id === contactId) {
//         if (name) {
//           el.name = name;
//         }
//         if (email) {
//           el.email = email;
//         }
//         if (phone) {
//           el.phone = phone;
//         }
//       }
//     });

//     await fs.writeFile(contactsPath, JSON.stringify(readData, null, 2));

//     const hasContactToUpdate = readData.find((el) => el.id === contactId);

//     const updatedContact = readData.find(
//       (el) => el.id === hasContactToUpdate.id
//     );

//     return updatedContact;
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// };

const { Schema, model } = require('mongoose');
const handleMongooseError = require('../helpers/handleMongooseError')

const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
}, {versionKey: false, timestamps: true});

contactSchema.post("save", handleMongooseError);

const Contact = model('contacts', contactSchema);



module.exports = Contact;