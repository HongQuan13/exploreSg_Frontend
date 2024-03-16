import React, { useState } from "react";
import StarRatingReadOnly from "./starReadOnly";

const ReviewSection = ({
  owner,
  starCount,
  comment,
}: {
  owner: string;
  starCount: number;
  comment: string;
}) => {
  return (
    <article className="border rounded-md">
      <div className="flex items-center mb-4">
        <div className="font-mediu">
          <p>{owner}</p>
        </div>
      </div>
      <StarRatingReadOnly starCount={starCount} />
      <p className="mb-2 text-gray-500">{comment}</p>
    </article>
  );
};

export default ReviewSection;
