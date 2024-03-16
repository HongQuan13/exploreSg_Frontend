import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormAction from "../../components/access/formAction";
import NavBar from "../../components/partials/navBar";
import { profileFields } from "../../components/profile/formFields";
import FormInput from "../../components/profile/formInput";
import ProfileOption from "../../components/partials/profileOption";

interface FormState {
  [key: string]: any;
}

interface User {
  id: string;
  username: string;
  email: string;
}

const fields = profileFields;
let fieldsState: FormState = {};
fields.forEach((field) => (fieldsState[field.id] = ""));

const UserDetail = () => {
  const [formState, setFormState] = useState<FormState>(fieldsState);
  const [user, setUser] = useState<User>({
    id: "",
    username: "",
    email: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getUser = async () => {
    try {
      const respponse = await axios.post(
        `http://localhost:${process.env.REACT_APP_BACKEND_PORT}/v1/api/access/currentUser`,
        null,
        {
          withCredentials: true,
        }
      );
      const { authenticated, userData } = respponse.data;
      console.log(authenticated, userData);
      if (authenticated) {
        setUser(userData);
        setFormState(userData);
      }
    } catch (error: any) {
      console.log(error.response);
    }
  };
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
                <h2 className="text-xl font-bold mb-4">My Profile</h2>
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
                    text="Update Profile"
                    customClass="group-invalid:pointer-events-none group-invalid:opacity-30"
                    disabled={isSubmitting}
                  />
                </form>

                {/* <h2 className="text-xl font-bold mt-6 mb-4">Experience</h2>
                <div className="mb-6">
                  <div className="flex justify-between flex-wrap gap-2 w-full">
                    <span className="text-gray-700 font-bold">
                      Web Developer
                    </span>
                    <p>
                      <span className="text-gray-700 mr-2">at ABC Company</span>
                      <span className="text-gray-700">2017 - 2019</span>
                    </p>
                  </div>
                  <p className="mt-2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    finibus est vitae tortor ullamcorper, ut vestibulum velit
                    convallis. Aenean posuere risus non velit egestas suscipit.
                  </p>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default UserDetail;
