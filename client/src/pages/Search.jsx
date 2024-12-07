const Search = () => {
    return (
      <div className="flex flex-wrap gap-6 p-4 md:flex-nowrap">
        {/* Search Container */}
        <div className="w-full md:w-1/3 bg-gray-100 p-6 rounded-lg shadow-md">
          <h4 className="text-lg font-bold mb-4">Search your favorite place</h4>
          <form className="space-y-4">
            {/* Search Input */}
            <input
              type="text"
              placeholder="Search with text"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
  
            {/* Type Options */}
            <div>
              <span className="font-medium">Type:</span>
              <div className="flex items-center space-x-4 mt-2">
                <label className="flex items-center">
                  <input type="checkbox" id="all" name="all" className="mr-2" />
                  Rent & Sell
                </label>
                <label className="flex items-center">
                  <input type="checkbox" id="rent" name="rent" className="mr-2" />
                  Rent
                </label>
                <label className="flex items-center">
                  <input type="checkbox" id="sale" name="sale" className="mr-2" />
                  Sell
                </label>
              </div>
            </div>
  
            {/* Offer */}
            <div className="flex items-center">
              <input type="checkbox" id="offer" name="offer" className="mr-2" />
              <span>Offer</span>
            </div>
  
            {/* Amenities */}
            <div>
              <span className="font-medium">Amenities:</span>
              <div className="flex items-center space-x-4 mt-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    id="parking"
                    name="parking"
                    className="mr-2"
                  />
                  Parking
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    id="furnished"
                    name="furnished"
                    className="mr-2"
                  />
                  Furnished
                </label>
              </div>
            </div>
  
            {/* Sort Options */}
            <div>
              <span className="font-medium">Sort:</span>
              <select className="w-full p-2 border border-gray-300 rounded-md mt-2">
                <option value="asc">Price High to Low</option>
                <option value="">Price Low to High</option>
                <option value="latest">Latest</option>
                <option value="oldest">Oldest</option>
              </select>
            </div>
  
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md font-semibold hover:bg-blue-600"
            >
              Search
            </button>
          </form>
        </div>
  
        {/* Listing Result Container */}
        <div className="w-full md:w-2/3 bg-white p-6 rounded-lg shadow-md">
          <h4 className="text-lg font-bold mb-4">Listing Results:</h4>
          {/* Add your result rendering logic here */}
        </div>
      </div>
    );
  };
  
  export default Search;
      