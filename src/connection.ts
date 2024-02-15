import mysql, { Connection } from 'mysql2';

// Database connection configuration
function connectToDatabase(): Connection {

const db: Connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'P@ssw0rd',
});
// Create the database if it doesn't exist
db.query('CREATE DATABASE IF NOT EXISTS antier', (err) => {
  if (err) throw err;

  console.log('Database "antier" created or already exists');
});

// Connect to the "antier" database
db.changeUser({ database: 'antier' }, (err) => {
  if (err) throw err;

  // Create tables
  const tables: string[] = [
    `CREATE TABLE IF NOT EXISTS vehicle (
      vehicle_id INT PRIMARY KEY AUTO_INCREMENT,
      make VARCHAR(255) NOT NULL,
      model VARCHAR(255) NOT NULL,
      year INT NOT NULL,
      color VARCHAR(255) NULL,
      registration_plate VARCHAR(255) NOT NULL
    )`,
    `CREATE TABLE IF NOT EXISTS owner (
      owner_id INT PRIMARY KEY AUTO_INCREMENT,
      first_name VARCHAR(255) NOT NULL,
      last_name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      phone_number VARCHAR(20) NOT NULL
    )`,
    `CREATE TABLE IF NOT EXISTS ownership (
      ownership_id INT PRIMARY KEY AUTO_INCREMENT,
      vehicle_id INT,
      owner_id INT,
      start_date DATE NOT NULL,
      end_date DATE,
      FOREIGN KEY (vehicle_id) REFERENCES vehicle(vehicle_id),
      FOREIGN KEY (owner_id) REFERENCES owner(owner_id)
    )`,
    `CREATE TABLE IF NOT EXISTS maintenance (
      maintenance_id INT PRIMARY KEY AUTO_INCREMENT,
      vehicle_id INT,
      maintenance_type VARCHAR(255) NOT NULL,
      date DATE NOT NULL,
      cost DECIMAL(10, 2) NOT NULL,
      description TEXT,
      FOREIGN KEY (vehicle_id) REFERENCES vehicle(vehicle_id)
    )`,
    `CREATE TABLE IF NOT EXISTS insurance (
      insurance_id INT PRIMARY KEY AUTO_INCREMENT,
      vehicle_id INT,
      insurance_company VARCHAR(100) NOT NULL,
      policy_number VARCHAR(50) NOT NULL,
      expiry_date DATE NOT NULL,
      FOREIGN KEY (vehicle_id) REFERENCES vehicle(vehicle_id)
  );`
    
  ];

  tables.forEach((tableQuery) => {
    db.query(tableQuery, (tableErr) => {
      if (tableErr) throw tableErr;
    });
  });

  console.log('Tables created successfully');

  createUserAndGrantPrivileges(db, 'root', 'P@ssw0rd');
});

return db;
}
async function createUserAndGrantPrivileges(db: Connection, username: string, password: string) {
    // Create user if not exists
    db.query(
      `CREATE USER IF NOT EXISTS '${username}'@'localhost' IDENTIFIED BY '${password}'`,
      (userErr) => {
        if (userErr) throw userErr;
  
        // Grant all privileges to the user on the antier database
        db.query(
          `GRANT ALL PRIVILEGES ON antier.* TO '${username}'@'localhost'`,
          (error) => {
            if (error) throw error;
            console.log(`User '${username}' created and privileges granted successfully`);
          }
        );
      }
    );
  }
export default connectToDatabase;