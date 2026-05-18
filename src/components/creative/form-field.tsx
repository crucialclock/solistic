import React, { forwardRef } from "react"
import { Input } from "@/components/ui/input"

interface FormFieldProps extends React.ComponentProps<typeof Input> {
  label: string
  error?: string
}

export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="flex w-full flex-col gap-2">
        <label className="text-muted-foreground/70 text-xs font-bold tracking-widest uppercase">
          {label}
        </label>

        <Input
          ref={ref}
          {...props}
          className={`border-foreground/10 focus-visible:border-foreground h-14 rounded-none border bg-transparent px-4 text-base focus-visible:ring-0 ${className ?? ""}`}
        />

        {error && (
          <span className="mt-0.5 text-xs font-semibold text-red-500">
            {error}
          </span>
        )}
      </div>
    )
  }
)

FormField.displayName = "FormField"
