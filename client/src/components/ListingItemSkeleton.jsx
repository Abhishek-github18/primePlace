const ListingItemSkeleton = () => {
    return (
      <div className="max-w-sm w-full p-4 animate-pulse">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Skeleton Image */}
          <div className="relative h-48 bg-gray-300"></div>
  
          {/* Skeleton Content */}
          <div className="p-4 space-y-3">
            {/* Title Skeleton */}
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
  
            {/* Address Skeleton */}
            <div className="h-3 bg-gray-300 rounded w-1/2"></div>
  
            {/* Info Grid Skeleton */}
            <div className="grid grid-cols-2 gap-2">
              <div className="h-3 bg-gray-300 rounded w-3/4"></div>
              <div className="h-3 bg-gray-300 rounded w-2/3"></div>
              <div className="h-3 bg-gray-300 rounded w-1/2"></div>
              <div className="h-3 bg-gray-300 rounded w-1/2"></div>
              <div className="h-3 bg-gray-300 rounded w-3/4"></div>
              <div className="h-3 bg-gray-300 rounded w-2/3"></div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default ListingItemSkeleton;
  