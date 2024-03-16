const campgroundFields = [
  {
    name: "title",
    id: "place_title",
    isRequired: true,
    placeholder: "Enter title",
    type: "text",
    labelText: "Title",
  },
  {
    name: "location",
    id: "place_location",
    isRequired: true,
    placeholder: "Enter location",
    type: "text",
    labelText: "Location",
  },
  {
    name: "price",
    id: "place_price",
    isRequired: true,
    placeholder: "0.00",
    type: "number",
    labelText: "Price per Person",
    errorMessage: "This should be a valid number",
    pattern: "^(0|[1-9][0-9]*)$",
  },
  {
    name: "description",
    id: "place_description",
    isRequired: false,
    placeholder: "Enter description",
    type: "textarea",
    labelText: "Description",
  },
  {
    name: "images",
    id: "place_images",
    isRequired: true,
    type: "file",
    placeholder: "Image File",
    labelText: "Image Upload",
  },
];

export { campgroundFields };
