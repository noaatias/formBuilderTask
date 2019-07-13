const express = require("express");
const router = express.Router();
const mysql = require("mysql2/promise");

let pool;
(async function initializePool() {
  pool = await mysql.createPool({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "FormBuilderTask",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });
})();
// get all the  forms 

router.get("/", async (req, res) => {

  try {
    const [forms, fields] = await pool.execute(
      `SELECT *
        FROM FormBuilderTask.forms
        `
    );
    res.json(forms);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
// post new form

router.post("/", async (req, res) => {
  let { formName, fieldLabel, name, type } = req.body;
  try {
    await pool.execute(
      `INSERT INTO FormBuilderTask.forms (formName, submissions) VALUES (?, 0)`,
      [req.body[0].formName]
    );

    const [resi, fie] = await pool.execute(
      `SELECT *from  FormBuilderTask.forms WHERE formName=?`,
      [req.body[0].formName]
    );
    for (let index = 0; index < req.body.length; index++) {
      let { fieldInput, name, type } = req.body[index];
      await pool.execute(
        `INSERT INTO FormBuilderTask.formsField (formID, fieldLabel,inputName,inputType) VALUES (?, ?,?,?)`,
        [resi[0].formID, fieldInput, name, type]
      );
    }

    res.status(200).send({ formName, fieldLabel, name, type });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
// get the form field for form

router.get("/:formID", async (req, res) => {
  try {
    const [formsField, fields] = await pool.execute(
      `SELECT *from  FormBuilderTask.formsField WHERE formID=?`,
      [req.params.formID]
    );
    res.json(formsField);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
