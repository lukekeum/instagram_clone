import { config } from 'dotenv';
import { resolve } from 'path';

const { NODE_ENV } = process.env;

const path = resolve(
  process.cwd(),
  NODE_ENV === 'production' ? '.env' : '.env.development',
);

config({ path });
