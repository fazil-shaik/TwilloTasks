const express = require('express');
const router = express.Router();

const dbController = require('../controllers/dbController');
const crmController = require('../controllers/crmController');

// Route to create contact
router.post('/createContact', (req, res) => {
  const { data_store } = req.body;
  if (data_store === 'CRM') {
    crmController.createContact(req, res);
  } else {
    dbController.createContact(req, res);
  }
});

// Route to get contact
router.post('/getContact', (req, res) => {
  const { data_store } = req.body;
  if (data_store === 'CRM') {
    crmController.getContact(req, res);
  } else {
    dbController.getContact(req, res);
  }
});

// Route to update contact
router.post('/updateContact', (req, res) => {
  const { data_store } = req.body;
  if (data_store === 'CRM') {
    crmController.updateContact(req, res);
  } else {
    dbController.updateContact(req, res);
  }
});

// Route to delete contact
router.post('/deleteContact', (req, res) => {
  const { data_store } = req.body;
  if (data_store === 'CRM') {
    crmController.deleteContact(req, res);
  } else {
    dbController.deleteContact(req, res);
  }
});

module.exports = router;
