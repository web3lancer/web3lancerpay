import React from 'react';
import { cn } from "@/lib/utils";

// we will create the select component 
// other components might import this current component as import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "@radix-ui/react-select";
import { SelectProps as RadixSelectProps } from "@radix-ui/react-select";

interface SelectProps extends RadixSelectProps {
    className?: string;
}
import { forwardRef } from "react";
import { Select } from "@radix-ui/react-select";

//define the select component

const SelectComponent = forwardRef<HTMLSelectElement, SelectProps>(
    function SelectComponent({ className, ...props }, ref) {
        return (
            <div className={cn("w-full", className || "")}>
                <Select {...props} />
            </div>
        );
    }
);

SelectComponent.displayName = "Select";
export { SelectComponent as Select, SelectContent, SelectItem, SelectTrigger, SelectValue };






