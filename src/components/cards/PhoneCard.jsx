import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const PhoneCard = ({ phone, onDelete }) => {
  const token = localStorage.getItem("token");
  const { _id, phone_name, brand, price, image } = phone;

  const handleDelete = async () => {
    await fetch(`http://localhost:5000/phone/${_id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then(() => {
        Swal.fire("Phone deleted successfully!");
        onDelete(_id);
      });
  };

  return (
    <div className=" card  shadow-xl image-full">
      <figure>
        <img src={image} alt="" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{phone_name}</h2>
        <h3>
          <span className="text-lg font-semibold">Brand:</span> {brand}
        </h3>
        <h3>
          <span className="text-lg font-semibold">Price:</span> ${price}
        </h3>
        <div className="card-actions justify-end">
          <button className="btn btn-success btn-sm text-white">
            <Link to={`/dashboard/update-phone/${_id}`}>Update</Link>
          </button>
          <button
            onClick={handleDelete}
            className="btn btn-error btn-sm text-white"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhoneCard;
