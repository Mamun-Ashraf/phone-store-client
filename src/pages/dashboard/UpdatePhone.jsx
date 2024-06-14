import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const UpdatePhones = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const phone = useLoaderData();

  const handleUpdatePhone = async (data) => {
    const token = localStorage.getItem("token");

    await fetch(`https://phone-store-server-2xjt.onrender.com//${phone._id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then(() => {
        Swal.fire("Phone updated successfully!");
        reset();
      });
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-center text-success mt-5 mb-8 underline">
        Update Phone
      </h1>
      <form
        onSubmit={handleSubmit(handleUpdatePhone)}
        className="space-y-2 w-1/2 mx-auto"
      >
        <div>
          <input
            {...register("name", { required: true })}
            className="bg-gray-100 p-2 border border-black rounded-lg w-full"
            type="text"
            placeholder="Name"
            defaultValue={phone.name}
          />
          {errors.name && (
            <span className="text-red-400">Name is required</span>
          )}
        </div>
        <div>
          <input
            {...register("brand", { required: true })}
            className="bg-gray-100 p-2 border border-black rounded-lg w-full"
            type="text"
            placeholder="Brand"
            defaultValue={phone.brand}
          />
          {errors.brand && (
            <span className="text-red-400">Brand is required</span>
          )}
        </div>
        <div>
          <input
            {...register("category", { required: true })}
            className="bg-gray-100 p-2 border border-black rounded-lg w-full"
            type="text"
            placeholder="Category"
            defaultValue={phone.category}
          />
          {errors.category && (
            <span className="text-red-400">Category is required</span>
          )}
        </div>
        <div>
          <input
            {...register("price", { required: true })}
            className="bg-gray-100 p-2 border border-black rounded-lg w-full"
            type="number"
            placeholder="Price"
            defaultValue={phone.price}
          />
          {errors.price && (
            <span className="text-red-400">Price is required</span>
          )}
        </div>
        <div>
          <input
            {...register("image")}
            className="bg-gray-100 p-2 border border-black rounded-lg w-full"
            type="text"
            placeholder="Image URL"
            defaultValue={phone.image}
          />
        </div>
        <div className="text-center">
          <input
            className="btn btn-success text-white"
            type="submit"
            value="Update Phone"
          />
        </div>
      </form>
    </div>
  );
};

export default UpdatePhones;
