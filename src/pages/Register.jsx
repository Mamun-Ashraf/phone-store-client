import { useState } from "react";
import GoogleLogin from "../components/auth/GoogleLogin";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const Register = () => {
  const { createUser, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [signupError, setSignupError] = useState("");

  const from = location?.state?.from?.pathname || "/";

  const handleRegister = (data) => {
    setSignupError("");
    createUser(data.email, data.password)
      .then((result) => {
        if (result?.user?.email) {
          const userInfo = {
            email: result?.user?.email,
            name: data?.name,
          };
          fetch("http://localhost:5000/user", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userInfo),
          })
            .then((res) => res.json())
            .then((data) => {
              localStorage.setItem("token", data?.token);
            });
        }
        if (user) {
          navigate(from);
        }
        Swal.fire("User created successfully");
        reset();
      })
      .catch((error) => {
        console.log(error.message);
        setSignupError(error.message);
      });
  };

  return (
    <div className="h-[800px] flex items-center">
      <div className="w-11/12 mx-auto md:w-96 p-7  bg-base-300 rounded">
        <h2 className="text-xl text-center text-primary underline">
          Please Register
        </h2>
        <form onSubmit={handleSubmit(handleRegister)}>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              {...register("name", {
                required: "Name is required",
              })}
              className="input input-bordered w-full"
            />
            {errors.name && (
              <p className="text-error" role="alert">
                {errors.name?.message}
              </p>
            )}
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              {...register("email", {
                required: "Email Address is required",
              })}
              className="input input-bordered w-full"
            />
            {errors.email && (
              <p className="text-error" role="alert">
                {errors.email?.message}
              </p>
            )}
          </div>
          <div className="form-control w-full mb-3">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
              })}
              className="input input-bordered w-full"
            />
            {errors.password && (
              <p className="text-error" role="alert">
                {errors.password?.message}
              </p>
            )}
          </div>
          <input
            className="btn btn-primary w-full mb-2"
            value="Register"
            type="submit"
          />
          <div>
            {signupError && <p className="text-error">{signupError}</p>}
          </div>
        </form>
        <p>
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500">
            Please login
          </Link>
        </p>
        <div className="divider">OR</div>
        <div className="mt-6">
          <GoogleLogin />
        </div>
      </div>
    </div>
  );
};

export default Register;
