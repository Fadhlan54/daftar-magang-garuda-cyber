import { forwardRef } from "react";

const Input = forwardRef(({ type, name, placeholder }, ref) => {
  return (
    <input
      type={type}
      name={name}
      id={name}
      className="text-sm border rounded w-full py-2 px-3 text-slate-700"
      placeholder={`Masukkan ${placeholder}`}
      ref={ref}
    />
  );
});

Input.displayName = "Input";

export default Input;
