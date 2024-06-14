import { Link, Outlet } from "react-router-dom";

const DashboardRoute = () => {
  return (
    <div className="drawer md:drawer-open">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        <label
          htmlFor="my-drawer"
          className="btn btn-primary drawer-button md:hidden"
        >
          Open drawer
        </label>
        <Outlet />
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          {/* Sidebar content here */}
          <li>
            <Link to="/dashboard" className="text-primary">
              Overview
            </Link>
          </li>
          <li>
            <Link to="/dashboard/all-phones" className="text-primary">
              All phones
            </Link>
          </li>
          <li>
            <Link to="/dashboard/add-phone" className="text-primary">
              Add a phone
            </Link>
          </li>
          <li>
            <button className="btn btn-error btn-sm text-white w-1/2">
              <Link to="/">Home</Link>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardRoute;
