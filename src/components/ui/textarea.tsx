import React from 'react';
import { cn } from "@/lib/utils";

import { TextareaHTMLAttributes, forwardRef } from "react";

const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
    function Textarea({ className, ...props }, ref) {
        return (
            <textarea
                ref={ref}
                className={cn("resize-none", className || "")}
                {...props}
            />
        );
    }
);

Textarea.displayName = "text";
export default Textarea;
