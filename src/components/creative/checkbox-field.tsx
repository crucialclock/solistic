import React, { forwardRef, useId } from "react"

interface CheckboxFieldProps extends React.ComponentProps<"input"> {
  label: string
}

export const CheckboxField = forwardRef<HTMLInputElement, CheckboxFieldProps>(
  ({ label, id, className, ...props }, ref) => {
    const generatedId = useId()
    const inputId = id ?? generatedId

    return (
      <label
        htmlFor={inputId}
        className="border-foreground/10 hover:bg-foreground/5 flex h-14 w-full cursor-pointer items-center gap-3 rounded-none border bg-transparent px-4 text-base transition-colors hover:border-2"
      >
        <input
          id={inputId}
          type="checkbox"
          ref={ref}
          {...props}
          className={`accent-foreground h-4 w-4 shrink-0 cursor-pointer ${className ?? ""}`}
        />

        <span className="text-foreground truncate text-sm font-medium select-none">
          {label}
        </span>
      </label>
    )
  }
)

CheckboxField.displayName = "CheckboxField"
