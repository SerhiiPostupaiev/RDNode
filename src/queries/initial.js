const { Connection } = require('../dbLayer/dbService');

module.exports = async function () {
  const managersTable = `
    CREATE TABLE Managers(
      manager_id serial PRIMARY KEY,
        fullName VARCHAR (50) NOT NULL
    );`;

  const documentsTable = `
    CREATE TABLE Documents(
      document_id serial PRIMARY KEY,
      content VARCHAR (200) NOT NULL,
      manager_id integer,
      CONSTRAINT manager_id_f_key FOREIGN KEY (manager_id)
        REFERENCES Managers (manager_id) MATCH SIMPLE
        ON UPDATE NO ACTION ON DELETE NO ACTION
    );`;

  await Connection.client.query(managersTable, (err) => {
    if (err) {
      console.error(err.message);
    }
  });

  await Connection.client.query(documentsTable, (err) => {
    if (err) {
      console.error(err.message);
    }
  });
};
