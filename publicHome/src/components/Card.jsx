import { useNavigate } from "react-router-dom";

export default function Card({ product }) {
  const navigate = useNavigate();

  function handleClick(id) {
    navigate(`/detail/${id}`);
  }
  return (
    <>
      <div className="card bg-gray-100 shadow-2xl flex flex-row">
        <figure className="ml-10">
          <img src={product.imgUrl} alt="product image" />
        </figure>
        <div className="card-body flex-1">
          <b>{product.name}</b>
          <p>{product.description}</p>
          <button
            className="btn btn-info btn-sm"
            onClick={() => handleClick(product.id)}
          >
            Detail
          </button>
        </div>
      </div>
    </>
  );
}
