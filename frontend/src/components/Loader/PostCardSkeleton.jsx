import React from "react";

const PostCardSkeleton = () => {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden animate-pulse">
      
      {/* Image skeleton */}
      <div className="h-52 bg-gray-200" />

      {/* Content */}
      <div className="p-5 space-y-3">

        {/* meta */}
        <div className="flex gap-2">
          <div className="h-3 w-20 bg-gray-200 rounded" />
          <div className="h-3 w-16 bg-gray-200 rounded" />
        </div>

        {/* title */}
        <div className="h-5 w-full bg-gray-200 rounded" />
        <div className="h-5 w-2/3 bg-gray-200 rounded" />

        {/* description */}
        <div className="h-3 w-full bg-gray-200 rounded" />
        <div className="h-3 w-5/6 bg-gray-200 rounded" />
        <div className="h-3 w-4/6 bg-gray-200 rounded" />

        {/* footer */}
        <div className="flex justify-between pt-3">
          <div className="h-3 w-16 bg-gray-200 rounded" />
          <div className="h-3 w-12 bg-gray-200 rounded" />
        </div>

      </div>
    </div>
  );
};

export default PostCardSkeleton;