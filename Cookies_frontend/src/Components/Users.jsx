import React, { useState, useEffect } from "react";
import axios from "axios";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

function Users() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { setAuth } = useAuth();

  useEffect(() => {
    const controller = new AbortController();
    const getUsers = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL_USER}/users`,
          {
            signal: controller.signal,
          }
        );

        const user = response.data[0];
        setAuth((prevAuth) => ({
          ...prevAuth,
          user: user.name,
        }));

        setUsers(response.data);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request canceled:", error.message);
        } else {
          console.log(error);
          navigate("/login", { state: { from: location }, replace: true });
        }
      }
    };
    getUsers();
    return () => {
      controller.abort();
    };
  }, [navigate, location, setAuth]);

  const handleDelete = async (id) => {
    if (!id) return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL_USER}/users/${id}`
      );
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
      toast.success("User deleted successfully");
    } catch (error) {
      toast.error("Failed to delete user");
    }
  };

  return (
    <motion.section
      className="container mx-auto py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold text-center mb-8 text-red-500">
        User Management
      </h2>
      {users.length ? (
        <div className="w-full max-w-md p-2 mx-auto bg-white rounded-2xl shadow-lg space-y-4">
          {users.map((user) => (
            <motion.div
              key={user._id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <Disclosure>
                {({ open }) => (
                  <>
                    <Disclosure.Button
                      className={`flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-purple-900 bg-purple-100 rounded-lg focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75 ${
                        open ? "shadow-lg" : ""
                      }`}
                    >
                      <span>{user.name}</span>
                      <ChevronUpIcon
                        className={`${
                          open ? "rotate-180 transform" : ""
                        } h-5 w-5 text-purple-500`}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                      <div className="flex items-center justify-between">
                        <div className="text-left">
                          <p>Email: {user.email}</p>
                          <p>Role: Software Engineer</p>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md"
                          onClick={() => handleDelete(user._id)}
                        >
                          Delete
                        </motion.button>
                      </div>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No Users Found</p>
      )}
    </motion.section>
  );
}

export default Users;
