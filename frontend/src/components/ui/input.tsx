// src/components/ui/input.tsx
import * as React from "react";
import { cn } from "@/lib/utils"; // assuming you're using a classnames utility

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn("w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-primary", className)}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
