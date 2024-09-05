const db = require('../config/db');

// Create contact in database
exports.createContact = (req, res) => {
  const { first_name, last_name, email, mobile_number } = req.body;
  const sql = `INSERT INTO contacts (first_name, last_name, email, mobile_number) VALUES (?, ?, ?, ?)`;
  
  db.query(sql, [first_name, last_name, email, mobile_number], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Contact created in DATABASE', contact_id: result.insertId });
  });
};

// Get contact from database
exports.getContact = (req, res) => {
  const { contact_id } = req.body;
  const sql = `SELECT * FROM contacts WHERE id = ?`;
  
  db.query(sql, [contact_id], (err, result) => {
    if (err) throw err;
    res.json({ contact: result[0] });
  });
};

// Update contact in database
exports.updateContact = (req, res) => {
  const { contact_id, new_email, new_mobile_number } = req.body;
  const sql = `UPDATE contacts SET email = ?, mobile_number = ? WHERE id = ?`;
  
  db.query(sql, [new_email, new_mobile_number, contact_id], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Contact updated in DATABASE' });
  });
};

// Delete contact from database
exports.deleteContact = (req, res) => {
  const { contact_id } = req.body;
  const sql = `DELETE FROM contacts WHERE id = ?`;
  
  db.query(sql, [contact_id], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Contact deleted from DATABASE' });
  });
};
