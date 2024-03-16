import React from "react";

const fixedClass =
  "border border-gray-300 rounded-md w-full py-2 px-3 focus:outline-none focus:border-indigo-500 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer";

function FormInput({
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
              pattern={pattern}
            />
            <span className="p-1 text-xs text-red-500 hidden peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
              {errorMessage}
            </span>
          </>
        ) : (
          <div className="flex items-center">
            <input
              type={type}
              id={id}
              name={name}
              multiple
              required
              accept=".jpg,.jpeg,.png"
              className={fixedClass + customClass}
              onChange={handleChange}
            />
            <div className="ml-4 space-y-4">
              {value && value.length > 0 && (
                <ul className="list-disc pl-4">
                  {value.map((file: any, index: number) => (
                    <li
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <span className="text-gray-700">{file.name}</span>
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => removeFile(index)}
                      >
                        Remove
                      </button>
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
    </div>
  );
}

export default FormInput;
