const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');

let pool;
(async function initializePool() {
  pool = await mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'FormBuilderTask',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });
})();
router.get('/', async (req, res) => {
    try {
       
      const [formSubmission, fields] = await pool.execute(
        `SELECT *from  FormBuilderTask.formValues 

        INNER JOIN formsField
        ON formValues.fieldID = formsField.fieldID`
      );
      console.log("ncncncn",formSubmission,fields)
      
      res.json(formSubmission);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

  router.get('/:formID', async (req, res) => {
    try {
        const [formField, fifi] = await pool.execute(
            `SELECT formSubmissionID from  FormBuilderTask.formSubmission WHERE formID=?`,[req.params.formID]
          );
        console.log(formField)
      
      res.json(formField);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
  module.exports = router;