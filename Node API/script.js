const searchBtn = document.getElementById('searchBtn');
const resultsContainer = document.getElementById('resultsContainer');

searchBtn.addEventListener('click', async () => {
    // 1. Get values from the inputs
    const continent = document.getElementById('continentSelect').value;
    const country = document.getElementById('countryInput').value;
    const isPublic = document.getElementById('publicOnly').checked;

    // 2. Build the long URL (The Query String)
let url = `https://wild-horizons-api-8o6q.onrender.com/api`;
    if (continent) url += `continent=${continent}&`;
    if (country) url += `country=${country}&`;
    if (isPublic) url += `is_open_to_public=true`;

    try {
        // 3. Fetch from your server
        const response = await fetch(url);
        const data = await response.json();

        // 4. Clear old results
        resultsContainer.innerHTML = '';

        // 5. Create elements for each place
        data.forEach(place => {
            const card = document.createElement('div');
            card.className = 'card';
            
            // Note how we dig into details[0] and details[1]!
            card.innerHTML = `
                <span class="tag">${place.continent}</span>
                <h3>${place.name}</h3>
                <p><strong>Location:</strong> ${place.location}, ${place.country}</p>
                <p>${place.details[1].description}</p>
                <span class="fun-fact">💡 ${place.details[0].fun_fact}</span>
            `;
            resultsContainer.appendChild(card);
        });

    } catch (error) {
        resultsContainer.innerHTML = "<p>Error connecting to server. Is it running?</p>";
    }

});

