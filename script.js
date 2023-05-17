
document.addEventListener('DOMContentLoaded', () => {
    // Recover Dom elements
    const fetchButton = document.getElementById('fetchButton');
    const nameInput = document.getElementById('nameInput');
    const countrySelect = document.getElementById('countrySelect');
    const resultsContainer = document.getElementById('container');

// Event listener when click on button
    fetchButton.addEventListener('click', () => {

// In the function recover name and country selected     
        const name = nameInput.value.trim();
        const country = countrySelect.value;
// if name is empty => ignore
        if (name === '') {
            return;
        }

        const cacheKey = `${name}-${country}`;
// Check if result is in localStorage
        const cachedResult = localStorage.getItem(cacheKey);
        if (cachedResult) {
// Create a div element div for display result
            const resultDiv = document.createElement('div');
            resultDiv.textContent = cachedResult;
            resultsContainer.appendChild(resultDiv);
// Ignore request if already in localStorage
            return; 
        }

// URL of API Agify for getting name + country
        const url = `https://api.agify.io/?name=${encodeURIComponent(name)}&country_id=${encodeURIComponent(country)}`;

// Fetch request 
        fetch(url)
            .then(response => response.json()) // Convert response in JSON 
            .then(data => {
// Check if data exists
                if (data.count > 0) {
// Create div element for result
                    const resultDiv = document.createElement('div');
                    resultDiv.textContent = `Name: ${name}, Count: ${data.count}, Median Age: ${data.age}`;
                    resultsContainer.appendChild(resultDiv);

// set result in localStorage
                    localStorage.setItem(cacheKey, resultDiv.textContent);
                } else {
// Create div element for unfounded name
                    const resultDiv = document.createElement('div');
                    resultDiv.textContent = `No results found in ${country} for the name: ${name} `;
                    resultsContainer.appendChild(resultDiv);
                }
            })
            .catch(error => {
// Errors handling
                console.error(error);
            });
    });
});