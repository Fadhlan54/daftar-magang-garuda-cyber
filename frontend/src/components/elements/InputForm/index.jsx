import Label from "./label";
import Input from "./input";
import { forwardRef } from "react";

const InputForm = forwardRef(({ type, name, placeholder }, ref) => {
  return (
    <div className="mb-6">
      <Label name={name} placeholder={placeholder} type={type} />
      <Input name={name} placeholder={placeholder} type={type} ref={ref} />
    </div>
  );
});

InputForm.displayName = "InputForm";

export default InputForm;
