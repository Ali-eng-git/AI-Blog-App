import React from "react";

const TagsSidebarSkeleton = () => {
  return (
    <div className="space-y-6 animate-pulse">

      {/* Tags box */}
      <div className="bg-white border rounded-2xl p-5 space-y-3">
        <div className="h-4 w-32 bg-gray-200 rounded" />

        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="h-6 w-16 bg-gray-200 rounded-full"
            />
          ))}
        </div>
      </div>

      {/* CTA box */}
      <div className="bg-gray-200 rounded-2xl p-6 h-28" />
    </div>
  );
};

export default TagsSidebarSkeleton;