import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title?: string; // Title of the button
  variant?: 'primary' | 'secondary' | 'danger'; // Button variant
  loading?: boolean; // Indicates if the button is in a loading state
}

const Button: React.FC<ButtonProps> = ({ title, variant = 'primary', loading = false, disabled = false, onClick, ...props }) => {
  // Define Tailwind CSS classes based on the variant prop
  let buttonClasses = 'px-4 py-2 rounded font-semibold focus:outline-none ';

  if (variant === 'primary') {
    buttonClasses += 'bg-blue-500 hover:bg-blue-600 text-white';
  } else if (variant === 'secondary') {
    buttonClasses += 'bg-gray-400 hover:bg-gray-500 text-gray-800';
  } else if (variant === 'danger') {
    buttonClasses += 'bg-red-500 hover:bg-red-600 text-white';
  }

  return (
    <button className={buttonClasses} onClick={onClick} disabled={disabled || loading} {...props}>
      {loading ? 'Loading...' : title}
      {props.children}
    </button>
  );
};

export default Button;
