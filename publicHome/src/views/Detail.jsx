import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import gearLoad from "../components/assets/Gear-0.2s-264px.svg";

export default function Detail({ url }) {
  const [product, setProduct] = useState("");
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  async function fetchProduct() {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${url}/apis/pub/branded-things/products/${id}`
      );
      setProduct(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProduct();
  }, []);

  const toRupiah = (number) => {
    return Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  return (
    <>
      <main className="px-10 my-8">
        {loading ? (
          <div className="mt-32 flex justify-center items-center">
            <img src={gearLoad} />
          </div>
        ) : (
          <div className="flex flex-col bg-base-100 my-6 items-center p-20  bg-gray-100 shadow">
            <img
              src={product.imgUrl}
              className="max-w-sm rounded-lg shadow mb-5"
            />
            <div className="flex-col">
              <div>
                <div className="texts">
                  <h1 className="text-5xl font-bold text-accent-focus">
                    {product.name}
                  </h1>
                  <div className="py-6">
                    <p>{product.description}</p>
                    <br></br>
                    <p>Stock: {product.stock}</p>
                    <p>Price: {toRupiah(product.price)}</p>
                  </div>
                </div>
                <div className="buttons">
                  <Link to="/">
                    <button className="btn btn-accent">Back</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
