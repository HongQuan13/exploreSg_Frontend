import axios from "axios";
import qs from "qs";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormAction from "../../components/access/formAction";
import { registerFields } from "../../components/access/formFields";
import FormInput from "../../components/access/formInput";
import NavBar from "../../components/partials/navBar";
import { errorFlash, sucessFlash } from "../../core/response";

interface FieldsState {
  [key: string]: string;
}
const fields = registerFields;
let fieldsState: FieldsState = {};
fields.forEach((field) => (fieldsState[field.id] = ""));

function Register() {
  const [registerState, setRegisterState] = useState(fieldsState);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    setIsFormValid(areAllInputsValid());
    console.log(isFormValid);
  }, [registerState]);

  const areAllInputsValid = () => {
    for (const [name, value] of Object.entries(registerState)) {
      const field = fields.find((f) => f.id === name);
      if (field?.isRequired && value === "") return false;
      if (name === "confirm-password") {
        if (value !== registerState.password) return false;
      }
      if (field?.pattern && !new RegExp(field?.pattern).test(value)) {
        return false;
      }
    }
    return true;
  };
  const handleChange = (e: any) => {
    setRegisterState({ ...registerState, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (isFormValid) {
      setIsSubmitting(true);
      try {
        const registerData = {
          email: registerState.email,
          password: registerState.password,
          username: registerState.username,
        };
        const registerResponse = await axios.post(
          `http://localhost:${process.env.REACT_APP_BACKEND_PORT}/v1/api/access/register`,
          qs.stringify(registerData),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              "Access-Control-Allow-Origin": "*",
            },
            withCredentials: true,
          }
        );
        console.log(registerResponse);

        if (registerResponse.status === 201) {
          sucessFlash(
            "Register new account successfull, pls login to continue!"
          );
          navigate("/access/login");
        }
        setIsSubmitting(false);
      } catch (error: any) {
        setIsSubmitting(false);

        errorFlash(error.response.data.message);
        console.error("Error:", error.response);
      }
    }
  };
  return (
    <>
      <NavBar />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="max-w-md w-full px-4">
          <div className="bg-white shadow-md rounded-md">
            <img
              src="https://images.unsplash.com/photo-1571863533956-01c88e79957e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80"
              alt=""
              className="w-full rounded-t-md"
            />
            <div className="p-6">
              <h5 className="text-xl font-semibold mb-4">Register</h5>
              <form className="group">
                <div className="space-y-4">
                  {fields.map((field) =>
                    field.id === "confirm-password" ? (
                      <FormInput
                        handleChange={handleChange}
                        name={field.name}
                        value={registerState[field.id]}
                        placeHolder={field.placeholder}
                        type={field.type}
                        id={field.id}
                        labelText={field.labelText}
                        errorMessage={field.errorMessage}
                        pattern={registerState.password}
                        isRequired={field.isRequired}
                      />
                    ) : (
                      <FormInput
                        handleChange={handleChange}
                        name={field.name}
                        value={registerState[field.id]}
                        placeHolder={field.placeholder}
                        type={field.type}
                        id={field.id}
                        labelText={field.labelText}
                        errorMessage={field.errorMessage}
                        pattern={field.pattern}
                        isRequired={field.isRequired}
                      />
                    )
                  )}
                </div>
                <FormAction
                  handleSubmit={handleSubmit}
                  text="Register"
                  customClass="group-invalid:pointer-events-none group-invalid:opacity-30"
                  disabled={isSubmitting}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
