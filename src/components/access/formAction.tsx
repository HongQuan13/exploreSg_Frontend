const fixedClass =
  "group relative mt-10 bg-gray-700 text-white py-2 px-4 rounded-md w-full";
const FormAction = ({
  handleSubmit,
  type = "Button",
  action = "submit",
  text,
  customClass,
  disabled,
}: {
  handleSubmit: any;
  type?: string;
  action?: "submit" | "reset" | "button";
  text: string;
  customClass?: string;
  disabled?: boolean;
}) => {
  return (
    <>
      {type === "Button" ? (
        <button
          type={action}
          className={customClass + fixedClass}
          onClick={handleSubmit}
          disabled={disabled}
        >
          {text}
        </button>
      ) : (
        <></>
      )}
    </>
  );
};
export default FormAction;
