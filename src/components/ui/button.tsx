//setup button component

import React from "react";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

// Move buttonVariants to a shared location
export const buttonVariants = {
    primary: "bg-blue-500 text-white",
    secondary: "bg-gray-500 text-white",
    default: "bg-gray-200 text-black",
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    variant?: keyof typeof buttonVariants;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", ...props }, ref) => {
        const { toast } = useToast();

        const handleClick = () => {
            toast({
                title: "Button Clicked",
                description: "You have clicked the button.",
                message: "Button Clicked", // Ensure 'message' is passed as required
                variant: variant,
            });
        };

        return (
            <button
                className={cn(buttonVariants[variant as keyof typeof buttonVariants] || buttonVariants.default, className || "")} // Ensure className is always a string
                onClick={handleClick}
                {...props}
            />
        );
    }
);
export default Button;
