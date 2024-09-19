import React from 'react'
import { Control, useController } from 'react-hook-form'


interface ISelect {
  name: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>
  options: { value: string; label: string }[]
  placeholder?: string
  fullWidth?: boolean
  label?: string
  className?: string
  required?: string 
  error?: string
}

const MySelect: React.FC<ISelect> = ({
  name,
  control,
  options,
  placeholder,
  fullWidth,
  label,
  className,
  required,
  error,
}) => {
  const {
    field,
    fieldState: { error: fieldError },
  } = useController({
    name,
    control,
    rules: { required: required ? { value: true, message: required } : false },
  })

  return (
    <div className={`my-select ${fullWidth ? 'w-full' : ''}`}>
      {label && <label htmlFor={name} className='label'>{label}</label>}
      <select
        id={name}
        {...field}
        className={`outline-none bg-transparent border-[1px] px-4 py-2 rounded-xl border-slate-400 ${className} ${fullWidth ? 'w-full' : ''} ${
          fieldError && 'border-red-700'
        }`}
      >
        <option value='' disabled selected>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {(fieldError || error) && (
        <p className='text-red-600 text-sm m-1'>
          {fieldError?.message || error}
        </p>
      )}
    </div>
  )
}

export default MySelect
