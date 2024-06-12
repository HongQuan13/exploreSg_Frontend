import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormAction from "../../components/access/formAction";
import NavBar from "../../components/partials/navBar";
import { passwordFields } from "../../components/profile/formFields";
import FormInput from "../../components/profile/formInput";
import ProfileOption from "../../components/partials/profileOption";
import { useAuthContext } from "../../context/authContext";

interface FormState {
  [key: string]: any;
}

interface User {
  id: string;
  username: string;
  email: string;
}

const fields = passwordFields;
let fieldsState: FormState = {};
fields.forEach((field) => (fieldsState[field.id] = ""));

const PasswordChange = () => {
  const [formState, setFormState] = useState<FormState>(fieldsState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const user = useAuthContext();

  const handleChange = (e: any) => {
    setFormState({ ...formState, [e.target.id]: e.target.value });
  };
  const handleSubmit = () => {};

  return (
    <>
      <NavBar />
      <div className="bg-gray-100">
        <div className="container mx-auto py-8">
          <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
            <div className="col-span-4 sm:col-span-3">
              <div className="bg-white shadow rounded-lg p-6">
                <ProfileOption user={user} />
              </div>
            </div>
            <div className="col-span-4 sm:col-span-9">
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">Password Change</h2>
                <hr className="my-6 border-t border-gray-300" />

                <form className="group">
                  {fields.map((field) => (
                    <FormInput
                      key={field.id}
                      handleChange={handleChange}
                      name={field.name}
                      value={formState ? formState[field.id] : ""}
                      placeHolder={field.placeholder}
                      type={field.type}
                      id={field.id}
                      labelText={field.labelText}
                      errorMessage={field.errorMessage}
                      pattern={field.pattern}
                    />
                  ))}
                  <FormAction
                    handleSubmit={handleSubmit}
                    text="Update Password"
                    customClass="group-invalid:pointer-events-none group-invalid:opacity-30"
                    disabled={isSubmitting}
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default PasswordChange;
