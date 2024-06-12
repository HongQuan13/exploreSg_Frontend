import React from "react";
import FormAction from "../access/formAction";
function Filter({
  handleSubmit,
  handleChange,
}: {
  handleSubmit: any;
  handleChange: any;
}) {
  return (
    <div className="gap-x-8 gap-y-10">
      <form className="hidden lg:block">
        <div className="border-b border-gray-200 py-6">
          <label htmlFor="author" className="w-full text-gray-400">
            Author
          </label>
          <input
            type="text"
            id="author"
            className="border border-gray-300 rounded-md w-full py-2 px-3 focus:outline-none focus:border-indigo-500"
            onChange={handleChange}
          />
        </div>
        <div className="border-b border-gray-200 py-6">
          <label className="w-full text-gray-400">Location</label>
          <div className="flex flex-col items-center justify-between w-full space-x-2 space-y-2">
            <input
              type="text"
              id="location"
              placeholder="Location"
              className="border border-gray-300 rounded-md w-full py-2 px-3 focus:outline-none focus:border-indigo-500"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="border-b border-gray-200 py-6">
          <label htmlFor="priceRange" className="w-full text-gray-400">
            Price Range
          </label>
          <div className="flex items-center justify-between w-full space-x-2">
            <input
              type="number"
              id="priceRangeMin"
              placeholder="Min"
              className="border border-gray-300 rounded-md w-1/2 py-2 px-3 focus:outline-none focus:border-indigo-500"
              onChange={handleChange}
            />
            <input
              type="number"
              id="priceRangeMax"
              placeholder="Max"
              className="border border-gray-300 rounded-md w-1/2 py-2 px-3 focus:outline-none focus:border-indigo-500"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="border-b border-gray-200 py-6">
          <div className="w-full">
            <label htmlFor="sortOption" className="w-full text-gray-400">
              Sort By
            </label>
            <select
              id="sortOption"
              name="sortOption"
              className="border border-gray-300 rounded-md w-full py-2 px-3 bg-white shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              onChange={handleChange}
            >
              <option disabled selected>
                Select an option
              </option>
              <option value="createdAt-desc">Newest Post</option>
              <option value="place_location-asc">Nearest Place</option>
              <option value="place_price-asc">Price: Low to High</option>
              <option value="place_price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>
        <FormAction
          handleSubmit={handleSubmit}
          action="submit"
          text="Apply"
          customClass="bg-gray-700"
        />
      </form>
    </div>
  );
}

export default Filter;
