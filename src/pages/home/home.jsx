import axios from "axios";
import Rating from "react-rating";
import { MdOutlineStarOutline, MdOutlineStarPurple500 } from "react-icons/md";

import React, { useLayoutEffect, useMemo } from "react";

import Header from "../../components/header";

export default function HomePage() {
  const [products, setProducts] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [cart, setCart] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [category, setCategory] = React.useState("");

  useLayoutEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    await axios
      .get("https://fakestoreapi.com/products", {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setProducts(res.data);
        // get unique categories
        const uniqueCategories = [
          ...new Set(res.data.map((product) => product.category)),
        ];

        setCategories(uniqueCategories);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const fetchCart = async () => {
    const cart = localStorage.getItem("cart");
    if (cart) {
      setCart(JSON.parse(cart));
    }
  };

  const filterProducts = useMemo(() => {
    let filteredProducts = products;

    if (category) {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === category
      );
    }

    if (search) {
      filteredProducts = filteredProducts.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    return filteredProducts;
  }, [products, search,category]);

  const addToCart = (product) => {
    const exist = cart.find((item) => item.id === product.id);
    let newCart = [];
    if (exist) {
      newCart = cart.map((item) =>
        item.id === product.id ? { ...item, qty: item.qty + 1 } : item
      );
      setCart(newCart);
    } else {
      newCart = [...cart, { ...product, qty: 1 }];
      setCart(newCart);
    }

    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  return (
    <div className="bg-white p-5">
      <Header
        setSearch={setSearch}
        search={search}
        cart={cart}
        categories={categories}
        category={category}
        setCategory={setCategory}
      />
      {filterProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filterProducts.map((product) => (
            <div
              key={product.id}
              className="border border-gray-300 dark:border-gray-700 rounded-md p-4 group"
            >
              <div className="flex justify-center items-center">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-40 h-40 object-contain"
                />
              </div>
              <div className="flex flex-col justify-center items-center mt-4">
                <div className="flex justify-between w-full items-center md:flex-col md:items-start">
                  <h1 className="text-md font-bold">
                    {product.title.length > 20
                      ? product.title.slice(0, 20) + "..."
                      : product.title}
                  </h1>
                  <p className="text-lg mt-2">${product.price}</p>
                </div>
                <div className="flex justify-between w-full items-center md:flex-col md:items-start">
                  <Rating
                    initialRating={product?.rating?.rate}
                    readonly
                    emptySymbol={
                      <MdOutlineStarOutline className="text-yellow-500" />
                    }
                    fullSymbol={
                      <MdOutlineStarPurple500 className="text-yellow-500" />
                    }
                  />
                  <button
                    className="bg-yellow-500 text-white px-4 py-2 rounded-md md:opacity-0 group-hover:opacity-100 transition-all"
                    onClick={() => addToCart(product)}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-full">
          {loading ? (
            <h1 className="text-2xl">Loading...</h1>
          ) : (
            <h1 className="text-2xl">No products found</h1>
          )}
        </div>
      )}
    </div>
  );
}
