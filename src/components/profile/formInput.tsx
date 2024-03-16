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
  errorMessage?: string;
  pattern?: string;
}) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block mb-1">
        {labelText}
      </label>
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
    </div>
  );
}

export default FormInput;
