import { Router } from 'express';

import {
  createUrl,
  deleteUrlByShortCode,
  getUrlByShortCode
} from '../controllers/url.controller';

export const urlRouter = Router();

urlRouter.post('/', createUrl);
urlRouter.get('/:shortCode', getUrlByShortCode);
urlRouter.delete('/:shortCode', deleteUrlByShortCode);
