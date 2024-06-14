import { useEffect, useState } from "react";
import PhoneCard from "../../components/cards/PhoneCard";
import { useForm } from "react-hook-form";

const AllPhones = () => {
  const [phones, setPhones] = useState([]);
  const [filteredPhones, setFilteredPhones] = useState([]);

  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    fetch("https://phone-store-server-2xjt.onrender.com/s")
      .then((res) => res.json())
      .then((data) => {
        setPhones(data);
        setFilteredPhones(data);
      });
  }, []);

  const handleRemainingPhones = (id) => {
    const remainingPhones = phones.filter((phone) => phone._id !== id);
    setPhones(remainingPhones);
    setFilteredPhones(remainingPhones);
  };

  const handleSearchPhone = (data) => {
    const searchQuery = data.search.toLowerCase();
    const filtered = phones.filter((phone) =>
      phone.name.toLowerCase().includes(searchQuery)
    );
    setFilteredPhones(filtered);
    reset();
  };

  const handleResetSearch = () => {
    setFilteredPhones(phones);
    reset();
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold text-center text-success mt-5 mb-8 underline">
        All Phones
      </h1>
      <form
        onSubmit={handleSubmit(handleSearchPhone)}
        className="ms-5 flex gap-2 my-8"
      >
        <div>
          <input
            {...register("search", { required: true })}
            className="bg-gray-100 p-2 border border-black rounded-lg w-full"
            type="text"
            placeholder="Search Phone"
          />
        </div>
        <div className="text-center">
          <input
            className="btn btn-primary btn-sm text-white"
            type="submit"
            value="Search"
          />
        </div>
        <div className="text-center">
          <button
            type="button"
            className="btn btn-primary btn-sm text-white"
            onClick={handleResetSearch}
          >
            View all Phones
          </button>
        </div>
      </form>
      <div className="grid md:grid-cols-3 gap-4">
        {filteredPhones.map((phone) => (
          <PhoneCard
            key={phone._id}
            Phone={phone}
            onDelete={handleRemainingPhones}
          />
        ))}
      </div>
    </div>
  );
};

export default AllPhones;
