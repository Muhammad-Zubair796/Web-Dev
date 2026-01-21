const searchBtn = document.getElementById('searchBtn');
const resultsContainer = document.getElementById('resultsContainer');

// Optional: show a loading message while fetching
function showLoading() {
    resultsContainer.innerHTML = '<p class="loading">Loading places... 🌍</p>';
}

function showError(message) {
    resultsContainer.innerHTML = `<p class="error">${message}</p>`;
}

searchBtn.addEventListener('click', async () => {
    const continent = document.getElementById('continentSelect').value.trim();
    const country   = document.getElementById('countryInput').value.trim();
    const isPublic  = document.getElementById('publicOnly').checked;

    // Build the correct URL based on what the backend supports
    let url = '/api';

    // Continent has priority over country (you can change logic if needed)
    if (continent) {
        url = `/api/continent/${encodeURIComponent(continent)}`;
    } else if (country) {
        url = `/api/country/${encodeURIComponent(country)}`;
    }

    // Add public filter as query parameter (backend already supports query params)
    if (isPublic) {
        url += '?is_open_to_public=true';
    }

    console.log('Fetching from:', url); // ← helpful for debugging

    try {
        showLoading();

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Server error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        resultsContainer.innerHTML = '';

        if (!data || data.length === 0) {
            resultsContainer.innerHTML = '<p>No places found matching your selection.</p>';
            return;
        }

        // Display each place as a card
        data.forEach(place => {
            const card = document.createElement('div');
            card.className = 'card';

            // Safely access details (with fallback if structure changes)
            const description = place.details?.[1]?.description || 'No description available';
            const funFact     = place.details?.[0]?.fun_fact     || 'No fun fact available';

            card.innerHTML = `
                <span class="tag">${place.continent || 'Unknown'}</span>
                <h3>${place.name}</h3>
                <p><strong>Location:</strong> ${place.location}, ${place.country}</p>
                <p>${description}</p>
                <span class="fun-fact">💡 ${funFact}</span>
            `;

            resultsContainer.appendChild(card);
        });

    } catch (error) {
        console.error('Fetch failed:', error);
        showError(`Could not load places: ${error.message}.<br>Please check your internet or try again later.`);
    }
});
