import "../style.css";
import classNames from 'classnames';
import { useAuth } from '../Components/AuthContext';
import React, { useEffect, useState } from 'react';

const Header = ({className, icons, title, info}) => {
    const defaultClasses = 'flex flex-col bg-fa rounded-md gap-1 pl-6 pr-20 py-6';
    const combinedClasses = classNames(defaultClasses, className);
    const { authToken, setStatusCode } = useAuth();
    const [stat, setStat] = useState([]);
    const [error, setError] = useState(null);

    const BASE_URL = 'https://35b6-102-89-23-79.ngrok-free.app/api';
    const endpoint = '/seller/dashboard/get-stats';
    // const Atoken = sessionStorage.getItem('data').accesstoken;

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(BASE_URL + endpoint, {
                method: 'GET',
                headers: {
                'Authorization': `Bearer ${authToken}`,
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
              setStat(result.data);
            } else {
              throw new Error('Data fetch unsuccessful');
            }
            // setLoading(false);
          } catch (error) {
            setError(error.message);
            // setLoading(false);
          }
        };
    
        fetchData();
      }, [authToken, setStatusCode]);

    return ( 
        <div>
            {/* <div className={combinedClasses}>
                <div>{icons}</div>
                <h1 className="text-left">{title}</h1>
                <h1 className="text-2xl text-left font-medium">{productCount}</h1>
            </div>  */}

            {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center"> */}
            <div className={combinedClasses}>
                {stat.map((rate) => (
                    <div key={rate.id} className="flex flex-col bg-fa rounded-md text-black2 gap-1 p-6">
                        <div>{icons}</div>
                        <h1 className="text-left">{title}</h1>
                        {/* <h1 className="text-2xl text-left font-medium">{productCount}</h1> */}
                    </div> 
                ))}
            </div><br/>
        </div>
     );
}
 
export default Header;
