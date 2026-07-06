import express from 'express';
import cors from 'cors';

import { env } from './config/env';
import { errorHandler } from './middleware/error-handler';
import { notFound } from './middleware/not-found';
import { requestLogger } from './middleware/request-logger';
import { healthRouter } from './routes/health.routes';
import { redirectRouter } from './routes/redirect.routes';
import { urlRouter } from './routes/url.routes';

const app = express();
const allowedOrigin = env.frontendUrl;

app.disable('x-powered-by');
app.use(
	cors({
		origin: allowedOrigin ?? false,
		methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
		allowedHeaders: ['Content-Type', 'Authorization']
	})
);
app.use(requestLogger);
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: false }));
app.use('/health', healthRouter);
app.use('/api/v1/urls', urlRouter);
app.use('/', redirectRouter);
app.use(notFound);
app.use(errorHandler);

export default app;
