import { nanoid } from 'nanoid';

import { env } from '../config/env';

export const generateShortCode = (length: number = env.shortCodeLength): string => nanoid(length);
