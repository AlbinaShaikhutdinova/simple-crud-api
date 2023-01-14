import * as http from 'http';
import dotenv from 'dotenv';
import path from 'path';
// @ts-ignore
import { __dirname } from './helpers/getDirname.ts';
// @ts-ignore
import router from './src/router.ts';
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const PORT = process.env.PORT || 4000;
const HOST = process.env.HOST || 'localhost';
const server = http.createServer(router);
server.listen(PORT, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});
