export default function LabelSelect({
  label,
  name,
  value,
  onChange,
  onBlur,
  touched,
  error,
  options,
  placeholder,
  disabled,
  ...rest
}) {
  const handleChange = (e) => {
    const val = e.target.value;
    const numericValue = val === '' ? '' : Number(val);
    onChange({ target: { name, value: isNaN(numericValue) ? val : numericValue } });
  };

  return (
    <div className="mb-3">
      <label htmlFor={name} className="block text-sm/6 font-medium text-gray-900 dark:text-white">
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        onBlur={onBlur}
        disabled={disabled}
        className='rounded bg-white p-1 text-gray-900 outline-1 outline-gray-300
          focus:outline-blue-600 w-full dark:bg-gray-800 
          dark:text-white disabled:opacity-50 disabled:cursor-not-allowed'
        {...rest}
      >
        <option value="">{placeholder}</option>
        {options?.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
      {touched && error && (
        <p className="text-red-600 text-sm mt-1">{error}</p>
      )}
    </div>
  );
}