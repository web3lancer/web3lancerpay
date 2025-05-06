import React from "react";

import { cn } from "@/lib/utils";

import { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { VariantProps, cva } from "class-variance-authority";

const inputVariants = cva(
  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background transition-all placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-slate-300",
        error: "border-red-500",
        success: "border-green-500",
      },
      size: {
        default: "h-10 px-3 py-2",
        sm: "h-9 px-2 text-sm",
        lg: "h-11 px-4 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  asChild?: boolean;
  variant?: "default" | "error" | "success";
  inputSize?: "default" | "sm" | "lg";
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, inputSize, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "input";
    return (
      <Comp
        className={cn(inputVariants({ variant, size: inputSize, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

// export input component
Input.displayName = "Input";
export { Input, inputVariants };
// Removed redundant export of InputProps
export default Input;