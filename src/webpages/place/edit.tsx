import React, { useEffect, useState } from "react";
import FormAction from "../../components/access/formAction";
import { campgroundFields } from "../../components/places/formFields";
import FormInput from "../../components/places/formInput";
import NavBar from "../../components/partials/navBar";
import axios from "axios";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import EditFormInput from "../../components/places/editFormInput";
import { errorFlash, sucessFlash } from "../../core/response";

const fields = campgroundFields;
interface FormState {
  [key: string]: any;
}
function UpdatePlaceForm() {
  const [formState, setFormState] = useState<FormState>({
    place_description: "",
    place_images: [],
    place_location: "",
    place_price: "",
    place_title: "",
  });
  const [oldImages, setOldImages] = useState<any>([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    detailAPI();
  }, [id]);

  useEffect(() => {
    setIsFormValid(areAllInputsValid());
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

  const removeFile = (index: any) => {
    setFormState((prevState) => ({
      ...prevState,
      place_images: prevState.place_images.filter(
        (file: any, i: any) => i !== index
      ),
    }));
  };
  async function detailAPI() {
    try {
      const detailItem = await axios.post(
        `http://localhost:${process.env.REACT_APP_BACKEND_PORT}/v1/api/place/detail/${id}`,
        null,

        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          withCredentials: true,
        }
      );
      setFormState(detailItem.data.metadata);
      setOldImages(detailItem.data.metadata.place_images);
    } catch (error: any) {
      console.error("Error:", error.stack);
    }
  }

  const handleChange = (e: any) => {
    setFormState((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  const handleFileChange = (e: any) => {
    const files = Array.from(e.target.files);
    setFormState((prevState) => ({
      ...prevState,
      place_images: [...prevState.place_images, ...files],
    }));
  };
  const hanldeSubmit = async (event: any) => {
    event.preventDefault();
    if (isFormValid) {
      setIsSubmitting(true);
      const formData = new FormData();
      let deletedImages = [];

      for (const oldImage of oldImages) {
        if (!formState.place_images.includes(oldImage)) {
          deletedImages.push(oldImage._id);
        }
      }

      await deletedImages.forEach((deletedImage) => {
        formData.append("delete_images[]", deletedImage);
      });

      formState.place_images.forEach((file: any) => {
        if (file instanceof File) {
          formData.append("place_images", file);
        }
      });

      // Append other form fields
      Object.keys(formState).forEach((id) => {
        if (id !== "place_images") {
          formData.append(id, formState[id]);
        }
      });
      formData.append("place_authorId", formState["place_title"]);
      console.log("before send the request ");
      try {
        const formResponse = await axios.patch(
          `http://localhost:${process.env.REACT_APP_BACKEND_PORT}/v1/api/place/update/${id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
          }
        );
        console.log("Update place success", formResponse.data);
        sucessFlash("Update place successfully");
        navigate(`/place/detail/${id}`);
        setIsSubmitting(false);
      } catch (error: any) {
        setIsSubmitting(false);
        errorFlash(error.response);
        console.error("Error:", error.resonse.stack);
      }
    }
  };

  return (
    <>
      <NavBar />
      <div className="container mx-auto px-4">
        <h1 className="text-center text-3xl font-bold my-6">
          Update Campground
        </h1>
        <div className="md:w-1/2 mx-auto">
          <form className="group">
            {fields.map((field) => (
              <EditFormInput
                key={field.id}
                handleChange={
                  field.id === "place_images" ? handleFileChange : handleChange
                }
                name={field.name}
                value={formState ? formState[field.id] : ""}
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
              text="Update Place"
              customClass="group-invalid:pointer-events-none group-invalid:opacity-30"
              disabled={isSubmitting}
            />
          </form>
        </div>
      </div>
    </>
  );
}

export default UpdatePlaceForm;
