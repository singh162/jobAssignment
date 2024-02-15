"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateResponse = exports.NotFoundResponse = exports.GetOneResponse = exports.GetAllResponse = exports.DeleteResponse = exports.VehicleResponse = exports.ApiResponse = exports.createResponse = void 0;
// This object represents a generic API response structure.
const ApiResponse = {
    type: 'object',
    properties: {
        message: { type: 'string' },
    },
};
exports.ApiResponse = ApiResponse;
const createResponse = {
    type: 'object',
    properties: {
        message: { type: 'string', example: 'Records added successfully' },
        vehicleId: { type: 'integer', example: 5 },
        ownerId: { type: 'integer', example: 5 },
        ownershipId: { type: 'integer', example: 5 },
        maintenanceId: { type: 'integer', example: 5 },
        insuranceInsertId: { type: 'integer', example: 5 },
    },
};
exports.createResponse = createResponse;
// This object represents the structure of a response for a single vehicle record.
const VehicleResponse = {
    type: 'object',
    properties: {
        vehicle: {
            type: 'object',
            properties: {
                // Schema for the 'vehicle' object within the response.
                vehicle_id: { type: 'integer' },
                make: { type: 'string' },
                model: { type: 'string' },
                year: { type: 'integer' },
                color: { type: 'string' },
                registration_plate: { type: 'string' },
                start_date: { type: 'string', format: 'date-time' },
                end_date: { type: 'string', format: 'date-time' },
            },
            required: [
                'vehicle_id',
                'make',
                'model',
                'year',
                'color',
                'registration_plate',
                'start_date',
                'end_date',
            ],
        },
        owner: {
            // Schema for the 'owner' object within the response.
            type: 'object',
            properties: {
                owner_id: { type: 'integer' },
                first_name: { type: 'string' },
                last_name: { type: 'string' },
                email: { type: 'string', format: 'email' },
                phone_number: { type: 'string' },
            },
            required: ['owner_id', 'first_name', 'last_name', 'email', 'phone_number'],
        },
        maintenance: {
            // Schema for the 'maintenance' object within the response.
            type: 'object',
            properties: {
                maintenance_type: { type: 'string' },
                date: { type: 'string', format: 'date-time' },
                cost: { type: 'number' },
                description: { type: 'string' },
            },
            required: ['maintenance_type', 'date', 'cost', 'description'],
        },
        insurance: {
            // Schema for the 'insurance' object within the response.
            type: 'object',
            properties: {
                insurance_company: { type: 'string' },
                policy_number: { type: 'string' },
                expiry_date: { type: 'string', format: 'date-time' },
            },
            required: ['insurance_company', 'policy_number', 'expiry_date'],
        },
    },
    // Required properties for the overall response.
    required: ['vehicle', 'owner'],
};
exports.VehicleResponse = VehicleResponse;
// This object represents the structure of a response after a deletion operation.
const DeleteResponse = {
    type: 'object',
    properties: {
        message: { type: 'string', example: 'Records deleted successfully' },
        vehicleId: { type: 'integer' },
        ownerId: { type: 'integer' },
    },
};
exports.DeleteResponse = DeleteResponse;
// This object represents the structure of a response for retrieving all vehicle records.
const GetAllResponse = {
    type: 'object',
    properties: {
        // Similar structure to VehicleResponse, representing a list of vehicle records.
        vehicle: VehicleResponse.properties.vehicle,
        owner: VehicleResponse.properties.owner,
        maintenance: VehicleResponse.properties.maintenance,
        insurance: VehicleResponse.properties.insurance,
    },
    required: ['vehicle', 'owner'],
};
exports.GetAllResponse = GetAllResponse;
// This object represents the structure of a response for retrieving a specific vehicle record.
const GetOneResponse = {
    type: 'object',
    properties: {
        vehicle_id: { type: 'integer', example: 3 },
        make: { type: 'string', example: 'Toyota4' },
        model: { type: 'string', example: 'Camry4' },
        year: { type: 'integer', example: 2022 },
        color: { type: 'string', example: 'Red' },
        registration_plate: { type: 'string', example: 'ABC123' },
        owner_first_name: { type: 'string', example: 'Updated First Name' },
        owner_last_name: { type: 'string', example: 'Updated Last Name' },
        start_date: { type: 'string', format: 'date-time', example: '2024-02-13T18:30:00.000Z' },
        ownership_end_date: { type: 'string', format: 'date-time', example: '2024-02-27T18:30:00.000Z' },
        maintenance_type: { type: 'string', example: 'Oil Change' },
        maintenance_date: { type: 'string', format: 'date-time', example: '2024-02-13T18:30:00.000Z' },
        cost: { type: 'number', example: 50.00 },
        maintenance_description: { type: 'string', example: 'Updated maintenance description' },
        insurance_company: { type: 'string', example: 'Updated Insurance Company' },
        policy_number: { type: 'string', example: 'Updated Policy Number' },
        expiry_date: { type: 'string', format: 'date-time', example: '2024-02-29T18:30:00.000Z' },
    },
};
exports.GetOneResponse = GetOneResponse;
// This object represents the structure of a generic not found response.
const NotFoundResponse = {
    type: 'object',
    properties: {
        message: { type: 'string' },
    },
};
exports.NotFoundResponse = NotFoundResponse;
// This object represents the structure of a response after an update operation.
const UpdateResponse = {
    type: 'object',
    properties: {
        message: { type: 'string', example: 'Records updated successfully' },
    },
};
exports.UpdateResponse = UpdateResponse;
//# sourceMappingURL=responseSchemas.js.map