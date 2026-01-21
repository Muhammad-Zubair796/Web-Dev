export const getDataByQueryParam = (data, queryObj) => {
    // 1. Unpack the search settings from the URL
    const { continent, country, is_open_to_public } = queryObj;
    let filteredData = data;

    // 2. If user asked for a continent (?continent=asia)
    if (continent) {
        filteredData = filteredData.filter(dest => 
            dest.continent.toLowerCase() === continent.toLowerCase()
        );
    }

    // 3. If user asked for a country (?country=pakistan)
    if (country) {
        filteredData = filteredData.filter(dest => 
            dest.country.toLowerCase() === country.toLowerCase()
        );
    }

    // 4. If user asked about public access (?is_open_to_public=true)
    if (is_open_to_public !== undefined) {
        // We use JSON.parse because URL text "true" needs to become a real boolean true
        filteredData = filteredData.filter(dest => 
            dest.is_open_to_public === JSON.parse(is_open_to_public)
        );
    }

    return filteredData;
}