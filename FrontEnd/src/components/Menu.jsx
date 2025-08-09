import React from "react";

const categories = [
  { name: "All", icon: "🪀", color: "from-teal-400 to-teal-500" },
  { name: "Educational", icon: "📚", color: "from-teal-400 to-teal-500" },
  { name: "Action Figures", icon: "🦸", color: "from-teal-500 to-teal-600" },
  { name: "Dolls", icon: "🪆", color: "from-teal-500 to-teal-600" },
  { name: "Remote Control", icon: "🎮", color: "from-teal-600 to-teal-700" },
  { name: "Building Blocks", icon: "🧱", color: "from-teal-600 to-teal-700" },
  { name: "Puzzles", icon: "🧩", color: "from-teal-700 to-teal-800" },
  { name: "Soft Toys", icon: "🧸", color: "from-teal-800 to-teal-900" }
];

const Menu = ({ category, setCategory }) => {
  return (
    <div className="w-[90%] mx-auto pt-16 pb-8">

      <style>{`
  .custom-scrollbar {
    scrollbar-color: #065f46 transparent; 
  }
  .custom-scrollbar::-webkit-scrollbar {
    height: 8px; 
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: #065f46; 
    border-radius: 9999px;
  }
`}</style>


      {/* Header Section */}
      <div className="text-center lg:text-left mb-12">
        <div className="inline-flex items-center bg-teal-100 text-teal-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
          🏪 Premium Toy Collection
        </div>

        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          Shop by{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-teal-800">
            Category
          </span>
        </h2>

        <p className="text-lg md:text-xl text-gray-600 max-w-3xl leading-relaxed">
          Discover our curated collection of premium toys, carefully selected for quality,
          safety, and endless fun for children of all ages.
        </p>
      </div>

      <div className="lg:hidden mb-8">
        <div className="flex gap-4 px-2 pb-4 overflow-x-auto overflow-y-hidden custom-scrollbar">
          {categories.map((item, index) => {
            const isActive = category === item.name;
            return (
              <button
                key={index}
                onClick={() => setCategory(item.name)}
                className={`min-w-[160px] flex-shrink-0 group relative overflow-hidden rounded-2xl p-4 transition-all duration-300 border-4
            ${isActive
                  ? `scale-[1.02] ${index > 3 ? "border-teal-400" : "border-teal-700"} shadow-lg`
                  : "border-transparent hover:scale-[1.02] hover:shadow-md hover:border-teal-200"
                }
          `}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-90 transition-opacity duration-300`}></div>

                <div className="absolute inset-0 bg-white/10 opacity-50"></div>

                <div className="relative z-10 text-center">
                  <div className="text-3xl mb-3">
                    {item.icon}
                  </div>
                  <h3 className="text-white font-semibold text-sm leading-tight">
                    {item.name}
                  </h3>
                </div>

                {isActive && (
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-white rounded-full shadow-lg"></div>
                )}

                <div className="absolute inset-0 bg-white/20 opacity-0 transition-opacity duration-300"></div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ----- Desktop / Tablet:----- */}
      <div className="hidden lg:grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8 gap-4 mb-8">
        {categories.map((item, index) => {
          const isActive = category === item.name;
          return (
            <button
              key={index}
              onClick={() => setCategory(item.name)}
              className={`group relative overflow-hidden rounded-2xl p-4 transition-all duration-300 transform border-4
          ${isActive
                  ? `scale-[1.02] ${index > 3 ? "border-teal-400" : "border-teal-700"} shadow-lg`
                  : "border-transparent hover:scale-[1.02] hover:shadow-md hover:border-teal-200"
                }
        `}
            >
              {/* Background gradient (same for all states) */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-90 group-hover:opacity-100 transition-opacity duration-300`}></div>

              <div className="absolute inset-0 bg-white/10 opacity-50"></div>

              <div className="relative z-10 text-center">
                <div className={`text-3xl mb-3 transition-transform duration-300 ${isActive ? "scale-110" : "group-hover:scale-110"}`}>
                  {item.icon}
                </div>
                <h3 className="text-white font-semibold text-sm leading-tight">
                  {item.name}
                </h3>
              </div>

              {/* Active indicator (white line at bottom) */}
              {isActive && (
                <div className="absolute bottom-2 left-1/2  transform -translate-x-1/2 w-8 h-1 bg-white rounded-full shadow-lg"></div>
              )}

              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Menu;
