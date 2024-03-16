import { Navigate, useNavigate } from "react-router-dom";

const SearchBar = ({
  handleSubmit,
  handleChange,
  searchAutocomplete,
  searchRef,
}: {
  handleSubmit: any;
  handleChange: any;
  searchAutocomplete: any;
  searchRef: any;
}) => {
  return (
    <div className="mt-4 flex flex-col items-center justify-center space-x-5">
      <form className="w-2/3" action="" onSubmit={handleSubmit} ref={searchRef}>
        <div className="relative w-full">
          <div className="absolute inset-y-0 start-0 flex items-center pl-3">
            <svg
              className="h-4 w-4 text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="search-bar"
            className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2 pl-10 focus:outline-none focus:ring-2 focus:ring-gray-500 "
            placeholder="Search favourite items..."
            onChange={handleChange}
          />

          <button
            type="submit"
            onSubmit={handleSubmit}
            className="absolute inset-y-1 right-1 rounded-lg  bg-gray-700 p-2 text-sm font-medium text-white hover:text-gray-300 focus:outline-none"
          >
            Search
          </button>
        </div>
      </form>
      <div
        className={`w-2/3 mt-4 bg-gray-50 rounded-md shadow-lg max-h-60  border-gray-300${
          searchAutocomplete.length > 0 ? "block" : "hidden"
        }`}
      >
        {searchAutocomplete.map((result: any) => (
          <div
            key={result._id}
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
          >
            <a
              href={`/detail/${result._id}`}
              className="block px-4 py-2 text-base font-medium text-gray-900 rounded-md hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {result.place_title}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};
export default SearchBar;
