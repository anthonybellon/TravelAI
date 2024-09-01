import * as React from 'react';

import { cn } from 'src/utils/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full border  border-[#d3c4a8] bg-[#f8f4e3] px-3 py-2 font-serif text-sm text-[#5e4d36] shadow-inner placeholder:text-[#a59d85] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b5a489] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = 'Input';

export { Input };
