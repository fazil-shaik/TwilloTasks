const axios = require('axios');
require('dotenv').config();

// Set FreshSales API key
const API_KEY = process.env.FRESHSALES_API_KEY;
const BASE_URL = process.env.FRESHSALES_BASE_URL;

// Create contact in CRM
exports.createContact = async (req, res) => {
  const { first_name, last_name, email, mobile_number } = req.body;
  
  try {
    const response = await axios.post(`${BASE_URL}/api/contacts`, {
      contact: {
        first_name,
        last_name,
        email,
        mobile_number
      }
    }, {
      headers: {
        Authorization: `Token token=${API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    
    res.json({ message: 'Contact created in CRM', contact_id: response.data.contact.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get contact from CRM
exports.getContact = async (req, res) => {
  const { contact_id } = req.body;
  
  try {
    const response = await axios.get(`${BASE_URL}/api/contacts/${contact_id}`, {
      headers: {
        Authorization: `Token token=${API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    
    res.json({ contact: response.data.contact });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update contact in CRM
exports.updateContact = async (req, res) => {
  const { contact_id, new_email, new_mobile_number } = req.body;
  
  try {
    await axios.put(`${BASE_URL}/api/contacts/${contact_id}`, {
      contact: {
        email: new_email,
        mobile_number: new_mobile_number
      }
    }, {
      headers: {
        Authorization: `Token token=${API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    
    res.json({ message: 'Contact updated in CRM' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete contact from CRM
exports.deleteContact = async (req, res) => {
  const { contact_id } = req.body;
  
  try {
    await axios.delete(`${BASE_URL}/api/contacts/${contact_id}`, {
      headers: {
        Authorization: `Token token=${API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    
    res.json({ message: 'Contact deleted from CRM' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
