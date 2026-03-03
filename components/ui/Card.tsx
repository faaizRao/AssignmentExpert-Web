import React from 'react';
import Link from 'next/link';

interface CardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  link?: string;
  hoverEffect?: boolean;
  className?: string;
}

export default function Card({
  title,
  description,
  icon,
  link,
  hoverEffect = true,
  className = '',
}: CardProps) {
  const baseStyles = 'bg-white rounded-lg shadow-soft border border-neutral-200 p-6 transition-all duration-200';
  const hoverStyles = hoverEffect ? 'hover:shadow-hover hover:-translate-y-1' : '';
  const combinedClassName = `${baseStyles} ${hoverStyles} ${className}`;
  
  const content = (
    <>
      {icon && (
        <div className="mb-4 text-primary-500 flex items-center justify-center w-12 h-12">
          {icon}
        </div>
      )}
      <h3 className="text-xl font-heading font-semibold text-neutral-800 mb-2">
        {title}
      </h3>
      <p className="text-base text-neutral-600 leading-relaxed">
        {description}
      </p>
    </>
  );
  
  if (link) {
    return (
      <Link 
        href={link} 
        className={`${combinedClassName} block`}
        aria-label={`Learn more about ${title}`}
      >
        {content}
      </Link>
    );
  }
  
  return (
    <article className={combinedClassName}>
      {content}
    </article>
  );
}
