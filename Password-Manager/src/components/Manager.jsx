import React, { useState, useEffect } from "react";
import { FaCopy } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

axios.defaults.baseURL = "http://localhost:5000";

function Manager() {
  const [showPass, setShowPass] = useState(false);
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setpasswordArray] = useState([]);

  useEffect(() => {
    const fetchPasswords = async () => {
      try {
        const response = await axios.get("/api/passwords");
        setpasswordArray(response.data);
      } catch (error) {
        toast.error("Error fetching passwords");
      }
    };

    fetchPasswords();
  }, []);

  const showPassword = () => {
    setShowPass(!showPass);
  };

  const savePassword = async () => {
    if (!isFormValid) return; // Prevent saving if the form is not valid
    try {
      const response = await axios.post("/api/passwords", form);
      console.log("Saved password response:", response.data);
      setpasswordArray([...passwordArray, response.data]);
      setform({ site: "", username: "", password: "" });
      toast.success("Password saved successfully");
    } catch (error) {
      console.error("Error saving password:", error);
      toast.error("Error saving password");
    }
  };

  const deletePassword = async (id) => {
    try {
      await axios.delete(`/api/passwords/${id}`);
      setpasswordArray(passwordArray.filter((item) => item._id !== id));
      toast.success("Password deleted successfully");
    } catch (error) {
      toast.error("Error deleting password");
    }
  };

  const handleEditClick = (item) => {
    // Set the form with the item details
    setform({
      site: item.site,
      username: item.username,
      password: item.password,
    });
    // Remove the item from the passwordArray
    setpasswordArray(
      passwordArray.filter((password) => password._id !== item._id)
    );
  };

  const editPassword = async (id) => {
    try {
      const response = await axios.put(`/api/passwords/${id}`, form);
      // Optionally, you can push the updated password back to the array
      setpasswordArray((prev) =>
        prev.map((item) => (item._id === id ? response.data : item))
      );
      // Reset the form
      setform({ site: "", username: "", password: "" });
      toast.success("Password updated successfully");
    } catch (error) {
      toast.error("Error updating password");
    }
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  const clearStorage = () => {
    localStorage.removeItem("passwords");
    setpasswordArray([]);
  };

  const isFormValid = form.site && form.username && form.password;

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>

      <div className=" container mx-auto w-full justify-center pt-2 flex flex-col items-center ">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            savePassword();
          }}
        >
          <div className="flex flex-col p-4 gap-3 w-full justify-center font-mono">
            <h1 className="text-blue-600/100 flex text-6xl font-bold">
              Password Manager
            </h1>
            <p className="text-blue-600/75 flex text-lg ">
              Manager Your Passwords with us
            </p>

            <input
              onChange={(e) => setform({ ...form, site: e.target.value })}
              className="rounded-full w-full h-10 border-2 border-violet-200 px-5 active:border-violet-700 focus:outline-none focus:ring focus:ring-violet-300"
              type="text"
              value={form.site}
              name="site"
              placeholder="Enter Website URL Here"
            />

            <div className="flex gap-2 w-full">
              <input
                onChange={(e) => setform({ ...form, username: e.target.value })}
                value={form.username}
                type="text"
                className="rounded-full border-2 border-violet-200 h-10 w-3/6 px-5 active:border-violet-700 focus:outline-none focus:ring focus:ring-violet-300"
                placeholder="Enter UserName"
                name="username"
              />

              <div className="rounded-full border-2 border-violet-200 h-10 w-3/6">
                <input
                  onChange={(e) =>
                    setform({ ...form, password: e.target.value })
                  }
                  value={form.password}
                  type={showPass ? "text" : "password"}
                  className="rounded-l-full h-full w-4/5 p-1 active:border-violet-700 focus:outline-none focus:ring focus:ring-violet-300 left-0 px-5"
                  placeholder="Enter Password"
                  name="password"
                />
                <button
                  className="h-full w-1/5 right-0 rounded-r-full active:border-violet-700 focus:outline-none focus:ring focus:ring-violet-300"
                  onClick={showPassword}
                  type="button" // Prevents form submission
                >
                  {showPass ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              onClick={() => editPassword(item._id)}
              disabled={!isFormValid}
              className={`text-gray-50 w-full rounded-full h-10 bg-violet-700 font-bold hover:bg-violet-600 ${
                !isFormValid && "cursor-not-allowed"
              }`}
            >
              Submit Details
            </button>
          </div>
        </form>

        <div className="details w-3/4">
          <h2 className="text-3xl text-center font-bold font-customPurple text-violet-500 flex justify-center items-center gap-3 pb-2">
            Your Passwords
            <button
              onClick={clearStorage}
              className="h-8 w-10 border flex justify-center items-center"
            >
              <MdDelete className="w-6" />
            </button>
          </h2>

          <div
            className={`w-full custom-scrollbar ${
              passwordArray.length !== 0 ? "h-48 overflow-y-scroll" : "h-auto"
            }`}
          >
            {passwordArray.length === 0 && (
              <div className="text-center py-5 text-violet-400 font-bold uppercase">
                ...no passwords to show...
              </div>
            )}
            {passwordArray.length !== 0 && (
              <table className="table-auto w-full">
                <thead>
                  <tr className="bg-violet-400 h-10">
                  <th className="border border-violet-100">SR No</th>
                    <th className="border border-violet-100">Site</th>
                    <th className="border border-violet-100">Username</th>
                    <th className="border border-violet-100">Password</th>
                    <th className="border border-violet-100">Actions</th>
                  </tr>
                </thead>
                <tbody className="overflow-y-scroll">
                  {passwordArray.map((item, index) => (
                    <tr key={item._id} className="">

                    <td className="border border-violet-500 p-2 text-center">
                    {index + 1}
                      </td>

                      <td className="border border-violet-500 p-2 text-center">
                        <span className="inline-flex items-center gap-2">
                          {item.site}
                          <FaCopy
                            className="colorPurple cursor-pointer"
                            onClick={() => copyText(item.site)}
                          />
                        </span>
                      </td>

                      <td className="border border-violet-500 p-2 text-center">
                        <span className="inline-flex items-center gap-2">
                          {item.username}
                          <FaCopy
                            className="colorPurple cursor-pointer"
                            onClick={() => copyText(item.username)}
                          />
                        </span>
                      </td>

                      <td className="border border-violet-500 p-2 text-center">
                        <span className="inline-flex items-center gap-2">
                          {item.password}
                          <FaCopy
                            className="colorPurple cursor-pointer"
                            onClick={() => copyText(item.password)}
                          />
                        </span>
                      </td>
                      <td className="border border-violet-500 p-2 text-center">
                        <span className="inline-flex items-center gap-2">
                          <FaEdit
                            className="colorPurple cursor-pointer"
                            onClick={() => handleEditClick(item)}
                          />
                          <MdDelete
                            className="colorPurple cursor-pointer"
                            onClick={() => deletePassword(item._id)}
                          />
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Manager;
