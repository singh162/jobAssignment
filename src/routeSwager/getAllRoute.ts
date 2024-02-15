// This object represents the structure of a GET route for retrieving all vehicle records.
const getAllRoute = {
  get: {
    tags: ['Vehicle'],
    summary: 'Get all vehicle records',
    description: 'Endpoint to retrieve information about all vehicle records.',
    // Responses for successful and unsuccessful retrieval operations.
    responses: {
      200: {
        description: 'Successful operation',
        content: {
          'application/json': {
            schema: {
              // Reference to the schema for the GetAllResponse.
              $ref: '#/components/schemas/GetAllResponse',
            },
          },
        },
      },
      404: {
        description: 'No data found',
        content: {
          'application/json': {
            schema: {
              // Reference to the schema for the NotFoundResponse.
              $ref: '#/components/schemas/NotFoundResponse',
            },
          },
        },
      },
    },
  },
};

// Exporting the getAllRoute object for use in other modules.
export { getAllRoute };
