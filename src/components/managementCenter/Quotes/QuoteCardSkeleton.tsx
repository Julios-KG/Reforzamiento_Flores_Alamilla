function QuoteCardSkeleton() {
    return (
        <>

        <div className="bg-white p-6 rounded-lg shadow-lg mb-4">
          <div className="flex justify-between items-center mb-4 animate-pulse">
            <div className="h-6 bg-gray-300 rounded w-32"></div>
            <div className="px-3 py-1 rounded bg-gray-300 h-6 w-20"></div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
              <div className="h-3 bg-gray-300 rounded w-32"></div>
            </div>
            <div>
              <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
              <div className="h-3 bg-gray-300 rounded w-20"></div>
            </div>
          </div>
          <div className="mb-4 h-52 overflow-y-auto">
            <div className="h-5 bg-gray-300 rounded w-40 mb-4"></div>
            <ul className="space-y-4">
              {[...Array(2)].map((_, index) => (
                <li key={index} className="flex items-center animate-pulse">
                  <div className="w-16 h-16 bg-gray-300 rounded mr-4"></div>
                  <div>
                    <div className="h-4 bg-gray-300 rounded w-32 mb-2"></div>
                    <div className="h-3 bg-gray-300 rounded w-24 mb-1"></div>
                    <div className="h-3 bg-gray-300 rounded w-16"></div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-start">
            <div className="h-5 bg-gray-300 rounded w-24"></div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg mb-4">
          <div className="flex justify-between items-center mb-4 animate-pulse">
            <div className="h-6 bg-gray-300 rounded w-32"></div>
            <div className="px-3 py-1 rounded bg-gray-300 h-6 w-20"></div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
              <div className="h-3 bg-gray-300 rounded w-32"></div>
            </div>
            <div>
              <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
              <div className="h-3 bg-gray-300 rounded w-20"></div>
            </div>
          </div>
          <div className="mb-4 h-52 overflow-y-auto">
            <div className="h-5 bg-gray-300 rounded w-40 mb-4"></div>
            <ul className="space-y-4">
              {[...Array(2)].map((_, index) => (
                <li key={index} className="flex items-center animate-pulse">
                  <div className="w-16 h-16 bg-gray-300 rounded mr-4"></div>
                  <div>
                    <div className="h-4 bg-gray-300 rounded w-32 mb-2"></div>
                    <div className="h-3 bg-gray-300 rounded w-24 mb-1"></div>
                    <div className="h-3 bg-gray-300 rounded w-16"></div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-start">
            <div className="h-5 bg-gray-300 rounded w-24"></div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg mb-4">
          <div className="flex justify-between items-center mb-4 animate-pulse">
            <div className="h-6 bg-gray-300 rounded w-32"></div>
            <div className="px-3 py-1 rounded bg-gray-300 h-6 w-20"></div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
              <div className="h-3 bg-gray-300 rounded w-32"></div>
            </div>
            <div>
              <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
              <div className="h-3 bg-gray-300 rounded w-20"></div>
            </div>
          </div>
          <div className="mb-4 h-52 overflow-y-auto">
            <div className="h-5 bg-gray-300 rounded w-40 mb-4"></div>
            <ul className="space-y-4">
              {[...Array(2)].map((_, index) => (
                <li key={index} className="flex items-center animate-pulse">
                  <div className="w-16 h-16 bg-gray-300 rounded mr-4"></div>
                  <div>
                    <div className="h-4 bg-gray-300 rounded w-32 mb-2"></div>
                    <div className="h-3 bg-gray-300 rounded w-24 mb-1"></div>
                    <div className="h-3 bg-gray-300 rounded w-16"></div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-start">
            <div className="h-5 bg-gray-300 rounded w-24"></div>
          </div>
        </div>
        
  </>
    );
  }
  
  export default QuoteCardSkeleton;
  