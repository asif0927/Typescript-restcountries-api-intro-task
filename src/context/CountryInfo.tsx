import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

interface CountryInfo {
  name: {
    common: string,
  },
  capital: string,
  region: string,
  borders: string[] | undefined,
  maps: {
    googleMaps: string,
  }
  population: number,
  flags: {
    png: string,
  }
}

interface CountryContextProps {
  countryData: CountryInfo[] | null;
  setCountryData: React.Dispatch<React.SetStateAction<CountryInfo[] | null>>;
  filteredCountryData: CountryInfo[] | null;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const CountryContext = createContext<CountryContextProps | undefined>(undefined);

interface CountryProviderProps {
  children: ReactNode;
}

export const CountryProvider: React.FC<CountryProviderProps> = ({ children }) => {
  const [countryData, setCountryData] = useState<CountryInfo[] | null>(null);
  const [filteredCountryData, setFilteredCountryData] = useState<CountryInfo[] | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<CountryInfo[]>('https://restcountries.com/v3.1/all');
        setCountryData(response.data);
        setFilteredCountryData(response.data);
      } catch (error) {
        console.error('Error fetching country data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (countryData) {
      const filteredData = countryData.filter((country) =>
        country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCountryData(filteredData);
    }
  }, [countryData, searchQuery]);
  

  const contextValue = {
    countryData,
    setCountryData,
    filteredCountryData,
    setSearchQuery,
  };

  return (
    <CountryContext.Provider value={contextValue}>
      {children}
    </CountryContext.Provider>
  );
};

export const useCountryContext = () => {
  const context = useContext(CountryContext);
  if (!context) {
    throw new Error('useCountryContext must be used within a CountryProvider');
  }
  return context;
};
