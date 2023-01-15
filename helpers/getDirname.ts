import path from 'path';
import { fileURLToPath } from 'url';

//export const __filename = fileURLToPath(import.meta.url);
const regex = /\\/g;
export const __dirname = path.join(process.cwd(), 'helpers');
