import fs from 'fs';
import path from 'path';
// @ts-ignore
import { __dirname } from './getDirname.ts';
export async function writeToDB(data: string) {
  return new Promise(async (resolve, reject) => {
    try {
      const filename = process.env.NODE_ENV === 'test' ? 'test-data.json' : 'data.json';
      await fs.promises.writeFile(path.join(__dirname, '..', 'db', filename), data);
      resolve(data);
    } catch (err) {
      reject(err);
    }
  });
}
export async function readFromDB() {
  return new Promise(async (resolve, reject) => {
    try {
      const filename = process.env.NODE_ENV === 'test' ? 'test-data.json' : 'data.json';
      const buffer = await fs.promises.readFile(path.join(__dirname, '..', 'db', filename));
      resolve(JSON.parse(buffer.toString()));
    } catch (err) {
      reject(err);
    }
  });
}
