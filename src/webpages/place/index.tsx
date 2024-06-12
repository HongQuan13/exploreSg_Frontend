import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import NavBar from "../../components/partials/navBar";
import { Rating } from "@material-tailwind/react";
import StarRating from "../../components/review/starReview";
import qs from "qs";
import ReviewSection from "../../components/review/review";
import ImageCard from "../../components/images/imageCard";
import { useAuthContext } from "../../context/authContext";

interface PlaceData {
  place_title: string;
  place_images: Array<any>;
  place_price: number;
  place_description: string;
  place_location: string;
  place_author: string;
  place_reviews: Array<any>;
  createdAt: string;
}
interface AuthorData {
  _id: string;
  username: string;
  email: string;
}
interface Review {
  [key: string]: any;
}

const ShowPlace = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [placeData, setPlaceData] = useState<PlaceData | null>(null);
  const [authorData, setAuthorData] = useState<AuthorData | null>(null);
  const [starCount, setStarCount] = useState(4);
  const [comment, setComment] = useState("");
  const [existedComments, setExistedComment] = useState<Review[]>([]);
  const user = useAuthContext();
  useEffect(() => {
    console.log("Location:", location);
    console.log("ID:", id);
    detailAPI();
    commentAPI();
  }, [id]);
  const handleCommentChange = (e: any) => {
    const comment = e.target.value;
    setComment(comment);
  };
  const handleStarClick = (count: number) => {
    setStarCount(count);
  };
  const handleDelete = async () => {
    try {
      const deletedPlace = await axios.post(
        `http://localhost:${process.env.REACT_APP_BACKEND_PORT}/v1/api/place/delete/${id}`,
        null,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Access-Control-Allow-Origin": "*",
          },
          withCredentials: true,
        }
      );
      console.log("Deleted place success", deletedPlace.data.metadata);
      navigate("/home");
    } catch (error: any) {
      console.error("Error:", error.stack);
    }
  };
  const handleCommentSubmit = async () => {
    try {
      const newComment = {
        place_id: id,
        review_comment: comment,
        review_rating: starCount,
        review_author: user.id,
      };
      const response = await axios.post(
        `http://localhost:${process.env.REACT_APP_BACKEND_PORT}/v1/api/review/new`,
        qs.stringify(newComment),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Access-Control-Allow-Origin": "*",
          },
          withCredentials: true,
        }
      );
      console.log("Add new commnent success", response.data.metadata);
    } catch (error: any) {
      console.error("Error:", error.stack);
    }
  };
  const navigateToEdit = () => {
    navigate(`/place/edit/${id}`);
  };
  async function detailAPI() {
    try {
      console.log(id, "testing useEffect");
      const detailItem = await axios.post(
        `http://localhost:${process.env.REACT_APP_BACKEND_PORT}/v1/api/place/detail/${id}`,
        null,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Access-Control-Allow-Origin": "*",
          },
          withCredentials: true,
        }
      );
      console.log("reuturn place details successful", detailItem.data.metadata);
      setPlaceData(detailItem.data.metadata);
      setAuthorData(detailItem.data.metadata.place_author);
    } catch (error: any) {
      console.error("Error:", error.response);
    }
  }

  async function commentAPI() {
    try {
      const allReview = await axios.post(
        `http://localhost:${process.env.REACT_APP_BACKEND_PORT}/v1/api/review/all`,
        {
          place_id: id,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Access-Control-Allow-Origin": "*",
          },
          withCredentials: true,
        }
      );
      console.log(
        "return all review of a place successful",
        allReview.data.metadata
      );
      setExistedComment(allReview.data.metadata);
    } catch (error: any) {
      console.error("Error:", error.stack);
    }
  }

  const calculateDaysDifference = (pastDate: any): number => {
    if (!pastDate) {
      return -1;
    }
    const pastDateTime = new Date(pastDate).getTime();
    const now = new Date().getTime();

    const differenceInMilliseconds = now - pastDateTime;
    const differenceInDays = Math.floor(
      differenceInMilliseconds / (1000 * 60 * 60 * 24)
    );

    return differenceInDays;
  };
  return (
    <>
      <NavBar />
      <div className="flex flex-col md:flex-row mx-auto px-4 py-4 space-x-2">
        <div className="w-full md:w-1/2 border rounded-md">
          {placeData ? (
            <ImageCard images={placeData?.place_images} />
          ) : (
            // <img src="" alt="" />
            <img
              className="w-full h-auto rounded-md"
              alt=""
              src="https:res.cloudinary.com/douqbebwk/image/upload/v1600103881/YelpCamp/lz8jjv2gyynjil7lswf4.png"
            />
          )}
          <div className="flex flex-col justify-between p-4 leading-normal w-full divide-y">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
              {placeData?.place_title}
            </h5>
            <p className="mb-2  text-base font-normal text-gray-700">
              {placeData?.place_description}
            </p>
            <p className=" mb-2  text-sm text-gray-500">
              {placeData?.place_location}
            </p>
            <p className="mb-2  text-base font-normal text-gray-700">
              Submited by {authorData?.username}
            </p>
            <p className="mb-2  text-base font-normal text-gray-700">
              S${placeData?.place_price}/person
            </p>
            {user && user?.id !== authorData?._id && placeData ? (
              <></>
            ) : (
              <div className="flex mb-2  flex-row ">
                <button
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 font-normal rounded-md text-sm px-3 py-2 text-center me-2 mb-2"
                  onClick={navigateToEdit}
                >
                  Edit
                </button>

                <button
                  type="button"
                  className="text-white bg-red-700 hover:bg-red-800 font-normal rounded-md text-sm px-3 py-2 text-center me-2 mb-2"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            )}
            {calculateDaysDifference(placeData?.createdAt) > 0 ? (
              <p className="bg-gray-200  text-sm font-normal">
                Posted by {calculateDaysDifference(placeData?.createdAt)} days
              </p>
            ) : (
              <p className="bg-gray-200  text-sm font-normal">
                Posted by today
              </p>
            )}
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg lg:text-2xl font-bold text-gray-900">
              Reviews
            </h2>
          </div>
          <form className="mb-6">
            <StarRating
              starCount={starCount}
              handleStarClick={handleStarClick}
            />
            <div className=" py-2 px-4 mb-4 bg-white rounded-md border border-gray-200">
              <label htmlFor="comment" className="sr-only">
                Your comment
              </label>
              <textarea
                id="comment"
                className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none"
                placeholder="Write a comment..."
                required
                onChange={handleCommentChange}
              />
            </div>
            <button
              type="submit"
              className="focus:outline-none text-white bg-green-700 hover:bg-green-800 font-normal rounded-md text-sm px-3 py-2"
              onClick={handleCommentSubmit}
            >
              Post comment
            </button>
          </form>

          {existedComments.map((existedComment) => (
            <ReviewSection
              owner={existedComment?.review_author}
              starCount={existedComment.review_rating}
              comment={existedComment.review_comment}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default ShowPlace;
