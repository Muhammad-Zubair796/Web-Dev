// sightingEvents.js
import { EventEmitter } from 'node:events';
import { createAlert } from '../utils/createAlert.js';
export const sightingEvents = new EventEmitter();
sightingEvents.on('sighting-added', (data) => {
    const alert = createAlert(data);
    console.log("👻 NEW GHOST ALERT:", alert);
});