import React, { useEffect, useRef, useState } from "react";
import FormAction from "../../components/access/formAction";
import { campgroundFields } from "../../components/places/formFields";
import FormInput from "../../components/places/formInput";
import NavBar from "../../components/partials/navBar";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { errorFlash, sucessFlash } from "../../core/response";

interface FieldsState {
  [key: string]: any;
}
interface User {
  id: string;
  username: string;
  email: string;
}
const fields = campgroundFields;
let fieldsState: FieldsState = {};
fields.forEach((field) => {
  if (field.id === "place_images") {
    fieldsState[field.id] = [];
  } else {
    fieldsState[field.id] = "";
  }
});

function NewPlaceForm() {
  const [formState, setFormState] = useState(fieldsState);
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [user, setUser] = useState<User>(
    {
      id: "",
      username: "",
      email: "",
    } || null
  );
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user-info") || ""));
  }, []);

  useEffect(() => {
    setIsFormValid(areAllInputsValid());
    console.log(isFormValid);
  }, [formState]);

  const areAllInputsValid = () => {
    for (const [name, value] of Object.entries(formState)) {
      const field = fields.find((f) => f.id === name);
      if (field?.isRequired && value === "") return false;
      if (name === "place_images" && value.length === 0) {
        return false;
      }
      if (field?.pattern && !new RegExp(field?.pattern).test(value)) {
        return false;
      }
    }
    return true;
  };

  const handleChange = (e: any) => {
    setFormState((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
    console.log(formState);
  };
  const handleFileChange = (e: any) => {
    const files = Array.from(e.target.files);
    setFormState((prevState) => ({
      ...prevState,
      place_images: [...prevState.place_images, ...files],
    }));
    console.log(formState);
  };
  const removeFile = (index: any) => {
    setFormState((prevState) => ({
      ...prevState,
      place_images: prevState.place_images.filter(
        (file: any, i: any) => i !== index
      ),
    }));
  };
  const hanldeSubmit = async (event: any) => {
    event.preventDefault();
    if (isFormValid && user) {
      console.log(formState, "formState");
      setIsSubmitting(true);
      const formData = new FormData();
      formState.place_images.forEach((file: any) => {
        formData.append("place_images", file);
      });

      // Append other form fields
      Object.keys(formState).forEach((id) => {
        if (id !== "place_images") {
          formData.append(id, formState[id]);
        }
      });
      formData.append("place_authorId", user.id);
      console.log("before send the request ");
      try {
        const formResponse = await axios.post(
          `http://localhost:${process.env.REACT_APP_BACKEND_PORT}/v1/api/place/new`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
          }
        );
        console.log("Add new place success", formResponse.data);
        sucessFlash("Add new place successfully");
        navigate(`/place/detail/${formResponse.data.metadata._id}`);
        setIsSubmitting(false);
      } catch (error: any) {
        errorFlash(error.response.data.message);
        setIsSubmitting(false);
        console.error("Error:", error.response.data);
      }
    }
  };
  return (
    <>
      <NavBar />
      <div className="container mx-auto px-4">
        <h1 className="text-center text-3xl font-bold my-6">New Place</h1>
        <div className="md:w-1/2 mx-auto">
          <form className="group">
            {fields.map((field) => (
              <FormInput
                key={field.id}
                handleChange={
                  field.id === "place_images" ? handleFileChange : handleChange
                }
                name={field.name}
                value={formState[field.id]}
                placeHolder={field.placeholder}
                type={field.type}
                id={field.id}
                labelText={field.labelText}
                removeFile={removeFile}
                errorMessage={field.errorMessage}
                pattern={field.pattern}
              />
            ))}
            <FormAction
              handleSubmit={hanldeSubmit}
              text="Add New Place"
              customClass="group-invalid:pointer-events-none group-invalid:opacity-30"
              disabled={isSubmitting}
            />
          </form>
        </div>
      </div>
    </>
  );
}

export default NewPlaceForm;
