import app from '../src/app';
import { ensureDefaultAdmin } from '../src/repositories/adminAccount.repository';
import { ensureConfigExists } from '../src/repositories/appConfig.repository';

let initialized = false;

export default async function handler(req: any, res: any) {
  if (!initialized) {
    try {
      await ensureDefaultAdmin();
      await ensureConfigExists();
    } catch (e) {
      console.error('Vercel initialization error:', e);
    }
    initialized = true;
  }
  return app(req, res);
}
