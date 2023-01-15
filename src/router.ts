import * as http from 'http';
// @ts-ignore
import { getAll, getUser, postUser, deleteUser, putUser } from './methods.ts';

export default function (req: http.IncomingMessage, res: http.ServerResponse) {
  const baseURL = '/api/users';
  const regex = new RegExp(baseURL + '/+');
  switch (req.method) {
    case 'GET':
      if (req.url === baseURL) {
        getAll(req, res);
      } else if (regex.test(req.url)) {
        getUser(req, res);
      } else {
        res.writeHead(404);
        res.end(JSON.stringify({ error: 'Endpoint does not exist' }));
      }
      break;
    case 'POST':
      postUser(req, res);
      break;
    case 'PUT':
      putUser(req, res);
      break;
    case 'DELETE':
      deleteUser(req, res);
      break;
    default:
      res.writeHead(404);
      res.end(JSON.stringify({ error: 'Resource1 not found' }));
      break;
  }
}
