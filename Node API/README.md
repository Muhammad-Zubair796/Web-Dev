[![Node.js](https://img.shields.io/badge/Node.js-22.x-green?logo=node.js&logoColor=white)](https://nodejs.org)
[![Render](https://img.shields.io/badge/Deployed%20on-Render-46a2f1?logo=render&logoColor=white)](https://render.com)

# Wild Horizons 🌍

A modern, responsive web application for discovering breathtaking natural wonders from around the world.  
Filter places by continent, country, or whether they are open to the public — and explore detailed descriptions and fun facts.

![Wild Horizons Screenshot](Capture.PNG)  
*(Replace this with a real screenshot of your app once deployed)*

## Features

- Browse a curated list of unique natural wonders (caves, lakes, deserts, waterfalls, geological formations, etc.)
- Filter by:
  - Continent
  - Country
  - Accessibility (open to public)
- Clean, card-based UI with fun facts and descriptions
- Responsive design (mobile + desktop)
- Backend API built with Node.js (pure http module — no Express)
- Deployed on Render

## Tech Stack

| Layer       | Technology                  |
|-------------|-----------------------------|
| Frontend    | HTML5, CSS3, Vanilla JavaScript |
| Backend     | Node.js (http module)       |
| Data        | Static JSON-like array      |
| Deployment  | Render.com                  |

No external frameworks or heavy dependencies — pure and lightweight.

## Demo

Live version:  
👉 https://wild-horizons-api-8o6q.onrender.com/

(Sometimes Render free tier may take 10–30 seconds to wake up on first visit)
## API Testing (Manual Checks)

You can test the API endpoints directly in your browser to confirm everything is working. These URLs return JSON data:

1. **All places**  
   [https://wild-horizons-api-8o6q.onrender.com/api](https://wild-horizons-api-8o6q.onrender.com/api)  
   → Should return the full list of natural wonders as JSON.

2. **Asia only**  
   [https://wild-horizons-api-8o6q.onrender.com/api/continent/Asia](https://wild-horizons-api-8o6q.onrender.com/api/continent/Asia)  
   → Should return only places located in Asia.

3. **Asia + open to public**  
   [https://wild-horizons-api-8o6q.onrender.com/api/continent/Asia?is_open_to_public=true](https://wild-horizons-api-8o6q.onrender.com/api/continent/Asia?is_open_to_public=true)  
   → Should return only public-access places in Asia.

4. **Pakistan only**  
   [https://wild-horizons-api-8o6q.onrender.com/api/country/Pakistan](https://wild-horizons-api-8o6q.onrender.com/api/country/Pakistan)  
   → Should return only places located in Pakistan.

**Tip:** If the Render service is in sleep mode (free tier), the first request might take 10–30 seconds to wake up. Subsequent requests will be fast.

## API Endpoints

| Method | Endpoint                          | Description                              |
|--------|-----------------------------------|------------------------------------------|
| GET    | `/api`                            | Get all places (with optional query filters) |
| GET    | `/api/continent/:continent`       | Filter by continent                      |
| GET    | `/api/country/:country`           | Filter by country                        |

### Quick Manual Tests

[the block above]

## Installation & Local Development

1. Clone the repository

```bash
git clone https://github.com/Muhammad-Zubair796/Web-Dev.git
cd Web-Dev

Install dependencies (only needed if you add packages later)

Bashnpm install

Run the server locally

Bashnode server.js

Open in browser:
http://localhost:8000

Project Structure
text.
├── index.html          # Main frontend page
├── style.css           # All styling
├── script.js           # Client-side logic & fetch calls
├── server.js           # Node.js backend + API + static file serving
├── data.js             # Source of all natural wonders data
├── utils/
│   ├── db.js                   # Data loading logic
│   ├── sendJSONResponse.js     # Helper for JSON responses
│   ├── getDataByPathParams.js  # Continent/country filtering
│   └── getDataByQuerryParam.js # Query param filtering
└── package.json
API Endpoints
MethodEndpointDescriptionExampleGET/apiGet all places (with optional query filters)/api?is_open_to_public=trueGET/api/continent/:continentFilter by continent/api/continent/AsiaGET/api/country/:countryFilter by country/api/country/Pakistan
Contributing
Contributions are welcome!

Fork the repository
Create your feature branch (git checkout -b feature/amazing-feature)
Commit your changes (git commit -m 'Add some amazing feature')
Push to the branch (git push origin feature/amazing-feature)
Open a Pull Request

License
This project is open-source and available under the MIT License.
Acknowledgments

Inspired by the world's most fascinating natural locations
Built with passion for travel, geography, and clean web development
Thanks to Render for free & easy hosting

Made with ❤️ in Islamabad, Pakistan
