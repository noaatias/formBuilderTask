CREATE DATABASE FormBuilderTask;

CREATE TABLE FormBuilderTask.forms (
    formID int NOT NULL AUTO_INCREMENT,
    FormName VARCHAR(1000),
    Submissions int,
	PRIMARY KEY (formID)

);
CREATE TABLE FormBuilderTask.formsField (
    fieldID int NOT NULL AUTO_INCREMENT,
    formID int,
    fieldLabel VARCHAR(1000),
    inputName VARCHAR(1000),
	inputType varchar(1000),
   PRIMARY KEY (fieldID)


);
CREATE TABLE FormBuilderTask.formValues(
    
    formSubmissionID int,
    fieldID int,
    fieldValue VARCHAR(1000)
);
CREATE TABLE FormBuilderTask.formSubmission(
    
    formSubmissionID int NOT NULL AUTO_INCREMENT,
    formID int,
   PRIMARY KEY (formSubmissionID)

);

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '123456'
