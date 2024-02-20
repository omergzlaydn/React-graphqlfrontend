import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import './styles.css'; // CSS dosyasını içe aktarın

const GET_COUNTRIES = gql`
  query {
    countries {
      code
      name
      continent {
        name
      }
    }
  }
`;

const CountryList: React.FC = () => {
  const [filterText, setFilterText] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const { loading, error, data } = useQuery(GET_COUNTRIES);

  useEffect(() => {
    if (!loading && data) {
      const filteredCountries = data.countries.filter((country: any) =>
        country.name.toLowerCase().includes(filterText.toLowerCase())
      );
      const selectedItemIndex = filteredCountries.length >= 10 ? 9 : filteredCountries.length - 1;
      if (selectedItemIndex >= 0) {
        setSelectedCountry(filteredCountries[selectedItemIndex].code);
      }
    }
  }, [loading, data, filterText]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const filteredCountries = data.countries.filter((country: any) =>
    country.name.toLowerCase().includes(filterText.toLowerCase())
  );

  const handleClick = (code: string) => {
    if (selectedCountry === code) {
      setSelectedCountry(null); // If already selected, deselect it
    } else {
      setSelectedCountry(code); // Otherwise, select it
    }
  };

  return (
    <div>
      <h2>Country List</h2>
      <input
        className="input" // Tailwind CSS sınıfını ekleyin
        type="text"
        placeholder="Search..."
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
      />
      <ul>
        {filteredCountries.map((country: any, index: number) => (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
          <li
            key={country.code}
            className={`list-item ${selectedCountry === country.code ? 'selected' : ''}`} // Tailwind CSS sınıflarını ekleyin
            onClick={() => handleClick(country.code)}
            // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
            tabIndex={0}
          >
            {country.name} - {country.continent.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CountryList;
