import React, { ReactNode } from 'react';
import cl from './Button.module.scss';

const Button = ({ children, className, ...props }: React.HTMLAttributes<HTMLButtonElement>) => {
  if (className) {
    const receivedClasses = className.split(' ');
    className = receivedClasses.map((name) => (cl[name] ? cl[name] : name)).join(' ');
  }

  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
};

export default Button;
