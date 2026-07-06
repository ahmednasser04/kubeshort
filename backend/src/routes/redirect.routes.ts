import { Router } from 'express';

import { redirectShortCode } from '../controllers/url.controller';

export const redirectRouter = Router();

redirectRouter.get('/:shortCode', redirectShortCode);
