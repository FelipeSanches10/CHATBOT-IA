import * as React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", ...props }, ref) => (
    <input
      ref={ref}
      className={
        "rounded-lg border border-input px-4 py-2 bg-white dark:bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition duration-200 text-base " +
        className
      }
      {...props}
    />
  )
);
Input.displayName = "Input";