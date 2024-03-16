import React from "react";

const fixedClass =
  "border border-gray-300 rounded-md w-full py-2 px-3 focus:outline-none focus:border-indigo-500 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer";

function EditFormInput({
  handleChange,
  name,
  value,
  placeHolder,
  type,
  isRequired = false,
  customClass = "",
  id,
  labelText,
  removeFile,
  errorMessage,
  pattern,
}: {
  handleChange: any;
  name: string;
  value: any;
  placeHolder: string;
  type: string;
  isRequired?: boolean;
  customClass?: string;
  id: string;
  labelText: string;
  removeFile?: any;
  errorMessage?: string;
  pattern?: string;
}) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block mb-1">
        {labelText}
      </label>
      {type !== "textarea" ? (
        type !== "file" ? (
          <>
            <input
              type={type}
              id={id}
              name={name}
              value={value}
              placeholder={placeHolder}
              required
              className={fixedClass + customClass}
              onChange={handleChange}
            />
            <span className="p-1 text-xs text-red-500 hidden peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
              {errorMessage}
            </span>
          </>
        ) : (
          <div className="flex flex-col items-center">
            <input
              type={type}
              id={id}
              name={name}
              multiple
              accept=".jpg,.jpeg,.png"
              className={fixedClass + customClass}
              onChange={handleChange}
            />
            <div className="ml-4 space-y-4">
              {value && value.length > 0 && (
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {value.map((file: any, index: number) => (
                    <li key={index} className="relative">
                      <>
                        {" "}
                        {/* Wrap conditional content in a fragment */}
                        {file.img_url ? (
                          <img
                            src={file.img_url}
                            alt=""
                            className="rounded-md max-w-full h-40 object-cover"
                          />
                        ) : (
                          <span className="block">{file.name}</span>
                        )}
                        <button
                          className="absolute top-0 right-0 mt-3 mr-3 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md"
                          onClick={() => removeFile(index)}
                        >
                          Remove
                        </button>
                      </>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )
      ) : (
        <textarea
          id={id}
          name={name}
          value={value}
          placeholder={placeHolder}
          className={fixedClass + customClass}
          onChange={handleChange}
        ></textarea>
      )}
      {/* <div className="text-xs text-green-500 mt-1">Looks good!</div> */}
    </div>
  );
}

export default EditFormInput;
