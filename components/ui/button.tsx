import * as React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", ...props }, ref) => (
    <button
      ref={ref}
      className={
        "inline-flex items-center justify-center rounded-lg px-5 py-2 font-semibold bg-primary text-primary-foreground hover:bg-blue-600 transition duration-200 shadow-md hover:shadow-lg active:scale-95 text-base " +
        className
      }
      {...props}
    />
  )
);
Button.displayName = "Button";