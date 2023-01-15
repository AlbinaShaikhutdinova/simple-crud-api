import http from 'http';
import * as uuid from 'uuid';
// @ts-ignore
import { User, BaseUser, instanceOfBaseUser, methodResponse } from './interface.ts';
// @ts-ignore
import * as service from './service.ts';
// @ts-ignore
import { parseBody } from '../helpers/parseBody.ts';
// @ts-ignore
import { writeToDB } from '../helpers/db.ts';

export async function getAll(req: http.IncomingMessage, res: http.ServerResponse) {
  try {
    const users: User[] = await service.findAll();
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.write(JSON.stringify(users));
    res.end();
  } catch (e) {
    res.statusCode = 500;
    res.end(
      JSON.stringify({ error: "Internal server error. Couldn't retrieve data", message: e.message })
    );
  }
}

// GET items/:id

export async function getUser(req: http.IncomingMessage, res: http.ServerResponse) {
  const id: string = req.url.split('/')[3];
  if (uuid.validate(id)) {
    try {
      const user: User = await service.find(id);
      if (user) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify(user));
        res.end();
      } else {
        res.statusCode = 404;
        res.end(JSON.stringify({ message: 'User is not found' }));
      }
    } catch (e) {
      res.statusCode = 500;
      res.end(
        JSON.stringify({
          error: "Internal server error. Couldn't retrieve data",
          message: e.message,
        })
      );
    }
  } else {
    res.statusCode = 400;
    res.end(JSON.stringify({ error: 'UUID is invalid' }));
  }
}

// POST items

export async function postUser(req: http.IncomingMessage, res: http.ServerResponse) {
  try {
    const user: BaseUser = await parseBody(req);
    if (!instanceOfBaseUser(user)) {
      res.statusCode = 400;
      res.end(
        JSON.stringify({
          error: 'Wrong user format',
        })
      );
    } else {
      const createResponse: methodResponse = await service.create(user);
      res.statusCode = 201;
      await writeToDB(JSON.stringify(createResponse.newUserList));
      res.setHeader('Content-Type', 'application/json');
      res.write(JSON.stringify(createResponse.updatedUser));
      res.end();
    }
  } catch (e) {
    res.statusCode = 500;
    res.end(
      JSON.stringify({
        error: "Internal server error. Couldn't post data",
        message: e.message,
      })
    );
  }
}

// PUT items/:id

export async function putUser(req: http.IncomingMessage, res: http.ServerResponse) {
  const id: string = req.url.split('/')[3];
  if (uuid.validate(id)) {
    try {
      const user: BaseUser = await parseBody(req);
      const updateResponse: methodResponse | null = await service.update(id, user);
      if (updateResponse) {
        res.statusCode = 200;
        await writeToDB(JSON.stringify(updateResponse.newUserList));
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify(updateResponse.updatedUser));
        res.end();
      } else {
        res.statusCode = 404;
        res.end(JSON.stringify({ message: 'User is not found' }));
      }
    } catch (e) {
      res.statusCode = 500;
      res.end(
        JSON.stringify({
          error: "Internal server error. Couldn't retrieve data",
          message: e.message,
        })
      );
    }
  } else {
    res.statusCode = 400;
    res.end(JSON.stringify({ error: 'UUID is invalid' }));
  }
}

// DELETE items/:id

export async function deleteUser(req: http.IncomingMessage, res: http.ServerResponse) {
  const id: string = req.url.split('/')[3];
  if (uuid.validate(id)) {
    try {
      const updatedUserList: User[] | null = await service.remove(id);
      if (updatedUserList) {
        res.statusCode = 204;
        await writeToDB(JSON.stringify(updatedUserList));
        res.end(JSON.stringify({ message: 'User is deleted' }));
      } else {
        res.statusCode = 404;
        res.end(JSON.stringify({ message: 'User is not found' }));
      }
    } catch (e) {
      res.statusCode = 500;
      res.end(
        JSON.stringify({
          error: "Internal server error. Couldn't retrieve data",
          message: e.message,
        })
      );
    }
  } else {
    res.statusCode = 400;
    res.end(JSON.stringify({ error: 'UUID is invalid' }));
  }
}
