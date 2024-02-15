# Antier - TypeScript and MySQL CRUD Application

Antier is a TypeScript and MySQL CRUD application for managing vehicle information, owners, ownership, maintenance, and insurance.

## Getting Started

Follow these steps to set up and run the project:

### Prerequisites

- Node.js
- TypeScript
- MySQL

## Install dependencies:

cd src
npm install


## Compile TypeScript files:

tsc

## Run the application:

if you are in Antier folder
1. cd dist
if you are in src folder 
1. cd ..
2. cd dist

## run the server
npm install
node dist/app.js

## Database Setup
Make sure you have MySQL installed and running.

Create the user in the mysql
1. mysql -u  -p (Enter your MySQL username password when prompted.)
2. CREATE USER 'root'@'localhost' IDENTIFIED BY 'P@ssw0rd';
3. EXIT


The application creates a database named 'antier' and tables for vehicles, owners, ownership, maintenance, and insurance.


## API Documentation
Explore the API documentation using Swagger UI:

http://localhost:3000/api-docs

API Urls

GET http://localhost:3000/api/v1/ : Retrieve all vehicles.

GET http://localhost:3000/api/v1/:vehicleId : Retrieve a specific vehicle by ID.

POST http://localhost:3000/api/v1/: Create a new vehicle.

request body->

{
  "vehicle": {
    "make": "Updated Make5",
    "model": "Updated Mode5",
    "year": 2023,
    "color": "Updated Color5",
    "registration_plate": "UPDATED123",
    "start_date": "2024-02-14",
    "end_date": "2024-02-28"
  },
  "owner": {
    "first_name": "Updated First Name",
    "last_name": "Updated Last Name",
    "email": "updated.email@example.com",
    "phone_number": "987-654-3210"
  },
  "maintenance": {
    "maintenance_type": "Updated Maintenance",
    "date": "2024-02-15",
    "cost": 75.00,
    "description": "Updated description"
  },
  "insurance": {
    "insurance_company": "Updated Insurance Company",
    "policy_number": "Updated Policy Number",
    "expiry_date": "2024-03-01"
  }
}

PUT http://localhost:3000/api/v1/: Update a specific vehicle.

request body->
{
  "vehicle": {
    "vehicle_id":3,
    "make": "Toyota4",
    "model": "Camry4",
    "year": 2022,
    "color": "Red",
    "registration_plate": "ABC123",
    "start_date": "2024-02-14",
    "end_date": "2024-02-28"
  },
  "owner": {
    "owner_id":1,
    "first_name": "John",
    "last_name": "Doe",
    "email": "john.doe@example.com",
    "phone_number": "123-456-7890"
  },
  "maintenance": {
    "maintenance_type": "Oil Change",
    "date": "2024-02-14",
    "cost": 50.00,
    "description": "Updated maintenance description"
  },
  "insurance": {
    "insurance_company": "Updated Insurance Company",
    "policy_number": "Updated Policy Number",
    "expiry_date": "2024-03-01"
  }
}


DELETE http://localhost:3000/api/v1/vehicleId/orderId: Delete a specific vehicle by ID.







