import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [showCountry, setShowCountry] = useState("");
  const [isClick, setIsClick] = useState(false);
  const [country, setCountry] = useState([]);

  console.log("countries", countries);

  const handleShowCountry = (event) => {
    setShowCountry(event.target.value);
  };

  const countryToShow =
    showCountry === ""
      ? countries
      : countries.filter((country) =>
          country.name.common.toLowerCase().includes(showCountry.toLowerCase())
        );

  console.log(countries);
  //console.log(countryToShow);

  const Countries = ({ countries }) => {
    //return <p>{countries.length}</p>;
    console.log(countries.length);
    if (countries.length > 10) {
      return <p>Too many countries.</p>;
    } else if (countries.length > 1) {
      return countries.map((country) => (
        <li>
          {country.name.common}{" "}
          <ShowButton handleClick={handleClick(country)} />
        </li>
      ));
    } else if (countries.length === 1) {
      console.log("one", countries);
      return countries.map((country) => <Country country={country} />);
    } else {
      return <p>loading</p>;
    }
  };

  const Country = ({ country }) => (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h2>Spoken languages</h2>
      <ul>
        {Object.keys(country.languages).map((key) => (
          <li>{country.languages[key]}</li>
        ))}
      </ul>
      <figure>{country.flag}</figure>
      <h2>Weather in {country.capital}</h2>
      <p>in progress...</p>
    </div>
  );

  const handleClick = (country) => () => {
    console.log("country", country);
    setIsClick(true);
    setCountry(country);
  };

  const ShowButton = (props) => (
    <button onClick={props.handleClick}>show</button>
  );

  const hook = () => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
      console.log("promise fulfilled");
    });
  };

  useEffect(hook, []);

  return (
    <div>
      <p>
        find countries
        <input value={showCountry} onChange={handleShowCountry} />
      </p>

      <Countries countries={countryToShow} />
      {isClick && <Country country={country} />}
    </div>
  );
};

export default App;
