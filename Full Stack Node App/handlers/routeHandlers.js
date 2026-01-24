// Full Stack Node App/handlers/routeHandlers.js
import { getData } from '../utils/getData.js';
import { sendResponse } from '../utils/sendResponse.js';
import { parseJSONBody } from '../utils/parseJSONBody.js';
import { addNewSighting } from '../utils/addNewSighting.js';
import { sanitizeInput } from '../utils/sanitizeInput.js';
import { sightingEvents } from '../events/sightingEvents.js';
import { stories } from '../data/stories.js';

export async function handleGet(res) {
    const data = await getData();
    const content = JSON.stringify(data);
    sendResponse(res, 200, 'application/json', content);
}

export async function handlePost(req, res) {
    try {
        const parsedBody = await parseJSONBody(req);
        const sanitizedBody = sanitizeInput(parsedBody);
        await addNewSighting(sanitizedBody);
        sendResponse(res, 201, 'application/json', JSON.stringify(sanitizedBody));
        
        // This triggers the alert/event
        sightingEvents.emit('sighting-added', sanitizedBody);

    } catch (err) {
        sendResponse(res, 400, 'application/json', JSON.stringify({ error: err.message || err }));
    }
} // <--- Added this bracket to close handlePost

export async function handleNews(req, res) {
     // Getting stories to use in the interval
    

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();

    // The interval MUST be inside the function so it has access to 'res'
    const intervalId = setInterval(() => {
        if (stories.length > 0) {
            let randomIndex = Math.floor(Math.random() * stories.length);

            res.write(
                `data: ${JSON.stringify({
                    event: 'news-update',
                    story: stories[randomIndex]
                })}\n\n`
            );
        }
    }, 3000);

    // Important: Stop the timer if the user closes the connection
    req.on('close', () => {
        clearInterval(intervalId);
        res.end();
    });
} 