export default function LabelInput({
  label,
  name,
  value,
  onChange,
  onBlur,
  type,
  placeholder,
  touched,
  error,
  disabled,
  ...rest
}) {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="block text-sm/6 font-medium text-gray-900 dark:text-white"> {/* ✅ dark mode */}
        {label}
      </label>
      <input
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        {...rest}
        className='rounded bg-white dark:bg-gray-800 p-1 text-gray-900 dark:text-white placeholder:text-gray-400 
          outline-1 outline-gray-300 focus:outline-blue-600 w-full 
          disabled:opacity-50 disabled:cursor-not-allowed'
      />
      {touched && error && (
        <p className="text-red-600 text-sm mt-1" data-cy="label_input_error">{error}</p>
      )}
    </div>
  );
}