import { useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { sendOtp } from "../../../services/operations/authAPI";
import { setSignupData } from "../../../slices/authSlice";
import { ACCOUNT_TYPE } from "../../../utils/constants";
import Tab from "../../common/Tab";

function SignupForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  //validate to All PreviousFields
  const validatePreviousFields = (filedName) => {
    const requiredFileds = [
      "firstName",
      "lastName",
      "email",
      "password",
      "confirmPassword",
    ];
    const currentIndex = requiredFileds.indexOf(filedName);
    const newErros = {};

    for (let i = 0; i < currentIndex; i++) {
      const key = requiredFileds[i];
      if (!formData[key].trim()) {
        const formattedKey =
          key.charAt(0).toUpperCase() + key.replace(/([A-Z])/g, "$1").slice(1);

        newErros[key] = `${formattedKey} is required`;
      }
    }
    setErrors((prev) => ({ ...prev, ...newErros }));
  };

  // student or instructor
  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { firstName, lastName, email, password, confirmPassword } = formData;

  // Handle input fields, when some value changes
  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle Form Submission
  const handleOnSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    let hasError = false;

    // Validate all fields
    Object.entries(formData).forEach(([key, value]) => {
      if (!value.trim()) {
        const formattedKey =
          key.charAt(0).toUpperCase() + key.replace(/([A-Z])/g, " $1").slice(1);
        newErrors[key] = `${formattedKey} is required`;
        hasError = true;
      }
    });

    // Check password match
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      hasError = true;
    }

    setErrors(newErrors);

    if (hasError) {
      const firstErrorField = Object.keys(newErrors)[0];
      document.querySelector(`[name="${firstErrorField}"]`)?.focus();
      return;
    }

    // If no errors, continue
    const signupData = {
      ...formData,
      accountType,
    };

    dispatch(setSignupData(signupData));
    dispatch(sendOtp(formData.email, navigate));

    // Reset form
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setAccountType(ACCOUNT_TYPE.STUDENT);
  };

  // data to pass to Tab component
  const tabData = [
    {
      id: 1,
      tabName: "Student",
      type: ACCOUNT_TYPE.STUDENT,
    },
    {
      id: 2,
      tabName: "Instructor",
      type: ACCOUNT_TYPE.INSTRUCTOR,
    },
  ];

  return (
    <div>
      {/* Tab */}
      <Tab tabData={tabData} field={accountType} setField={setAccountType} />
      {/* Form */}
      <form onSubmit={handleOnSubmit} className="flex w-full flex-col gap-y-4">
        <div className="flex gap-x-4">
          <label>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              First Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onFocus={() => validatePreviousFields("firstName")}
              onChange={(e) => {
                handleOnChange(e);
                setErrors((prev) => ({ ...prev, firstName: "" }));
              }}
              placeholder="Enter first name"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className={`w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 outline-none ${
                errors.firstName
                  ? "border-2 border-pink-500"
                  : "border border-richblack-600"
              }`}
            />
            {errors.firstName && (
              <p className="text-pink-200 text-xs mt-1">{errors.firstName}</p>
            )}
          </label>
          <label>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Last Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onFocus={() => validatePreviousFields("lastName")}
              onChange={(e) => {
                handleOnChange(e);
                setErrors((prev) => ({ ...prev, lastName: "" }));
              }}
              placeholder="Enter last name"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className={`w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 outline-none  ${
                errors.lastName
                  ? "border-2 border-pink-500"
                  : "border border-richblack-600"
              }`}
            />
            {errors.lastName && (
              <p className="text-pink-200 text-xs mt-1">{errors.lastName}</p>
            )}
          </label>
        </div>
        <label className="w-full">
          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5 outline-none ">
            Email Address <sup className="text-pink-200">*</sup>
          </p>
          <input
            type="text"
            name="email"
            value={formData.email}
            onFocus={() => validatePreviousFields("email")}
            onChange={(e) => {
              handleOnChange(e);
              setErrors((prev) => ({ ...prev, email: "" }));
            }}
            placeholder="Enter email address"
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className={`w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 outline-none  ${
              errors.email
                ? "border-2 border-pink-500"
                : "border border-richblack-600"
            }`}
          />
          {errors.email && (
            <p className="text-pink-200 text-xs mt-1">{errors.email}</p>
          )}
        </label>
        <div className="flex gap-x-4">
          <label className="relative">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5 outline-none ">
              Create Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onFocus={() => validatePreviousFields("password")}
              onChange={(e) => {
                handleOnChange(e);
                setErrors((prev) => ({ ...prev, password: "" }));
              }}
              placeholder="Enter Password"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className={`w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 outline-none  ${
                errors.password
                  ? "border-2 border-pink-500"
                  : "border border-richblack-600"
              }`}
            />
            {errors.password && (
              <p className="text-pink-200 text-xs mt-1">{errors.password}</p>
            )}
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>
          <label className="relative">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5 outline-none ">
              Confirm Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onFocus={() => validatePreviousFields("confirmPassword")}
              onChange={(e) => {
                handleOnChange(e);
                setErrors((prev) => ({ ...prev, confirmPassword: "" }));
              }}
              placeholder="Confirm Password"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className={`w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 outline-none  ${
                errors.confirmPassword
                  ? "border-2 border-pink-500"
                  : "border border-richblack-600"
              }`}
            />
            {errors.confirmPassword && (
              <p className="text-pink-200 text-xs mt-1">
                {errors.confirmPassword}
              </p>
            )}
            <span
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>
        </div>
        <button
          type="submit"
          className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
        >
          Create Account
        </button>
      </form>
    </div>
  );
}

export default SignupForm;
