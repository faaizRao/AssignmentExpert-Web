import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: React.ReactNode;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  className = '',
  children,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md';
  
  const variantStyles = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500 active:bg-primary-800 border-2 border-primary-700 hover:border-primary-800 hover:shadow-lg font-semibold',
    secondary: 'bg-secondary-600 text-white hover:bg-secondary-700 focus:ring-secondary-600 active:bg-secondary-800 border-2 border-secondary-700 hover:border-secondary-800 hover:shadow-lg font-semibold',
    outline: 'border-2 border-primary-600 text-primary-700 hover:bg-primary-50 focus:ring-primary-500 active:bg-primary-100 hover:border-primary-700 hover:shadow-lg font-semibold',
    ghost: 'text-primary-700 hover:bg-primary-50 focus:ring-primary-500 active:bg-primary-100 border-2 border-transparent hover:border-primary-200 hover:shadow-md font-semibold',
  };
  
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };
  
  const hoverAnimation = !disabled && !loading ? 'hover:scale-105 active:scale-95' : '';
  
  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${hoverAnimation} ${className}`;
  
  return (
    <button
      className={combinedClassName}
      disabled={disabled || loading}
      aria-disabled={disabled || loading}
      aria-busy={loading}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  );
}
