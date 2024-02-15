// vehicle-admin-api.ts
import Express from 'express';
import {
    __validatePost,
    __validatePut,
    _validateDelete,
    __validateGet
} from '../validation/vehicle-validation';
import mysql from 'mysql2/promise';

const app = Express.Router();
const connectionConfig = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'P@ssw0rd',
    database: 'antier',
};
// creating global connection
mysql.createConnection(connectionConfig).then(result => {
    (global as any).connection = result;
});
/**
 * @swagger
 * /:
 *   post:
 *     summary: Add a new vehicle record
 *     description: Endpoint to add a new vehicle record.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VehicleRequest'
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/createResponse'
 */
app.post('/', async (req, res) => {

    // Validate data using Joi schemas
    const { vehicle, owner, maintenance, insurance } = req.body;

    try {
        // Validate data using Joi schemas
        await __validatePost(req, "body");

        // Start a MySQL transaction
        await (global as any).connection.beginTransaction();

        // Insert data into the 'vehicle' table
        const [vehicleResult] = await (global as any).connection.query('INSERT INTO vehicle (make, model, year, color, registration_plate) VALUES (?, ?, ?, ?, ?)', [
            vehicle.make,
            vehicle.model,
            vehicle.year,
            vehicle.color,
            vehicle.registration_plate
        ]);

        // Insert data into the 'owner' table
        const [ownerResult] = await (global as any).connection.query('INSERT INTO owner (first_name, last_name, email, phone_number) VALUES (?, ?, ?, ?)', [
            owner.first_name,
            owner.last_name,
            owner.email,
            owner.phone_number
        ]);
        const vehicleInsertId = (vehicleResult as any).insertId;
        const ownerInsertId = (ownerResult as any).insertId;
        // Insert data into the 'ownership' table
        const [ownershipResult] = await (global as any).connection.query('INSERT INTO ownership (vehicle_id, owner_id, start_date, end_date) VALUES (?, ?, ?, ?)', [
            vehicleInsertId,
            ownerInsertId,
            vehicle.start_date,
            vehicle.end_date
        ]);
        const ownershipInsertId = (ownershipResult as any).insertId;

        // Insert data into the 'maintenance' table
        const [maintenanceResult] = await (global as any).connection.query('INSERT INTO maintenance (vehicle_id, maintenance_type, date, cost, description) VALUES (?, ?, ?, ?, ?)', [
            vehicleInsertId,
            maintenance.maintenance_type,
            maintenance.date,
            maintenance.cost,
            maintenance.description
        ]);
        const maintenanceInsertId = (maintenanceResult as any).insertId;

        const [insuranceResult] = await (global as any).connection.query('INSERT INTO insurance (vehicle_id, insurance_company, policy_number, expiry_date) VALUES (?, ?, ?, ?)', [
            vehicleInsertId,
            insurance.insurance_company,
            insurance.policy_number,
            insurance.expiry_date
        ]);

        const insuranceInsertId = (insuranceResult as any).insertId;

        // Commit the transaction
        await (global as any).connection.commit();

        res.json({
            message: 'Records added successfully',
            vehicleId: vehicleInsertId,
            ownerId: ownerInsertId,
            ownershipId: ownershipInsertId,
            maintenanceId: maintenanceInsertId,
            insuranceInsertId: insuranceInsertId
        });
    } catch (error) {
        // If an error occurs, rollback the transaction and respond with an error message
        if ((global as any).connection) {
            await (global as any).connection.rollback();
        }
        console.error(error);
        res.status(500).json({ message: error });
    }
});

/**
 * @swagger
 * /:
 *   put:
 *     summary: Update a vehicle record
 *     description: Endpoint to update an existing vehicle record.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VehicleRequest'
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */

app.put('/', async (req, res) => {

    // Validate data using Joi schemas
    const { vehicle, owner, maintenance, insurance } = req.body;

    try {
        // Validate data using Joi schemas
        await __validatePut(req, "body");

        // Start a MySQL transaction
        await (global as any).connection.beginTransaction();

        await (global as any).connection.query('UPDATE vehicle SET make=?, model=?, year=?, color=?, registration_plate=? WHERE vehicle_id=?', [
            vehicle.make,
            vehicle.model,
            vehicle.year,
            vehicle.color,
            vehicle.registration_plate,
            vehicle.vehicle_id
        ]);

        await (global as any).connection.query('UPDATE owner SET first_name=?, last_name=?, email=?, phone_number=? WHERE owner_id=?', [
            owner.first_name,
            owner.last_name,
            owner.email,
            owner.phone_number,
            owner.owner_id
        ]);

        await (global as any).connection.query('UPDATE ownership SET start_date=?, end_date=? WHERE vehicle_id=? AND owner_id=?', [
            vehicle.start_date,
            vehicle.end_date,
            vehicle.vehicle_id,
            owner.owner_id
        ]);

        await (global as any).connection.query('UPDATE maintenance SET maintenance_type=?, date=?, cost=?, description=? WHERE vehicle_id=?', [
            maintenance.maintenance_type,
            maintenance.date,
            maintenance.cost,
            maintenance.description,
            vehicle.vehicle_id
        ]);

        await (global as any).connection.query('UPDATE insurance SET insurance_company=?, policy_number=?, expiry_date=? WHERE vehicle_id=?', [
            insurance.insurance_company,
            insurance.policy_number,
            insurance.expiry_date,
            vehicle.vehicle_id
        ]);

        // Commit the transaction
        await (global as any).connection.commit();

        res.json({
            message: 'Records updated successfully',
        });
    } catch (error) {
        if ((global as any).connection) {
            await (global as any).connection.rollback();
        }
        console.error(error);
        res.status(500).json({ message: error });
    }
});

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get all vehicle records
 *     description: Endpoint to retrieve information about all vehicle records.
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/VehicleResponse'
 *       404:
 *         description: No data found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotFoundResponse'
 */


