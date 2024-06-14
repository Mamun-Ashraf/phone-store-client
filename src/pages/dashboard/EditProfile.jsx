import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const EditProfile = () => {
  const userInfo = useLoaderData();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleUpdateProfile = async (data) => {
    const token = localStorage.getItem("token");

    await fetch(`http://localhost:5000/user/${userInfo?.email}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then(() => {
        Swal.fire("User updated successfully!");
        reset();
      });
  };
  return (
    <div>
      <h1 className="text-2xl font-semibold text-center text-success mt-5 mb-8 underline">
        Edit Profile
      </h1>
      <form
        onSubmit={handleSubmit(handleUpdateProfile)}
        className="space-y-2 w-1/2 mx-auto"
      >
        <div>
          <label htmlFor="">Name</label>
          <input
            {...register("name", { required: true })}
            className="bg-gray-100 p-2 border border-black rounded-lg w-full"
            type="text"
            defaultValue={userInfo.name}
          />
          {errors.name && (
            <span className="text-red-400">Name is required</span>
          )}
        </div>
        <div>
          <label htmlFor="">Email</label>
          <input
            {...register("email", { required: true })}
            className="bg-gray-100 p-2 border border-black rounded-lg w-full"
            type="email"
            value={userInfo.email}
          />
          {errors.email && (
            <span className="text-red-400">Email is required</span>
          )}
        </div>
        <div>
          <label htmlFor="">Age</label>
          <input
            {...register("age", { required: true })}
            className="bg-gray-100 p-2 border border-black rounded-lg w-full"
            type="number"
          />
          {errors.age && <span className="text-red-400">Age is required</span>}
        </div>
        <div>
          <label htmlFor="">Mobile number</label>
          <input
            {...register("mobile", { required: true })}
            className="bg-gray-100 p-2 border border-black rounded-lg w-full"
            type="text"
          />
          {errors.mobile && (
            <span className="text-red-400"> Mobile number is required</span>
          )}
        </div>
        <div className="text-center">
          <input
            className="btn btn-success text-white"
            type="submit"
            value="Update profile"
          />
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
