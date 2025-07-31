import ReactCountryFlag from "react-country-flag";
import { useState, useEffect } from 'react'

export default function ResultsModal({ country, onClose }) {
  const [universities, setUniversities] = useState([])
  useEffect(() => {
      async function fetchUniversities() {  
        const response = await fetch(`http://universities.hipolabs.com/search?country=${country.name.common}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
          },
        }
        );
        const data = await response.json();
        setUniversities(data.slice(0, 6)); // limit to 10 universities
      }
      fetchUniversities();
    }, [])

  console.log(universities)
  return (
    <div 
      className="fixed inset-0 bg-[rgba(0, 0, 0, 0.5)] flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg p-6 w-11/12 max-w-md"
        onClick={e => e.stopPropagation()} // Prevent click from bubbling to parent
      >
        <div className="flex justify-between items-start">

          <h2 className="text-3xl font-semibold"> {country.name.common} </h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>
        <div className="flex justify-between">
        <p className="text-sm text-gray-700 mt-2">{country.name.official}</p>
        <p className="mt-1 text-md"><ReactCountryFlag countryCode={country.cca2} svg /></p>
        </div>
        <p className="text-xs font-light mt-2"><span className="font-bold">Capitals</span> :  {country.capital?.join(", ")}</p>
        <p className="mt-1 font-light text-xs"><span className="font-bold">Population</span> : {country.population}</p>
        <ul className='grid grid-cols-3 gap-4 text-xs text-gray-700 font-light mt-4'>
            {(universities).map((uni, index) => (
              <li key={index} className="text-xs font-light text-gray-700">
                <a href={uni.web_pages[0]}>
                {uni.name}
                </a>
              </li>
            ))}
          </ul>
      </div>
    </div>
  );
}