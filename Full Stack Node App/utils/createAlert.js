// utils/createAlert.js
export function createAlert(sighting) {
  // Create an alert based on the sighting data
  const alert = {
    title: sighting.title,
    location: sighting.location,
    timestamp: sighting.timeStamp,
    text: sighting.text
  };
  return alert;
}