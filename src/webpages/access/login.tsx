import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useLogin } from "./hooks/useLogin";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/authContext";
import { errorFlash, sucessFlash } from "../../core/response";
import { loginFields } from "../../components/access/formFields";

import NavBar from "../../components/partials/navBar";
import FormInput from "../../components/access/formInput";
import FormAction from "../../components/access/formAction";

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
  const { setAuthUser } = useAuthContext();
  const { mutate: login, isPending } = useLogin({
    onSuccess: (data) => {
      const loginResponse = data as AxiosResponse<any, any>;
      sucessFlash("Login successfull!");
      const userInfo = loginResponse.data.metadata;
      localStorage.setItem("user-info", JSON.stringify(userInfo));
      setAuthUser(userInfo);
      navigate("/home");
    },
    onError: (error: any) => {
      errorFlash(error.response.data.infor.message);
      console.error("Error:", error.response);
    },
  });

  useEffect(() => {
    setIsFormValid(areAllInputsValid());
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
      login({
        email: loginState.email,
        password: loginState.password,
      });
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
              disabled={isPending}
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
