const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
require('dotenv').config();
const { cwd } = process;

const connect = () => mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  multipleStatements: true
});

const runSql = (files) => async () => {
  const db = connect();

  for(let i = 0; i < files.length; i += 1) {
    const sql = fs.readFileSync(files[i], 'utf8');
    await db.query(sql);
  }

  db.end();
};

const readStoredProcedures = (dirPath) => {
  const files = fs.readdirSync(dirPath);
  return files.map((file) => path.resolve(dirPath, file));
};

const runMigration = runSql([path.resolve(cwd(), '__tests__', 'migration.sql')]);
const runSeed = runSql([path.resolve(cwd(), '__tests__', 'seed.sql')]);
const runPublish = runSql([
  path.resolve(cwd(), '__tests__', 'migration.sql'),
  ...readStoredProcedures(path.resolve(cwd(), '__tests__', 'storedProcedures')),
]);

module.exports = {
  connect,
  runMigration,
  runSeed,
  runPublish,
};