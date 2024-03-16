import React from "react";

const ImageCard = ({ images }: { images: any }) => {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const handleSlideChange = (newIndex: number) => {
    setActiveIndex(newIndex);
  };

  const handlePrevious = () => {
    setActiveIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex < images.length - 1 ? prevIndex + 1 : images.length - 1
    );
  };

  return (
    <div id="default-carousel" className="relative w-full">
      <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
        {images.map((img: any, index: number) => (
          <div
            key={index}
            className={`duration-700 ease-in-out ${
              index === activeIndex ? "" : "opacity-0"
            }`}
          >
            <img
              src={img.img_url}
              className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
              alt="Image"
            />
          </div>
        ))}
      </div>

      {images.length >= 2 ? (
        <>
          <button
            type="button"
            className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
            onClick={handlePrevious}
          >
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50  group-focus:ring-4 group-focus:ring-white  group-focus:outline-none">
              <svg
                className="w-4 h-4 text-gray-800 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 1 1 5l4 4"
                />
              </svg>
              <span className="sr-only">Previous</span>
            </span>
          </button>
          <button
            type="button"
            className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
            onClick={handleNext}
          >
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50  group-focus:ring-4 group-focus:ring-white group-focus:outline-none">
              <svg
                className="w-4 h-4 text-gray-800 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
              <span className="sr-only">Next</span>
            </span>
          </button>
          <div className="absolute bottom-5 left-1/2 space-x-3">
            {images.map((_: any, index: any) => (
              <button
                key={index}
                type="button"
                className={`w-3 h-3 rounded-full ${
                  index === activeIndex ? "bg-blue-500" : "bg-gray-300"
                }`}
                onClick={() => handleSlideChange(index)}
              ></button>
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
};

export default ImageCard;
