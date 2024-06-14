import { Link, useLocation, useNavigate } from "react-router-dom";
import GoogleLogin from "../components/auth/GoogleLogin";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const Login = () => {
  const { signIn, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [loginError, setLoginError] = useState("");

  const from = location?.state?.from?.pathname || "/";

  const handleLogin = (data) => {
    setLoginError("");
    signIn(data.email, data.password)
      .then((result) => {
        if (result?.user?.email) {
          reset();
        }
      })
      .catch((error) => {
        console.log(error.message);
        setLoginError(error.message);
      });
  };

  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, from, navigate]);

  return (
    <div className="h-[800px] flex justify-center items-center">
      <div className="w-11/12 mx-auto md:w-96 p-7  bg-base-300 rounded">
        <h2 className="text-xl text-center text-primary underline">
          Please Login
        </h2>
        <form onSubmit={handleSubmit(handleLogin)}>
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
          <div className="form-control w-full">
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
            <label className="label">
              <span className="label-text">Forget Password?</span>
            </label>
          </div>
          <input
            className="btn btn-primary w-full"
            value="Login"
            type="submit"
          />
          <div>{loginError && <p className="text-error">{loginError}</p>}</div>
        </form>
        <p>
          New User?{" "}
          <Link to="/register" className="text-blue-500">
            Register here
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

export default Login;
