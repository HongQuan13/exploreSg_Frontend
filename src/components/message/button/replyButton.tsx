export const ReplyButton = () => {
  return (
    <button
      type="button"
      className="hidden group-hover:block  flex-shrink-0 focus:outline-none mx-2  rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-500 bg-gray-300 w-8 h-8 p-2"
    >
      <svg viewBox="0 0 20 20" className="w-full h-full fill-current">
        <path d="M19,16.685c0,0-2.225-9.732-11-9.732V2.969L1,9.542l7,6.69v-4.357C12.763,11.874,16.516,12.296,19,16.685z" />
      </svg>
    </button>
  );
};
