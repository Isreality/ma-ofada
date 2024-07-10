import "../style.css";
import { useAuth } from '../Components/AuthContext';
import { useState, useEffect } from 'react';

const FetchCategory = () => {
  const { authToken, setStatusCode } = useAuth();
  const [data, setData] = useState([]);
  // const [categories, setCategories] = useState([]);

  const [error, setError] = useState(null);

  const BASE_URL = 'https://c0ed-102-89-34-235.ngrok-free.app/api';
  const endpoint = '/product-category';
  const Atoken = JSON.parse(sessionStorage.getItem('data')).token.original.access_token;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(BASE_URL + endpoint, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${Atoken}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'ngrok-skip-browser-warning': "69420",
            'origin': '*',
          },
        });

        setStatusCode(response.status);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        if (result.status) {
          console.log(result);
          setData(result.data);
        } else {
          throw new Error('Data fetch unsuccessful');
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, [Atoken, setStatusCode]);

  return (
    <div>
        <div className="">
          {data.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
          {/* <option value="1">Category 1</option> */}
          {/* <p>Category 1</p> */}
        </div><br/>

    </div>
  );
}

export default FetchCategory;