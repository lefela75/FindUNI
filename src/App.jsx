import { useState, useEffect } from 'react'
import FeatherIcon from 'feather-icons-react'
import ResultsModal from './modal/Results'

function App() {
  const [countries, setCountries] = useState([])
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function fetchCountries() {  
      const response = await fetch('https://restcountries.com/v3.1/all?fields=name,cca2,population,capital',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
        },
      }
      );
      const data = await response.json();
      setCountries(data);
    }
    fetchCountries();
  }, [])

  {/* Loading the modal for selected country */}
  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleCountryClick = () => {
       const country = countries.find(c => c.name.common === searchTerm);
       if (!country) {
            alert("Can't find Country");
            return;
       }
       setSelectedCountry(country);
       setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedCountry(null);
  };

  console.log(selectedCountry)
  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen bg-gray-200">
        <h2 className="text-lg mb-4">Find UNI</h2>
        <p className="text-xs text-gray-400 text-center mb-4 mx-2">Looking to study abroad but don't know where? <br /> Find universities of your choice based on Region & start applying now</p>
        {/* Search Section */}
        <div className="flex">
        <input type="text" name="countrysearch" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value) } className="bg-white border-1 border-[#a2a2a2] rounded-l-md text-xs py-2 px-3 focus:outline-none" placeholder='Please Input Country ...'></input>
        <button type="submit" onClick={handleCountryClick} className="cursor-pointer text-gray-200 bg-[#a2a2a2] hover:bg-[#bbb] px-4 py-2 rounded-r-md"><FeatherIcon icon="search" width={10} /></button>
        </div>
        {/* Countries List Section */}
        <div className="mt-4 w-full max-w-lg flex justify-center">
          <ul className='grid grid-cols-2 sm:grid-cols-4 sm:gap-x-6 gap-x-12 gap-y-2 text-xs text-gray-700 font-light mt-4'>
            {(countries.slice(0, 24)).map((country, index) => (
              <li key={index} className="text-xs font-light text-gray-700">
                {country.name.common}
              </li>
            ))}
          </ul>
        </div>
        {showModal && selectedCountry && (
        <ResultsModal 
          country={selectedCountry} 
          onClose={closeModal}
        />
      )}
      </div>
    </>
  )
}

export default App
