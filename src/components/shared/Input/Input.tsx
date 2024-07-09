import React from 'react';
import TextField from '@mui/material/TextField';

/**
 * Props for the Input component.
 */
interface Input {
  /**
   * The value of the input.
   */
  value: string;
  /**
   * The change event handler for the input.
   */
  onChange: (value: string) => void;
  /**
   * The label for the input.
   */
  label?: string;
  /**
   * The placeholder text for the input.
   */
  placeholder?: string;
  /**
   * Whether the input is disabled.
   */
  disabled?: boolean;
  /**
   * Whether the input is required.
   */
  required?: boolean;
  /**
   * The error state of the input.
   */
  error?: boolean;
  /**
   * The helper text to display below the input.
   */
  helperText?: string;
  /**
   * The type of the input.
   */
  type?: string;
  /**
   * Whether the input should take up the full width.
   */
  fullWidth?: boolean;
  /**
   * The size of the input.
   */
  size?: 'small' | 'medium';
  /**
   * Additional CSS class name.
   */
  className?: string;
  /**
   * The variant of the input.
   */
  variant?: 'outlined' | 'filled' | 'standard';
  /**
   * Whether the input should hide the text being entered.
   */
  secureTextEntry?: boolean;
}

/**
 * A customizable input component.
 *
 * @param props - The props for the Input component.
 * @returns The rendered Input component.
 */
const Input: React.FC<Input> = ({
  value,
  onChange,
  label,
  placeholder,
  disabled = false,
  required = false,
  error = false,
  helperText,
  type = 'text',
  fullWidth = true,
  size = 'medium',
  className,
  variant = 'outlined',
  secureTextEntry = false,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  // If secureTextEntry is true, override the type to 'password'
  const inputType = secureTextEntry ? 'password' : type;

  return (
    <TextField
      value={value}
      onChange={handleChange}
      label={label}
      placeholder={placeholder}
      disabled={disabled}
      required={required}
      error={error}
      helperText={helperText}
      type={inputType}
      fullWidth={fullWidth}
      size={size}
      className={className}
      variant={variant}
    />
  );
};

export default Input;