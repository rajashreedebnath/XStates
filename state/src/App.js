import React, { useEffect, useState } from 'react';
import './App.css';

export default function StateApp() {


  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  



  useEffect(() => {

    fetch('https://crio-location-selector.onrender.com/countries')

      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch countries");
        }
        return response.json();
      })
    
      .then((data) => setCountries(data))
      .catch((err) => console.error('Error fetching countries:', err));
  }, []);


  useEffect(() => {

    if(selectedCountry) {

      fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`)

        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch states");
          }
          return response.json();
        })

        .then((data) => {

          setStates(data);
          setSelectedState('');
          setCities([]);
          setSelectedCity('');
        })
        .catch((err) => console.error('Error fetching state:'));
    }
  }, [selectedCountry]);



  useEffect(() => {

    if(selectedCountry && selectedState) {

      fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`)

        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch cities");
          }
          return response.json();
        })

        .then((data) => {

          setCities(data);
          setSelectedCity('');
        })
        .catch((err) => console.log('Error fetching city:', err));
    }
  }, [selectedCountry, selectedState]);







  return (
    <div className="App" role='presentation'>

      <h1>Select Location</h1>



      <div className='selection_boxes'>

        <select 
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
          className='dropdown'
        >

          <option value="" disabled>Select Country</option>


          {countries.map((country) => {

            return (
              <option value={country} key={country}>{country}</option>
            );

          })}

        </select>




        <select 
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          disabled = {!selectedCountry}
          className='dropdown'
        >

          <option value="" disabled>Select State</option>


          {states.map((state) => {

            return (
              <option value={state} key={state}>{state}</option>
            );

          })}

        </select>



        <select 
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          disabled = {!selectedCountry || !selectedState}
          className='dropdown'
        >

          <option value="" disabled>Select City</option>


          {cities.map((city) => {

            return (
              <option value={city} key={city}>{city}</option>
            );

          })}

        </select>

      </div>





      {selectedCity && (

        <h2 className='result'>
          You Selected <span className='highlight'>{selectedCity},</span>{" "}
          <span className='fade'>{selectedState},</span>{" "}
          <span className='fade'>{selectedCountry}</span>
        </h2>


      )}







    </div>
  );
}


