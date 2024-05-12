import Card from "../components/Card";
import axios from "axios";
import { useEffect, useState } from "react";
import gearLoad from "../components/assets/Gear-0.2s-264px.svg";

export default function Home({ url }) {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("ASC");
  const [categories, setCategories] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  async function fetchProducts() {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${url}/apis/pub/branded-things/products?q=${search}&i=${filter}&limit=10&page=${page}&sort=${sort}`
      );
      const categori = await axios.get(
        `${url}/apis/pub/branded-things/categories`
      );
      setProducts(data.data.query);
      setCategories(categori.data.data);
      setPagination(data.data.pagination.totalPage);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, [search, filter, sort, page]);

  return (
    <>
      <div id="PAGE-HOME" className="p-3">
        <section className="flex flex-col max-w-screen-xl gap-4 p-4 mx-auto">
          <form
            action=""
            method="get"
            className="flex justify-center items-center"
          >
            {/* filter */}
            <div className="flex flex-col md:flex-row md:space-x-2 items-center">
              <span className="font-medium text-gray-600 text-black">
                Filter by:
              </span>
              <select
                className="px-4 py-2 rounded-lg bg-info text-white focus:outline-none focus:bg-gray-600"
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value={""}>Categories...</option>
                {categories.map((c) => {
                  return (
                    <option key={c.id} value={c.name}>
                      {c.name}
                    </option>
                  );
                })}
              </select>
            </div>

            {/* sort */}

            <div className="flex flex-col md:flex-row md:space-x-2 items-center">
              <span className="font-medium text-gray-600 text-black">
                Sort by:
              </span>
              <select
                className="px-4 py-2 rounded-lg bg-info text-white focus:outline-none focus:bg-gray-600"
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="ASC">Oldest</option>
                <option value="DESC">Latest</option>
              </select>
            </div>
            <div className="flex flex-col md:flex-row md:space-x-2 items-center">
              {/* search */}
              <input
                type="search"
                name="search"
                placeholder="Search..."
                className="px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:bg-gray-600"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </form>
        </section>

        {loading ? (
          <div className="mt-32 flex justify-center items-center">
            <img src={gearLoad} />
          </div>
        ) : (
          <main className="grid grid-cols-2 gap-5 px-10 my-8 bg-white">
            {products.map((product) => {
              return <Card key={product.id} product={product} />;
            })}
            <div className="join w-full flex justify-center">
              <span className="font-medium text-gray-600 text-black">
                Page:
              </span>
              <div className="join">
                {[...Array(pagination)].map((x, i) => (
                  <button
                    className="join-item btn"
                    onClick={() => setPage(i + 1)}
                    key={i}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>
          </main>
        )}
      </div>
    </>
  );
}
