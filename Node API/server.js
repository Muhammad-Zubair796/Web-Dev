import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { getDataFromDB } from './utils/db.js';
import { sendJSONResponse } from './utils/sendJSONResponse.js';
import { getDataByPathParams } from './utils/getDataByPathParams.js';
import { getDataByQueryParam } from './utils/getDataByQuerryParam.js';

// Needed for __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 8000;

const server = http.createServer(async (req, res) => {
    const urlObject = new URL(req.url, `http://${req.headers.host}`);
    const pathname = urlObject.pathname;

    // ────────────────────────────────
    //   Serve static files (html, css, js)
    // ────────────────────────────────
    if (req.method === 'GET') {
        // Root → serve index.html
        if (pathname === '/' || pathname === '/index.html') {
            const filePath = path.join(__dirname, 'index.html');
            serveStaticFile(res, filePath, 'text/html');
            return;
        }

        // Serve css, js, images, etc...
        if (
            pathname.endsWith('.css') ||
            pathname.endsWith('.js') ||
            pathname.endsWith('.png') ||
            pathname.endsWith('.jpg') ||
            pathname.endsWith('.jpeg') ||
            pathname.endsWith('.svg') ||
            pathname.endsWith('.ico')
        ) {
            const filePath = path.join(__dirname, pathname);
            serveStaticFile(res, filePath);
            return;
        }
    }

    // ────────────────────────────────
    //   Your existing API routes
    // ────────────────────────────────
    const destinations = await getDataFromDB();

    // 1. Main API with query params
    if (pathname === '/api' && req.method === 'GET') {
        const filtered = getDataByQueryParam(destinations, Object.fromEntries(urlObject.searchParams));
        sendJSONResponse(res, 200, filtered);
        return;
    }

    // 2. Continent
    if (pathname.startsWith('/api/continent/')) {
        const continent = pathname.split('/').pop();
        const filtered = getDataByPathParams(destinations, 'continent', continent);
        sendJSONResponse(res, 200, filtered);
        return;
    }

    // 3. Country
    if (pathname.startsWith('/api/country/')) {
        const country = pathname.split('/').pop();
        const filtered = getDataByPathParams(destinations, 'country', country);
        sendJSONResponse(res, 200, filtered);
        return;
    }

    // 404 everything else
    sendJSONResponse(res, 404, { message: 'Route not found' });
});

// Helper function to serve files
function serveStaticFile(res, filePath, contentType = null) {
    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('File not found');
            return;
        }

        // Guess content type if not provided
        if (!contentType) {
            const ext = path.extname(filePath).toLowerCase();
            contentType =
                ext === '.js' ? 'application/javascript' :
                ext === '.css' ? 'text/css' :
                ext === '.png' ? 'image/png' :
                ext === '.jpg' || ext === '.jpeg' ? 'image/jpeg' :
                ext === '.svg' ? 'image/svg+xml' :
                ext === '.ico' ? 'image/x-icon' :
                'text/plain';
        }

        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
    });
}

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
