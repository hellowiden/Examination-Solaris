// Overlay functionality

/*
Purpose: Display an overlay with the specified ID.

How it works: Fetches the DOM element with the given overlayId 
and sets its display style property to 'flex', making it visible.
*/

const openOverlay = (overlayId) => {
  const overlay = document.getElementById(overlayId);
  overlay.style.display = 'flex';
};

/*
Purpose: Hide (close) an overlay with a specified ID.

How it works: Fetches the DOM element with the given overlayId
and sets its display style property to 'none', making it invisible.
*/

const closeOverlay = (overlayId) => {
  const overlay = document.getElementById(overlayId);
  overlay.style.display = 'none';
};

// API

/*
Purpose: Fetch the API key from the specific server endpoint.

How it works: Uses the fetch API to make a POST request to the server endpoint. 
If the response is successful, it retrieves the API key from the response data 
and returns it. If the response is not successful, it throws an error.
*/

const getApiKey = async () => {
  try {
    const response = await fetch("https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/keys", {
      method: 'POST',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch API key. Status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Retrieved API key:', data.key);

    return data.key;
  } catch (error) {
    console.error('Error fetching API key:', error.message);
  }
};

/*
Purpose: Make a GET request to the specified data endpoint using the provided API key.

How it works: Uses the fetch API to make a GET request with the provided key in the headers.
If the response is successful, it parses the JSON data and calls the provided callback function
with the data. If the response is not successful, it throws an error.
*/

const fetchDataWithKey = async (dataEndpoint, key, callback) => {
  try {
    const response = await fetch(dataEndpoint, { method: 'GET', headers: { 'x-zocom': `${key}` } });

    if (!response.ok) {
      throw new Error(`Failed to fetch data. Status: ${response.status}`);
    }

    const data = await response.json();
    callback(data);

    return data;
  } catch (error) {
    console.error('Error fetching data:', error.message);
  }
};

/*
Purpose: Open overlay, fetch data using the API key, and display the data in the overlay.

How it works: Retrieves the API key using getApiKey, then uses the key to fetch data using 
fetchDataWithKey. If the data is fetched successfully and is of the expected format, it opens an overlay
and displays the data by calling other functions (openOverlay, filterById, displayDataInOverlay).
*/

const displayOverlayData = async (overlayId) => {
  try {
    const apiKey = await getApiKey();

    if (apiKey) {
      const data = await fetchDataWithKey('https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/bodies', apiKey, processData);

      console.log('Fetched data:', data);

      if (data && typeof data === 'object') {
        openOverlay(overlayId);
        const filterByIdResult = filterById(data, overlayId);
        displayDataInOverlay(filterByIdResult, overlayId);
      } else {
        console.error('Invalid data format:', data);
      }
    } else {
      console.error('API key is not available');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

/*
Purpose: Process and print the fetched data.

How it works: If the data is an array, it iterates through
each item and logs it. If the data is not an array, it logs the data itself.
*/

const processData = (data) => {
  if (Array.isArray(data)) {
    for (const item of data) {
      console.log('Data item:', item);
    }
  } else {
    console.log('Data:', data);
  }
};

// Initiates the process by calling the getApiKey function
getApiKey();

/*
Objective: The code is designed to showcase data in an overlay with the specified ID.

Functionality: Retrieves the overlay DOM element using the provided overlayId
and updates its HTML content using the createHTMLFromData function.

Details: If the data is a valid object, the function enhances the overlay presentation by adding animated stars. It creates a stars container, generates star elements with random positions and twinkle animations, and combines them with the data content inside the overlay. In case of an invalid data format, an error message is logged.
*/

const displayDataInOverlay = (data, overlayId) => {
  const overlay = document.getElementById(overlayId);

  if (data && typeof data === 'object') {
    // Add stars to the overlay
    const starsContainer = document.createElement('div');
    starsContainer.classList.add('stars-container');

    for (let i = 0; i < 80; i++) {
      const star = document.createElement('div');
      star.classList.add('star');
      star.style.animation = `twinkle ${(Math.random() * 3) + 1}s infinite linear ${Math.random() * 3}s`;
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      starsContainer.appendChild(star);
    }

    // Create a container for the data content
    const dataContainer = document.createElement('div');
    dataContainer.innerHTML = createHTMLFromData(data, overlayId);

    // Clear the overlay and append both the stars and data containers
    overlay.innerHTML = '';
    overlay.appendChild(starsContainer);
    overlay.appendChild(dataContainer);
  } else {
    console.error('Invalid data format:', data);
  }
};

/*
Objective: The code below aims to filter data based on a specified ID.

Functionality: Utilizes the find method to search for an item in the data.bodies array
that has an ID matching the provided id. The identified item is then logged, and the function returns the found item.
*/

const filterById = (data, id) => {
  const foundItem = data.bodies.find(foundItem => foundItem.id === id);
  console.log(foundItem);

  console.log(data.bodies);
  console.log(data.bodies[0]);

  return data.bodies[id];
};

/*
Purpose: Create HTML content from the fetched data.

How it works: Uses a template literal to generate HTML content
based on the properties of the data object. The resulting HTML includes the information. 
The content is then set in the overlay.
*/

const createHTMLFromData = (data, overlayId) => `
  <div class="overlay-content">
    <div class="container">
      <div class="card">
        <h1>${data.name}</h1>
        <h2>${data.latinName}</h2>
        <p>${data.desc}</p>

        <div class="brake"></div>

        <div class="group group1">
          <h3>OMKRETS</h3>
          <p>${data.circumference} km</p>
        </div>
        <div class="group group2">
          <h3>KM FRÅN SOLEN</h3>
          <p>${data.distance} km</p>
        </div>
        <div class="group group3">
          <h3>MAX TEMPERATUR</h3>
          <p>${data.temp ? `${data.temp.day}°C` : 'N/A'}</p>
        </div>
        <div class="group group4">
          <h3>MIN TEMPERATUR</h3>
          <p>${data.temp ? `${data.temp.night}°C` : 'N/A'}</p>
        </div>

        <div class="brake-2"></div>

        <div class="group group5">
          <h3>MÅNAR</h3>
          <p>${data.moons && data.moons.length > 0 ? data.moons.join(', ') : 'No moons'}</p>
        </div>
      </div>
    </div>
  </div>
  <span class="close-btn" onclick="closeOverlay('${overlayId}')">&times;</span>
`;