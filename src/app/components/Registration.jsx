"use client";
import { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

const Registration = () => {
  const [formValues, setFormValues] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const [isSubmit, setIsSubmit] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/setup-organization"); 
    }
  }, [session, router]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      router.push("/setup-organization");
    }
  }, [formErrors, isSubmit, router]);

  const validate = (values) => {
    const errors = {};
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const regexPassWord = /^\S{4,}$/;

    if (!values.userName) {
      errors.userName = "User Name Is Required";
    }
    if (!values.email) {
      errors.email = "User email Is Required";
    } else if (!regex.test(values.email)) {
      errors.email = "This Is Not a Valid Email Format";
    }

    if (!values.password) {
      errors.password = "User password Is Required";
    } else if (!regexPassWord.test(values.password)) {
      errors.password =
        "Password Must be More Than 4 Characters and Should Not Contain Spaces";
    }
    return errors;
  };

  return (
    <div className="bg-gray-900 w-screen h-screen flex justify-center items-center px-4">
      <div className="bg-white border rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-center text-gray-900 text-2xl font-bold mb-6">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="name"
              className="block text-gray-900 text-md font-medium mb-2"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              value={formValues.userName}
              className="p-2 block w-full border rounded-md border-gray-300 focus:ring-2 focus:ring-blue-400 text-gray-900 text-md "
              type="text"
              placeholder="Enter Your Name"
              onChange={(e) =>
                setFormValues((prevState) => ({
                  ...prevState,
                  userName: e.target.value,
                }))
              }
            />
          </div>
          <p className="text-red-700 mb-2 ">{formErrors.userName}</p>
          <div>
            <label
              htmlFor="email"
              className="block text-gray-900 text-md font-medium mb-2"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              value={formValues.email}
              className="p-2 block w-full border rounded-md border-gray-300 focus:ring-2 focus:ring-blue-400 text-gray-900 text-md "
              type="email"
              placeholder="Enter Your Email"
              onChange={(e) =>
                setFormValues((prevState) => ({
                  ...prevState,
                  email: e.target.value,
                }))
              }
            />
          </div>
          <p className="text-red-700 mb-2">{formErrors.email}</p>
          <div>
            <label
              htmlFor="password"
              className="block text-gray-900 font-medium text-md mb-2"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              value={formValues.password}
              className="p-2 block w-full border rounded-md border-gray-300 focus:ring-2 focus:ring-blue-400 text-gray-900 text-md "
              type="password"
              placeholder="Enter Your Password"
              onChange={(e) =>
                setFormValues((prevState) => ({
                  ...prevState,
                  password: e.target.value,
                }))
              }
            />
          </div>
          <p className="text-red-700 mb-2 ">{formErrors.password}</p>
          <div>
            <button
              className="block w-full p-2 bg-blue-700 text-white font-medium rounded-md hover:bg-blue-800 focus:ring-2 focus:ring-blue-400 transition-all duration-200"
              type="submit"
            >
              Register
            </button>
          </div>
        </form>

        <div className="mt-4">
          <button
            className="flex items-center justify-center gap-2 w-full p-2 border border-gray-300 rounded-md shadow-sm hover:bg-gray-100 focus:ring-2 focus:ring-gray-300 transition-all duration-200"
            type="button"
            onClick={() => signIn("google")}
          >
            <FcGoogle className="text-xl" />
            <span className="text-gray-700 font-medium">
              Continue with Google
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Registration;
