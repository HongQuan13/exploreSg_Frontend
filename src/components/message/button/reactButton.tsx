export const ReactButton = () => {
  return (
    <button
      type="button"
      className="hidden group-hover:block  flex-shrink-0 focus:outline-none mx-2  rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-500 bg-gray-300 w-8 h-8 p-2"
    >
      <svg viewBox="0 0 24 24" className="w-full h-full fill-current">
        <path d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-3.54-4.46a1 1 0 0 1 1.42-1.42 3 3 0 0 0 4.24 0 1 1 0 0 1 1.42 1.42 5 5 0 0 1-7.08 0zM9 11a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm6 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
      </svg>
    </button>
  );
};
