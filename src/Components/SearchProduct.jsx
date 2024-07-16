// Search.js
import { useState, useEffect } from 'react';

function SearchProduct({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearch(query);
    }
  };

  // const BASE_URL = 'https://c0ed-102-89-34-235.ngrok-free.app/api';
  // const searchEndpoint = '/seller/product/search?searchQuery=cat fish&minPrice=&maxPrice=&ratings=&categoryId=';
  // const Atoken = JSON.parse(sessionStorage.getItem('data')).token.original.access_token;

  // const handleSearch = async (e) => {

  //   try {
  //     const response = await fetch(BASE_URL + searchEndpoint, {
  //       method: 'GET',
  //       headers: {
  //         'Authorization': `Bearer ${Atoken}`,
  //         'Content-Type': 'application/json',
  //         'Accept': 'application/json',
  //         'ngrok-skip-browser-warning': "69420",
  //         'origin': '*',
  //       },
  //     });

  //   //   setStatusCode(response.status);

  //     if (!response.ok) {
  //       throw new Error('Network response was not ok');
  //     }

  //     const result = await response.json();
  //     onSearch(result.data);
  //   } catch (error) {
  //     console.error('Error fetching search results:', error.message);
  //     onSearch([]); // Clear results on error
  //   }
  // };

  // const handleInputChange = (e) => {
  //   const newQuery = e.target.value;
  //   setQuery(newQuery);
  //   handleSearch(newQuery);
  // };

  return (
    <input
      type="text"
      value={query}
      onChange={e => setQuery(e.target.value)}
      onKeyDown={handleKeyDown}
      placeholder="Search for a product..."
      className="w-full px-3 py-3 border rounded text-black2 focus:outline-disable"
    />
  );
}

export default SearchProduct;