app.get('/', async (req, res) => {
    
    let db = (global as any).connection;

    try {
        const [result] = await db.query(`
         SELECT
           vehicle.vehicle_id,
           vehicle.make,
           vehicle.model,
           vehicle.year,
           vehicle.color,
           vehicle.registration_plate,
           ownership.start_date,
           ownership.end_date,
           owner.owner_id,
           owner.first_name,
           owner.last_name,
           owner.email,
           owner.phone_number,
           maintenance.maintenance_type,
           maintenance.date AS maintenance_date,
           maintenance.cost,
           maintenance.description AS maintenance_description,
           insurance.insurance_company,
           insurance.policy_number,
           insurance.expiry_date
         FROM vehicle
         JOIN ownership ON vehicle.vehicle_id = ownership.vehicle_id
         JOIN owner ON ownership.owner_id = owner.owner_id
         LEFT JOIN maintenance ON vehicle.vehicle_id = maintenance.vehicle_id
         LEFT JOIN insurance AS insurance ON vehicle.vehicle_id = insurance.vehicle_id
       `);

        if (!result || result.length === 0) {
            return res.status(404).json({ message: 'No data found' });
        }

        // Assuming you want to return the first matched row
        const formattedDataArray = [];

        for (let i = 0; i < result.length; i++) {
            const item = result[i];
        
            const formattedData = {
                vehicle: {
                    vehicle_id: item.vehicle_id,
                    make: item.make,
                    model: item.model,
                    year: item.year,
                    color: item.color,
                    registration_plate: item.registration_plate,
                    start_date: item.start_date,
                    end_date: item.end_date,
                },
                owner: {
                    owner_id: item.owner_id,
                    first_name: item.first_name,
                    last_name: item.last_name,
                    email: item.email,
                    phone_number: item.phone_number,
                },
                maintenance: {
                    maintenance_type: item.maintenance_type,
                    date: item.maintenance_date,
                    cost: item.cost,
                    description: item.maintenance_description,
                },
                insurance: {
                    insurance_company: item.insurance_company,
                    policy_number: item.policy_number,
                    expiry_date: item.expiry_date,
                },
            };
        
            formattedDataArray.push(formattedData);
        }

        res.json(formattedDataArray);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    } 
});

/**
* @swagger
* /{vehicleId}:
*   get:
*     summary: Get a specific vehicle record
*     description: Endpoint to retrieve information about a specific vehicle record.
*     parameters:
*       - in: path
*         name: vehicleId
*         required: true
*         description: ID of the vehicle to retrieve
*         schema:
*           type: integer
*     responses:
*       200:
*         description: Successful operation
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/VehicleResponse'
*       404:
*         description: Vehicle not found
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/NotFoundResponse'
*/

app.get('/:vehicleId', async (req, res) => {
    const { vehicleId } = req.params;

    try {
        await __validateGet(req, "params");


        const [result] = await (global as any).connection.query(`
            SELECT
                vehicle.*,
                owner.first_name AS owner_first_name,
                owner.last_name AS owner_last_name,
                ownership.start_date,
                ownership.end_date AS ownership_end_date,
                maintenance.maintenance_type,
                maintenance.date AS maintenance_date,
                maintenance.cost,
                maintenance.description AS maintenance_description,
                insurance.insurance_company,
                insurance.policy_number,
                insurance.expiry_date
            FROM vehicle
            JOIN ownership ON vehicle.vehicle_id = ownership.vehicle_id
            JOIN owner ON ownership.owner_id = owner.owner_id
            LEFT JOIN maintenance ON vehicle.vehicle_id = maintenance.vehicle_id
            LEFT JOIN insurance ON vehicle.vehicle_id = insurance.vehicle_id
            WHERE vehicle.vehicle_id = ?
        `, [vehicleId]);

        if (!result || result.length === 0) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }

        res.json(result[0]); // Assuming you want to return the first matched row
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


/**
 * @swagger
 * /{vehicleId}/{ownerId}:
 *   delete:
 *     summary: Delete a vehicle record
 *     description: Endpoint to delete a specific vehicle record.
 *     parameters:
 *       - in: path
 *         name: vehicleId
 *         required: true
 *         description: ID of the vehicle to delete
 *         schema:
 *           type: integer
 *       - in: path
 *         name: ownerId
 *         required: true
 *         description: ID of the owner associated with the vehicle
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Records deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       404:
 *         description: Vehicle or owner not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotFoundResponse'
 */

app.delete('/:vehicleId/:ownerId', async (req, res) => {
    const { vehicleId, ownerId } = req.params;

    try {
        // Start a MySQL transaction
        await _validateDelete(req, "params");

        await (global as any).connection.beginTransaction();

        await (global as any).connection.query('DELETE FROM maintenance WHERE vehicle_id = ?', [vehicleId]);
        await (global as any).connection.query('DELETE FROM insurance WHERE vehicle_id = ?', [vehicleId]);
        await (global as any).connection.query('DELETE FROM ownership WHERE vehicle_id = ? AND owner_id = ?', [vehicleId, ownerId]);

        await (global as any).connection.query('DELETE FROM vehicle WHERE vehicle_id = ?', [vehicleId]);

        await (global as any).connection.query('DELETE FROM owner WHERE owner_id = ?', [ownerId]);

        // Commit the transaction
        await (global as any).connection.commit();

        res.json({
            message: 'Records deleted successfully',
            vehicleId: vehicleId,
            ownerId: ownerId
        });
    } catch (error) {
        if ((global as any).connection) {
            await (global as any).connection.rollback();
        }
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

export default app;
