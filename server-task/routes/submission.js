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
router.get("/", async (req, res) => {
  try {
    const [formSubmission] = await pool.execute(
      `SELECT *from  FormBuilderTask.formValues 

        INNER JOIN formsField
        ON formValues.fieldID = formsField.fieldID`
    );

    res.json(formSubmission);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/:formID", async (req, res) => {
  if (!req.params.formID) {
    res.status(500).send("noID");
  }
  try {
    const [formField] = await pool.execute(
      `SELECT formSubmissionID from  FormBuilderTask.formSubmission WHERE formID=?`,
      [req.params.formID]
    );

    res.json(formField);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
router.post("/:formID", async (req, res) => {
  if (!req.params.formID||!req.body) {
    res.status(500).send("noValid");
  }
  // add validation on formID param so the server wouldn't crash
  try {
    [resi2] = await pool.execute(
      `INSERT INTO FormBuilderTask.formSubmission (formID)  VALUES (?)`,
      [req.params.formID]
    );
    console.log("resi2", resi2);
    const [resi1] = await pool.execute(
      `SELECT MAX(formSubmissionID) from  FormBuilderTask.formSubmission WHERE formID=?`,
      [req.params.formID]
    );

    const [resi] = await pool.execute(
      `SELECT fieldID,fieldLabel from  FormBuilderTask.formsField WHERE formID=?`,
      [req.params.formID]
    );
    for (let index = 0; index < resi.length; index++) {
      console.log("value", req.body[index]);

      console.log(resi1[0]["MAX(formSubmissionID)"]);
      if (req.body[index]) {
        await pool.execute(
          `INSERT INTO FormBuilderTask.formValues (formSubmissionID, fieldID, fieldValue) VALUES (?, ?,?)`,
          [
            resi1[0]["MAX(formSubmissionID)"],
            resi[index].fieldID,
            req.body[index]
          ]
        );
      }
      else {
        res.status(500).send("noValid");

      }
    }
        const [results] = await pool.execute(
          `SELECT Submissions from  FormBuilderTask.forms WHERE formID=?`,
          [req.params.formID]
        );
        console.log(results)
        await pool.execute(
          ` UPDATE FormBuilderTask.forms SET Submissions = ? WHERE formID=?`,
          [results[0].Submissions + 1, req.params.formID]
        );
        res.send("success");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
module.exports = router;
