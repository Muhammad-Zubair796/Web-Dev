// script.js - Wild Horizons Explorer

const searchBtn = document.getElementById('searchBtn');
const resultsContainer = document.getElementById('resultsContainer');

// ────────────────────────────────────────────────
// Helper functions
// ────────────────────────────────────────────────
function showLoading() {
    resultsContainer.innerHTML = '<p class="loading">Loading amazing places... 🌍</p>';
}

function showError(message) {
    resultsContainer.innerHTML = `<p class="error">${message}</p>`;
}

function showNoResults() {
    resultsContainer.innerHTML = '<p>No places found matching your filters. Try different options!</p>';
}

// ────────────────────────────────────────────────
// Auto-load filters from URL on page open
// (so shared links like ?continent=Asia work)
// ────────────────────────────────────────────────
window.addEventListener('load', () => {
    const urlParams = new URLSearchParams(window.location.search);

    const continent = urlParams.get('continent');
    const country   = urlParams.get('country');
    const publicOnly = urlParams.get('is_open_to_public') === 'true';

    // Pre-fill the form
    if (continent) {
        document.getElementById('continentSelect').value = continent;
    }
    if (country) {
        document.getElementById('countryInput').value = country;
    }
    document.getElementById('publicOnly').checked = publicOnly;

    // Auto-search if any filter is in the URL
    if (continent || country || publicOnly) {
        searchBtn.click();
    }
});

// ────────────────────────────────────────────────
// Main search on button click
// ────────────────────────────────────────────────
searchBtn.addEventListener('click', async () => {
    // Get current filter values
    const continent = document.getElementById('continentSelect').value.trim();
    const country   = document.getElementById('countryInput').value.trim();
    const isPublic  = document.getElementById('publicOnly').checked;

    // Build clean query string
    const params = new URLSearchParams();

    if (continent)   params.append('continent', continent);
    if (country)     params.append('country', country);
    if (isPublic)    params.append('is_open_to_public', 'true');

    const url = '/api' + (params.size > 0 ? '?' + params.toString() : '');

    console.log('Searching:', url); // Debug: check in browser console

    try {
        showLoading();

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Server responded with status ${response.status}`);
        }

        const data = await response.json();

        resultsContainer.innerHTML = '';

        if (!data || data.length === 0) {
            showNoResults();
            return;
        }

        // Render each place as a card
        data.forEach(place => {
            const card = document.createElement('div');
            card.className = 'card';

            // Safe access (prevents errors if details missing/changed)
            const desc = place.details?.[1]?.description || 'No description available.';
            const fact = place.details?.[0]?.fun_fact     || 'No fun fact available.';

            card.innerHTML = `
                <span class="tag">${place.continent || 'Unknown'}</span>
                <h3>${place.name}</h3>
                <p><strong>Location:</strong> ${place.location}, ${place.country}</p>
                <p>${desc}</p>
                <span class="fun-fact">💡 ${fact}</span>
            `;

            resultsContainer.appendChild(card);
        });

    } catch (error) {
        console.error('Search failed:', error);
        showError(`Failed to load places: ${error.message}.<br>Please try again or check your connection.`);
    }
});
