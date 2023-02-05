import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { geo_api_url, geoapioptions } from "../../api";
const Search = ({ onsearchchange }) => {
  const [search, setsearch] = useState(null);
  const loadOptions = (inputvalues) => {
    return fetch(
      `${geo_api_url}/cities?minPopulation=1000000&namePrefix=${inputvalues}`,
      geoapioptions
    )
      .then((response) => response.json())
      .then((response) => {
        return {
          options: response.data.map((city) => {
            return {
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name} ${city.countryCode}`,
            };
          })
        };
      })
      .catch((err) => console.error(err));
  };
  const handleonchange = (searchdata) => {
    setsearch(searchdata);
    onsearchchange(searchdata);
  };
  return (
    <AsyncPaginate
      placeholder="Search For City"
      debounceTimeout={600}
      value={search}
      onChange={handleonchange}
      loadOptions={loadOptions}
    />
  );
};

export default Search;
