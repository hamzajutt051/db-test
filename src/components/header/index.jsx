import React from "react";

export default function Header({
  search,
  setSearch,
  cart,
  categories = [],
  category,
  setCategory,
}) {
  return (
    <div className="bg-white flex justify-between items-center p-5 flex-wrap">
      <h1 className="text-3xl font-bold">Ecommerce</h1>
      <div className="flex items-center  md:mx-4 order-last md:order-none w-screen md:flex-1 mt-5 md:mt-0">
        <select
          className="border border-gray-300 rounded-md px-4 py-[10.5px] w-[100px] md:w-[150px]"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Search"
          className="border border-gray-300 rounded-md px-4 py-2 w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="relative">
        <button className="bg-yellow-500 text-white px-4 py-2 rounded-md">
          Cart
        </button>
        {cart.length > 0 && (
          <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex justify-center items-center">
            {cart.length}
          </div>
        )}
      </div>
    </div>
  );
}
