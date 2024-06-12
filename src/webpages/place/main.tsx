import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import PlaceCard from "../../components/places/placeCard";
import Mapbox from "../../components/partials/mapbox";
import NavBar from "../../components/partials/navBar";
import SearchBar from "../../components/partials/searchBar";
import FilterSection from "../../components/partials/filterSection";
import qs from "qs";

const AllPlaces = () => {
  var [placeDatas, setPlaceData] = useState<any[]>([]);
  var [searchInfor, setSearchInfor] = useState(null);
  var [autoComplete, setAutoComplete] = useState<any[]>([]);
  var [filterState, setFilterState] = useState<any>();
  const searchRef = useRef<any>(null);
  useEffect(() => {
    async function placeAPI() {
      try {
        const allPlace = await axios.post(
          `http://localhost:${process.env.REACT_APP_BACKEND_PORT}/v1/api/place/search`,
          null,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              "Access-Control-Allow-Origin": "*",
            },
            withCredentials: true,
          }
        );
        console.log("Return all place success", allPlace.data.metadata);
        setPlaceData(allPlace?.data?.metadata);
      } catch (error: any) {
        console.error("Error:", error.response);
      }
    }
    placeAPI();
  }, []);
  useEffect(() => {
    document.addEventListener("click", handleOutsideClickSearch);
    return () => {
      document.removeEventListener("click", handleOutsideClickSearch);
    };
  }, []);

  const handleSearchChange = async (e: any) => {
    const searchQuery = e.target.value;
    setSearchInfor(searchQuery);
    if (searchInfor != null && searchInfor != "") {
      try {
        const autoCompleteData = await axios.post(
          `http://localhost:${process.env.REACT_APP_BACKEND_PORT}/v1/api/place/search/autocomplete`,
          null,
          {
            withCredentials: true,
            params: {
              query: searchInfor,
            },
          }
        );
        setAutoComplete(autoCompleteData.data.metadata);
        console.log(autoComplete);
      } catch (error: any) {
        console.error("Error:", error.stack);
      }
    }
  };
  const handleSearchSubmit = async (event: any) => {
    event.preventDefault();
    if (searchInfor) {
      console.log(searchInfor);
    }
    try {
      const searchPlace = await axios.post(
        `http://localhost:${process.env.REACT_APP_BACKEND_PORT}/v1/api/place/search`,
        null,
        {
          withCredentials: true,
          params: {
            query: searchInfor,
          },
        }
      );
      console.log("Return all meet places", searchPlace.data.metadata);
      setPlaceData(searchPlace?.data?.metadata);
      setAutoComplete([]);
    } catch (error: any) {
      console.error("Error:", error.stack);
    }
  };
  const handleOutsideClickSearch = (e: any) => {
    e.stopPropagation(); // Prevent bubbling up
    if (
      searchRef.current &&
      !searchRef.current.contains(e.target) &&
      !e.target.closest(".autocomplete-item")
    ) {
      setAutoComplete([]);
    }
  };
  function cleanFilterInput(filterInput: any) {
    for (const key in filterInput) {
      if (
        !filterInput[key] ||
        filterInput[key] === undefined ||
        filterInput[key] === null ||
        (typeof filterInput[key] === "string" &&
          filterInput[key].trim() === "") ||
        filterInput[key].length === 0
      ) {
        delete filterInput[key];
      }
    }
    return filterInput;
  }

  const applyFilter = async (event: any) => {
    event.preventDefault();
    try {
      console.log(filterState, "filterState");
      let filterInput = {
        author: filterState?.author,
        location: filterState?.location,
        minPrice: Number(filterState?.priceRangeMin),
        maxPrice: Number(filterState?.priceRangeMax),
        sortedBy: filterState.sortOption,
      };
      filterInput = cleanFilterInput(filterInput);
      console.log(filterInput, "filterInput");

      const filterResponse = await axios.post(
        `http://localhost:${process.env.REACT_APP_BACKEND_PORT}/v1/api/place/filter`,
        filterInput,
        {
          withCredentials: true,
          params: {
            query: searchInfor,
          },
        }
      );
      console.log("Return filtered places", filterResponse.data.metadata);
      setPlaceData(filterResponse?.data?.metadata);
      setAutoComplete([]);
    } catch (error: any) {
      console.error("Error:", error.stack);
    }
  };

  const handleFilterChange = (e: any) => {
    setFilterState((prevState: any) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
    console.log(filterState, "filterState");
  };

  return (
    <div className="bg-gray-100">
      <NavBar />
      <Mapbox placeDatas={placeDatas} />
      <SearchBar
        handleChange={handleSearchChange}
        handleSubmit={handleSearchSubmit}
        searchAutocomplete={autoComplete}
        searchRef={searchRef}
      />
      <div className="container mx-auto ">
        <div className="grid grid-cols-4 min-w-0 sm:grid-cols-12 gap-4 px-4 pt-4 ">
          {/* flex flex-col */}
          <div className="col-span-4 sm:col-span-3 bg-white rounded-md px-4 mb-4 ">
            <h3 className="text-xl font-bold pt-3">Filter By</h3>
            <FilterSection
              handleSubmit={applyFilter}
              handleChange={handleFilterChange}
            />
          </div>
          <div className="col-span-4 sm:col-span-9 bg-white rounded-md px-2 py-2">
            {placeDatas.map((data) => (
              <PlaceCard
                link={`place/detail/${data._id}`}
                title={data.place_title}
                description={data.place_description}
                location={data.place_location}
                images={data.place_images[0].thumb_url}
                price={data.place_price}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllPlaces;
