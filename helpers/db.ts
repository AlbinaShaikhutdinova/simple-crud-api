import fs from 'fs';
import path from 'path';
// @ts-ignore
import { __dirname } from './getDirname.ts';
export async function writeToDB(data: string) {
  return new Promise(async (resolve, reject) => {
    try {
      await fs.promises.writeFile(path.join(__dirname, '..', 'data.json'), data);
      resolve(data);
    } catch (err) {
      reject(err);
    }
  });
}
