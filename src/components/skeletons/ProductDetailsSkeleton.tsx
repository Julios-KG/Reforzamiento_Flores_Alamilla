function ProductDetailsSkeleton() {
    return (
      <section className="py-24 bg-secundary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 flex flex-col lg:flex-row items-start">
          <div className="lg:w-1/2 mb-8 lg:mb-0 max-w-lg">
            <div className="w-full h-96 bg-gray-300 rounded-lg shadow-lg flex items-center justify-center">
              <svg
                className="w-10 h-10 text-gray-200"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 18"
              >
                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
              </svg>
            </div>
          </div>
          <div className="lg:w-1/2 lg:pl-12">
            <div className="h-8 bg-gray-300 rounded-full w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-300 rounded-full max-w-[480px] mb-2.5"></div>
            <div className="h-4 bg-gray-300 rounded-full mb-2.5"></div>
            <div className="h-4 bg-gray-300 rounded-full max-w-[440px] mb-2.5"></div>
            <div className="h-4 bg-gray-300 rounded-full max-w-[460px] mb-2.5"></div>
            <div className="h-4 bg-gray-300 rounded-full max-w-[360px] mb-2.5"></div>
            <div className="h-8 bg-gray-300 rounded-full w-1/2 mb-4 mt-8"></div>
            <div className="h-12 bg-gray-300 rounded-lg max-w-[200px] mb-4"></div>
            <div className="flex items-center space-x-3 mt-4">
              <div className="h-10 w-10 bg-gray-300 rounded"></div>
              <div className="h-10 w-12 bg-gray-300 rounded"></div>
              <div className="h-10 w-10 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  
  export default ProductDetailsSkeleton;
  