export default function LabelRadio({
  label,
  name,
  options,
  value,
  onChange,
  onBlur,
  touched,
  error,
  disabled,
}) {
  return (
    <div className="mb-3">
      <label className="block text-sm/6 font-medium text-gray-900 mb-2 dark:text-white">
        {label}
      </label>
      <div className="flex gap-4">
        {options.map((option) => (
          <label key={option.value} className="flex items-center">
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(name, option.value)}
              onBlur={onBlur}
              disabled={disabled}
              className="mr-2 disabled:opacity-50 disabled:cursor-not-allowed"
            />
            {option.label}
          </label>
        ))}
      </div>
      {touched && error && (
        <p className="text-red-600 text-sm mt-1">{error}</p>
      )}
    </div>
  );
}