import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const ProductTable = ({ url }) => {
  const [products, setProducts] = useState([]);
  const [Loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleDeleteProduct = async (id) => {
    try {
      setLoading(true);

      await axios.delete(`${url}/apis/branded-things/products/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      const newProducts = products.filter((product) => product.id !== id);

      toast.success("Successfully deleted product", {
        position: "bottom-right",
      });
      setProducts(newProducts);
    } catch (error) {
      toast.error(error.response.data.error, { position: "bottom-right" });

      if (error.response.data.statusCode === 500) {
        localStorage.clear();
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  function handleEdit(id) {
    navigate(`/products/edit/${id}`);
  }

  function handleEditImage(id) {
    navigate(`/products/edit/${id}/image`);
  }

  const toRupiah = (number) => {
    return Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(
          `${url}/apis/branded-things/products`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.access_token}`,
            },
          }
        );
        setProducts(data.data);
      } catch (error) {
        toast.error(error.response.data.error, { position: "bottom-right" });

        if (error.response.data.statusCode === 500) {
          localStorage.clear();
          navigate("/login");
        }
      }
    };
    fetchProducts();
  }, [navigate]);

  return (
    <>
      <table className="table align-middle">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col" width="180px">
              Image
            </th>
            <th scope="col" width="250px">
              Description
            </th>
            <th scope="col">Stock</th>
            <th scope="col">Price</th>
            <th scope="col">Author</th>
            <th scope="col" width="50px"></th>
          </tr>
        </thead>
        <tbody id="table-product">
          {!Loading ? (
            products.map((product, index) => (
              <tr key={product.id}>
                <td scope="row">#{index + 1}</td>
                <td className="fw-bold">{product.name}</td>
                <td>
                  <img
                    src={product.imgUrl}
                    alt={product.name}
                    className="img-fluid"
                  />
                </td>
                <td>{product.description}</td>
                <td>{product.stock}</td>
                <td className="fw-bold">{toRupiah(product.price)}</td>
                <td>{product.User.email}</td>
                <td>
                  <span className="d-flex">
                    <button
                      type="button"
                      className="ms-3"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      <span className="icon material-symbols-outlined text-danger">
                        delete
                      </span>
                    </button>
                    <button
                      type="button"
                      className="ms-3"
                      onClick={() => handleEdit(product.id)}
                    >
                      <span className="icon material-symbols-outlined text-danger">
                        edit
                      </span>
                    </button>
                    <button
                      type="button"
                      className="ms-3"
                      onClick={() => handleEditImage(product.id)}
                    >
                      <span className="icon material-symbols-outlined text-danger">
                        image
                      </span>
                    </button>
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={8} className="text-center">
                <img src="/batman.gif" alt="Loading" width={120} />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default ProductTable;
