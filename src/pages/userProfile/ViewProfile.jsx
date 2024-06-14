import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";

const ViewProfile = () => {
  const { user } = useAuth();
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    fetch(`https://best-shopping-server.onrender.com/user/${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setUserInfo(data);
      });
  }, [user]);

  return (
    <div>
      <h1 className="text-xl text-center text-primary underline my-5">
        Profile Information
      </h1>
      <div className="ps-10">
        <h2>
          <span className="font-bold">Name: </span>
          {userInfo?.name}
        </h2>
        <h2>
          <span className="font-bold">Email: </span>
          {userInfo?.email}
        </h2>
        <h2>
          <span className="font-bold">Age: </span>
          {userInfo?.age}
        </h2>
        <h2>
          <span className="font-bold">Phone No: </span>
          {userInfo?.mobile}
        </h2>
      </div>
    </div>
  );
};

export default ViewProfile;
