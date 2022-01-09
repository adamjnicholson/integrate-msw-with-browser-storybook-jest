import React from "react"

type InputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export function Input({ className = "", ...props }: InputProps) {
    return (
        <input {...props} className={`block w-full px-4 py-2 rounded-md ${className}`} />
    )
}

type TextareaProps = React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>

export function Textarea({ className = "", ...props }: TextareaProps) {
    return (
        <textarea {...props} className={`block w-full px-4 py-2 rounded-md ${className}`} />
    )
}

type LabelProps = React.DetailedHTMLProps<React.LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>

export function Label({ className = "", ...props }: LabelProps) {
    return (
        <label {...props} className={`block font-semibold ${className}`} />
    )
}

type InputGroupProps = {
    label: string,
    children: JSX.Element
}

export function InputGroup({ label, children }: InputGroupProps) {
    return (
        <Label>
            <span className="block pb-2">
                {label}
            </span>
            {children}
        </Label>
    )
}

type FormProps = React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>
export function Form({ className = "", ...props }: FormProps) {
    return (
        <form {...props} className={`space-y-4 ${className}`} />
    )
}

