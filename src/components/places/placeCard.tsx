const PlaceCard = ({
  link,
  title,
  description,
  location,
  images,
  price,
}: {
  link: string;
  title: string;
  description: string;
  location: string;
  images: any;
  price: number;
}) => {
  return (
    <a
      href={link}
      className=" flex flex-col items-center mb-3  bg-gray-100 border border-gray-200 rounded-lg shadow md:flex-row  hover:bg-gray-100"
    >
      <div className="w-full md:w-1/3">
        {images ? (
          <img className="w-full h-auto" alt="" src={images} />
        ) : (
          <img
            className="w-full h-auto"
            alt=""
            src="https:res.cloudinary.com/douqbebwk/image/upload/v1600103881/YelpCamp/lz8jjv2gyynjil7lswf4.png"
          />
        )}
      </div>
      <div className="flex flex-col justify-between p-4 leading-normal w-full md:w-2/3">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
          {title}
        </h5>
        <p className="mb-3 font-normal text-gray-700">{description}</p>
        <p className=" text-sm text-gray-500">{location}</p>
        <p className=" text-sm text-gray-500">{price}</p>
      </div>
    </a>
  );
};

export default PlaceCard;
