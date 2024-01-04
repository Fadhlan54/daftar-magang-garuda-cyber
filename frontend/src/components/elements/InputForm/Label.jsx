const Label = ({ name, placeholder }) => {
  return (
    <label
      htmlFor={name}
      className="block text-slate-700 text-sm font-bold mb-2"
    >
      {placeholder}
    </label>
  );
};

export default Label;
