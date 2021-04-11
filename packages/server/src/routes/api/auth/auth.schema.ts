import { RouteShorthandOptions } from 'fastify';

export interface ILoginBody {
  id: string;
  password: string;
}

export const loginSchema: RouteShorthandOptions = {
  schema: {
    body: {
      type: 'object',
      required: ['id', 'password'],
      properties: {
        id: { type: 'string' },
        password: { type: 'string' },
      },
    },
    response: {
      201: {
        type: 'object',
        properties: {
          message: { type: 'string' },
          data: {
            id: { type: 'string' },
            user_id: { type: 'string' },
            email: { type: 'string' },
            profile: {
              tag: { type: 'string' },
              short_bio: { type: 'string' },
            },
          },
          token: { type: 'string' },
        },
      },
      '4xx': {
        type: 'object',
        properties: {
          message: { type: 'string' },
        },
      },
      500: {
        type: 'object',
        properties: {
          message: { type: 'string' },
        },
      },
    },
  },
};

export interface IRegisterBody {
  id: string;
  password: string;
  email: string;
  tag: string;
}

export const registerSchema: RouteShorthandOptions = {
  schema: {
    body: {
      type: 'object',
      required: ['id', 'password', 'email', 'tag'],
      properties: {
        id: { type: 'string' },
        user_id: { type: 'string' },
        password: { type: 'string' },
        email: { type: 'string' },
        tag: { type: 'string' },
      },
    },
    response: {
      201: {
        type: 'object',
        properties: {
          message: { type: 'string' },
          data: {
            id: { type: 'string' },
            email: { type: 'string' },
            profile: {
              tag: { type: 'string' },
              short_bio: { type: 'string' },
            },
          },
        },
      },
      '4xx': {
        type: 'object',
        properties: {
          message: { type: 'string' },
        },
      },
      500: {
        type: 'object',
        properties: {
          message: { type: 'string' },
        },
      },
    },
  },
};
