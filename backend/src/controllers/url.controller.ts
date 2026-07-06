import type { RequestHandler } from 'express';

import { urlService } from '../services/url.service';

export const createUrl: RequestHandler = async (req, res) => {
  const url = await urlService.createUrl({
    originalUrl: req.body?.originalUrl
  });

  res.status(201).json({
    data: url,
    message: 'URL created successfully.',
    success: true
  });
};

export const getUrlByShortCode: RequestHandler = async (req, res) => {
  const url = await urlService.getUrlByShortCode(req.params.shortCode);

  res.status(200).json({
    data: url,
    message: 'URL retrieved successfully.',
    success: true
  });
};

export const deleteUrlByShortCode: RequestHandler = async (req, res) => {
  const url = await urlService.deleteUrlByShortCode(req.params.shortCode);

  res.status(200).json({
    data: url,
    message: 'URL deleted successfully.',
    success: true
  });
};

export const redirectShortCode: RequestHandler = async (req, res) => {
  const originalUrl = await urlService.resolveShortCode(req.params.shortCode);

  res.redirect(302, originalUrl);
};
