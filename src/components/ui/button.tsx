//setup button component

import React from "react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Button = React.forwardRef(
    ({ className, variant, ...props }, ref) => {
        const { toast } = useToast();

        const handleClick = () => {
            toast({
                title: "Button Clicked",
                description: "You have clicked the button.",
                variant: variant,
            });
        };

        return (
            <button
                ref={ref}
                className={cn(buttonVariants[variant], className)}
                onClick={handleClick}
                {...props}
            />
        );
    }
);