import { createRoute, createUserBody } from './routeSwager/createRoute';
import { updateRoute, updateUserBody } from './routeSwager/updateRoute';
import { deleteRoute } from './routeSwager/deleteRoute';
import { getAllRoute } from './routeSwager/getAllRoute';
import { getOneRoute } from './routeSwager/getOneRoute';
import {
  createResponse,
  ApiResponse,
  DeleteResponse,
  GetAllResponse,
  GetOneResponse,
  NotFoundResponse,
  UpdateResponse,
} from './schemas/responseSchemas';

const apiDocumentation = {
  openapi: '3.0.1',
  info: {
    version: '1.0.0',
    title: 'Vehicle Administration API',
    description: 'API documentation for managing vehicle records'
  },
  servers: [
    {
      url: 'http://localhost:3000/',
      description: 'Local Server',
    },
  ],
  tags: [
    {
      name: 'Vehicle',
    },
  ],
  paths: {
    '/api/v1/':{
      ...createRoute,
      ...getAllRoute,
      ...updateRoute,
    },
    ...deleteRoute,
    ...getOneRoute,
  },
  components: {
    schemas: {
      createUserBody,
      updateUserBody,
      ApiResponse,
      createResponse,
      DeleteResponse,
      GetAllResponse,
      GetOneResponse,
      NotFoundResponse,
      UpdateResponse,
    },
  },
};

export { apiDocumentation };