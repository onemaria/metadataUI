import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [selectedContainer, setSelectedContainer] = useState(''); // Selected container name
  const [results, setResults] = useState(null); // API results
  const [errorResponse, setErrorResponse] = useState(null); // Error response

  const fetchContainerData = async () => {
    if (!selectedContainer) {
      alert('Please select a repository first.');
      return;
    }

    try {
      const response = await axios.get(
        `https://idr-testing.openmicroscopy.org/searchengine2/api/v1/resources/container_images/`,
        {
          params: { data_source: selectedContainer }, // Use selectedContainer as data_source
        },
        {
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );
      setResults(response.data); // Assume the response is JSON data
      setErrorResponse(null); // Clear any previous error response
    } catch (error) {
      console.error('Error fetching container data:', error);
      setErrorResponse(error.response ? error.response.data : { message: error.message });
      setResults(null); // Clear previous results
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Container Data Viewer</h1>

      {/* Dropdown for container names */}
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="container-select">Select the data repository:</label>
        <select
          id="container-select"
          value={selectedContainer}
          onChange={(e) => setSelectedContainer(e.target.value)}
          style={{ marginLeft: '10px', padding: '5px' }}
        >
          <option value="">-- Select the repository --</option>
          <option value="idr">idr</option>
          <option value="ssbd">ssbd</option>
          <option value="bia">bia</option>
        </select>
      </div>

      {/* Button to fetch data */}
      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={fetchContainerData}
          style={{ padding: '10px 20px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          Fetch Data
        </button>
      </div>

      {/* Display results or error */}
      <div>
        <h2>Results:</h2>
        {results && (
          <div style={{ background: '#f4f4f4', padding: '10px', borderRadius: '5px', overflowX: 'auto' }}>
            <pre>{JSON.stringify(results, null, 2)}</pre>
          </div>
        )}
        {errorResponse && (
          <div style={{ background: '#f8d7da', padding: '10px', borderRadius: '5px', overflowX: 'auto', color: '#721c24' }}>
            <h3>Error:</h3>
            <pre>{JSON.stringify(errorResponse, null, 2)}</pre>
          </div>
        )}
        {!results && !errorResponse && <p>No data to display. Click "Fetch Data" after selecting a repository.</p>}
      </div>
    </div>
  );
};

export default App;