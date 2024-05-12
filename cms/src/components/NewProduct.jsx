import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const NewProduct = ({
  url,
  id,
  name,
  categoryId,
  description,
  stock,
  price,
  imgUrl,
}) => {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    name: name || "",
    categoryId: categoryId || "",
    description: description || "",
    stock: stock || 0,
    price: price || 0,
    imgUrl: imgUrl || "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      setIsLoading(true);

      if (id) {
        await axios.put(`${url}/apis/branded-things/products/${id}`, form, {
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        });
        toast.success("Successfully updated product", {
          position: "bottom-right",
        });
      } else {
        await axios.post(`${url}/apis/branded-things/products`, form, {
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        });
        toast.success("Successfully added new product", {
          position: "bottom-right",
        });
      }

      navigate("/products");
    } catch (error) {
      toast.error(error.response.data.error, { position: "bottom-right" });

      if (error.response.data.statusCode === 500) {
        localStorage.clear();
        navigate("/login");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(
          `${url}/apis/branded-things/categories`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.access_token}`,
            },
          }
        );

        setCategories(data.data);
      } catch (error) {
        toast.error(error.response.data.error, { position: "bottom-right" });

        if (error.response.data.statusCode === 500) {
          localStorage.clear();
          navigate("/login");
        }
      }
    };

    fetchCategories();
  }, [navigate]);

  if (isLoading) return <img src="/batman.gif" alt="Loading" width={120} />;

  return (
    <form id="product-form" onSubmit={handleFormSubmit}>
      <div className="mb-3">
        <label htmlFor="product-name">
          Name <span className="text-danger fw-bold">*</span>
        </label>
        <input
          type="text"
          className="form-control"
          id="product-name"
          placeholder="Enter product name"
          autoComplete="off"
          required
          value={form.name}
          onChange={(event) => setForm({ ...form, name: event.target.value })}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="product-category">
          Category <span className="text-danger fw-bold">*</span>
        </label>
        <select
          id="product-category"
          className="form-select"
          required
          value={form.categoryId}
          onChange={(event) =>
            setForm({ ...form, categoryId: event.target.value })
          }
        >
          <option value="" disabled>
            -- Select Category --
          </option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="product-desc">
          Description <span className="text-danger fw-bold">*</span>
        </label>
        <input
          type="text"
          className="form-control"
          id="product-desc"
          placeholder="Enter product description"
          autoComplete="off"
          required
          value={form.description}
          onChange={(event) =>
            setForm({ ...form, description: event.target.value })
          }
        />
      </div>
      <div className="row">
        <div className="col-12 col-md-6">
          <div className="mb-3">
            <label htmlFor="product-stock">
              Stock <span className="text-danger fw-bold">*</span>
            </label>
            <input
              type="number"
              min="0"
              className="form-control"
              id="product-stock"
              placeholder="Enter product stock"
              autoComplete="off"
              required
              value={form.stock || ""}
              onChange={(event) =>
                setForm({ ...form, stock: +event.target.value })
              }
            />
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div className="mb-3">
            <label htmlFor="product-price">
              Price <span className="text-danger fw-bold">*</span>
            </label>
            <input
              type="number"
              min="0"
              className="form-control"
              id="product-price"
              placeholder="Enter product price"
              autoComplete="off"
              required
              value={form.price || ""}
              onChange={(event) =>
                setForm({ ...form, price: +event.target.value })
              }
            />
          </div>
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="product-image">Image</label>
        <input
          type="text"
          className="form-control"
          id="product-image"
          placeholder="Enter product image url"
          autoComplete="off"
          value={form.imgUrl}
          onChange={(event) => setForm({ ...form, imgUrl: event.target.value })}
        />
      </div>
      <div className="mb-3 row">
        <div className="col-6">
          <button
            className="btn btn-lg btn-light rounded-pill w-100 p-2"
            accent="secondary"
            onClick={() => navigate("/products")}
          >
            Cancel
          </button>
        </div>
        <div className="col-6">
          <button
            className="btn btn-lg btn-primary rounded-pill w-100 p-2"
            type="submit"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default NewProduct;
