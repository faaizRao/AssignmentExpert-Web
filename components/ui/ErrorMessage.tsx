interface ErrorMessageProps {
  message: string;
  className?: string;
}

export default function ErrorMessage({ 
  message, 
  className = '' 
}: ErrorMessageProps) {
  if (!message) return null;
  
  return (
    <div 
      className={`flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg ${className}`}
      role="alert"
      aria-live="assertive"
    >
      <svg
        className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
          clipRule="evenodd"
        />
      </svg>
      <p className="text-sm text-red-700 font-medium">
        {message}
      </p>
    </div>
  );
}
