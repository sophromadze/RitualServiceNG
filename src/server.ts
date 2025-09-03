import 'zone.js/node';
import { APP_BASE_HREF } from '@angular/common';
import { renderApplication } from '@angular/platform-server';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import { readFileSync } from 'node:fs';

// Define valid routes for 404 checking
const validRoutes = [
  '/',
  '/en',
  '/ru',
  '/about',
  '/en/about',
  '/ru/about',
  '/services',
  '/en/services',
  '/ru/services',
  '/products',
  '/en/products',
  '/ru/products',
  '/locations',
  '/en/locations',
  '/ru/locations',
  '/404'
];

// Add all service detail routes
const serviceRoutes = [
  '/services/hearse',
  '/services/transportation',
  '/services/mourning-hall',
  '/services/grave-preparation',
  '/services/metal-letters',
  '/services/embalming-dressing',
  '/services/microbus',
  '/services/hall',
  '/services/cemetery-decoration',
  '/services/grave-stones',
  '/services/lifting-machine'
];

// Add all product detail routes
const productRoutes = [
  '/products/coffins',
  '/products/shrouds',
  '/products/refrigeration',
  '/products/cemetery-accessories'
];

// Add English and Russian versions
const allValidRoutes = [
  ...validRoutes,
  ...serviceRoutes,
  ...productRoutes,
  ...serviceRoutes.map(route => `/en${route}`),
  ...serviceRoutes.map(route => `/ru${route}`),
  ...productRoutes.map(route => `/en${route}`),
  ...productRoutes.map(route => `/ru${route}`)
];

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(browserDistFolder, 'index.html');
  const indexHtmlContent = readFileSync(indexHtml, 'utf-8').toString();

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // Serve static files from /browser
  server.get('*.*', express.static(browserDistFolder, {
    maxAge: '1y'
  }));

  // All regular routes use Angular Universal
  server.get('*', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;
    
    // Check if the route is valid
    const cleanUrl = originalUrl.split('?')[0]; // Remove query parameters
    const isValidRoute = allValidRoutes.includes(cleanUrl) || 
                        cleanUrl.startsWith('/en/') || 
                        cleanUrl.startsWith('/ru/') ||
                        cleanUrl === '/404';

    if (!isValidRoute) {
      // Return 404 status for invalid routes
      res.status(404);
    }

    renderApplication(
      () => import('./main.server').then(m => m.default()),
      {
        document: indexHtmlContent,
        url: `${protocol}://${headers.host}${originalUrl}`,
        platformProviders: [
          { provide: APP_BASE_HREF, useValue: baseUrl },
        ],
      }
    )
    .then((html: string) => res.send(html))
    .catch((err: Error) => next(err));
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Only run the server when this module is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  run();
}

export default app; 