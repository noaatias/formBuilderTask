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
    console.log("babab");

    try {
      const [forms, fields] = await pool.execute(
        `SELECT *
        FROM FormBuilderTask.forms
        `
      );
      console.log(forms);
      res.json(forms);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
  
router.post('/', async (req, res) => {
    console.log(req.body);
    let { formName,fieldLabel,name,type
 } = req.body;
 console.log(req.body[0].formName)
    try {
     await pool.execute(
        `INSERT INTO FormBuilderTask.forms (formName, submissions) VALUES (?, 0)`,
        [req.body[0].formName]
      );
      
 const [resi,fie]=await pool.execute(
        `SELECT *from  FormBuilderTask.forms WHERE formName=?`,
        [req.body[0].formName]
      );
      console.log(resi[0].formID)
      for (let index = 0; index < req.body.length; index++) {
        let {fieldInput,name,type
        } = req.body[index]; 
        console.log(req.body[index])
        await pool.execute(
            `INSERT INTO FormBuilderTask.formsField (formID, fieldLabel,inputName,inputType) VALUES (?, ?,?,?)`,
            [resi[0].formID,fieldInput,name,type]
          );
      }
      
      res.status(200).send({formName,fieldLabel,name,type});

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

  router.get('/:formID', async (req, res) => {
    try {
      const [formsField, fields] = await pool.execute(
        `SELECT *from  FormBuilderTask.formsField WHERE formID=?`,
        [req.params.formID]
      );
      console.log(formsField)
      res.json(formsField);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

  router.post('/:formID', async (req, res) => {
    console.log("params",req.params);
   
    console.log("body",req.body)
    try {
       [resi2,fiel]= await pool.execute(
        `INSERT INTO FormBuilderTask.formSubmission (formID)  VALUES (?)`,
        [req.params.formID]
      );
      console.log("resi2",resi2)
      const [resi1,field]=await pool.execute(
        `SELECT MAX(formSubmissionID) from  FormBuilderTask.formSubmission WHERE formID=?`,
        [req.params.formID]
      );
      
 const [resi,fie]=await pool.execute(
        `SELECT fieldID from  FormBuilderTask.formsField WHERE formID=?`,
        [req.params.formID]
      );
      console.log(resi[0])
      for (let index = 0; index < resi.length; index++) {
        console.log("value",req.body[index].input)

        console.log(resi1[0]['MAX(formSubmissionID)'])
        await pool.execute(
            `INSERT INTO FormBuilderTask.formValues (formSubmissionID, fieldID, fieldValue) VALUES (?, ?,?)`,
            [resi1[0]['MAX(formSubmissionID)'],resi[index].fieldID,req.body[index].input]
          );
      }
      
      res.status(200).send("hello");

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
  
  module.exports = router;