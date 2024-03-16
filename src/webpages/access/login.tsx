import axios from "axios";
import e from "express";
import qs from "qs";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import FormAction from "../../components/access/formAction";
import { loginFields } from "../../components/access/formFields";
import FormInput from "../../components/access/formInput";
import NavBar from "../../components/partials/navBar";
import { errorFlash, sucessFlash } from "../../core/response";
import { useAuthContext } from "../../context/authContext";

interface FieldsState {
  [key: string]: string;
}
const fields = loginFields;
let fieldsState: FieldsState = {};
fields.forEach((field) => (fieldsState[field.id] = ""));

function Login() {
  const [loginState, setLoginState] = useState(fieldsState);
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setAuthUser } = useAuthContext();

  useEffect(() => {
    setIsFormValid(areAllInputsValid());
    console.log(isFormValid);
  }, [loginState]);

  const areAllInputsValid = () => {
    for (const [name, value] of Object.entries(loginState)) {
      const field = fields.find((f) => f.id === name);
      if (field?.isRequired && value === "") return false;
      if (field?.pattern && !new RegExp(field?.pattern).test(value)) {
        return false;
      }
    }
    return true;
  };
  const handleChange = (e: any) => {
    setLoginState({ ...loginState, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (isFormValid) {
      setIsSubmitting(true);
      try {
        const loginData = {
          email: loginState.email,
          password: loginState.password,
        };
        const loginResponse = await axios.post(
          `http://localhost:${process.env.REACT_APP_BACKEND_PORT}/v1/api/access/login`,
          qs.stringify(loginData),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              "Access-Control-Allow-Origin": "*",
            },
            withCredentials: true,
          }
        );
        console.log(loginResponse, "loginResponse");
        if (loginResponse.status === 200) {
          sucessFlash("Login successfull!");
          const userInfo = loginResponse.data.metadata;
          localStorage.setItem("user-info", JSON.stringify(userInfo));
          setAuthUser(userInfo);
          navigate("/home");
        }
        setIsSubmitting(false);
      } catch (error: any) {
        setIsSubmitting(false);
        errorFlash(error.response.data.infor.message);
        console.error("Error:", error.response);
      }
    }
  };
  return (
    <div className="">
      <NavBar />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white shadow-md rounded-md p-4 max-w-md w-full">
          <img
            src="https://images.unsplash.com/photo-1571863533956-01c88e79957e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80"
            alt=""
            className="w-auto rounded-md mb-4"
          />
          <h5 className="text-xl font-semibold mb-2">Login</h5>
          <form className="mt-4 space-y-6 group">
            <div className="space-y-4">
              {fields.map((field) => (
                <FormInput
                  handleChange={handleChange}
                  name={field.name}
                  value={loginState[field.id]}
                  placeHolder={field.placeholder}
                  type={field.type}
                  id={field.id}
                  labelText={field.labelText}
                  errorMessage={field.errorMessage}
                  pattern={field.pattern}
                  isRequired={field.isRequired}
                />
              ))}
            </div>
            <FormAction
              handleSubmit={handleSubmit}
              text="Login"
              customClass="group-invalid:pointer-events-none group-invalid:opacity-30"
              disabled={isSubmitting}
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
