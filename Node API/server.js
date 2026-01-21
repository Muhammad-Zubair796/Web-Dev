import http from 'node:http';
import { getDataFromDB } from './utils/db.js';
import { sendJSONResponse } from './utils/sendJSONResponse.js'; 
import { getDataByPathParams } from './utils/getDataByPathParams.js';
import { getDataByQueryParam } from './utils/getDataByQuerryParam.js'; // Import your new tool!

const PORT = process.env.PORT || 8000;
const server = http.createServer(async (req, res) => {
    const urlObject = new URL(req.url, `http://${req.headers.host}`);
    const queryObject = Object.fromEntries(urlObject.searchParams); // The search settings
    const destinations = await getDataFromDB();

    // 1. The Main API Route (Now with Search Power!)
    if (urlObject.pathname === '/api' && req.method === 'GET') {
        // Use your new function to filter the data based on the query (?...)
        const filtered = getDataByQueryParam(destinations, queryObject);
        sendJSONResponse(res, 200, filtered);
    } 
    
    // 2. The Path Route (continent)
    else if (urlObject.pathname.startsWith('/api/continent')) {
        const continent = urlObject.pathname.split('/').pop();
        const filtered = getDataByPathParams(destinations, 'continent', continent);
        sendJSONResponse(res, 200, filtered);
    } 

    // 3. The Path Route (country)
    else if (urlObject.pathname.startsWith('/api/country')) {
        const country = urlObject.pathname.split('/').pop();
        const filtered = getDataByPathParams(destinations, 'country', country);
        sendJSONResponse(res, 200, filtered);
    } 
    
    else {
        sendJSONResponse(res, 404, { message: 'Route not found' });
    }
}); 


server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
