import React from 'react'
import { Control, RegisterOptions, useController } from 'react-hook-form'
import './MyInput.scss'

interface IInput {
  type?: string
  placeholder?: string
  required?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control?: Control<any>
  fullWidth?: boolean
  label?: string
  className?: string
  name: string
  icon?: JSX.Element
  visible?: boolean
  error?: string
  rules?: RegisterOptions
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  phoneInput?: boolean 
}

const MyInput: React.FC<IInput> = ({
  name,
  control,
  label,
  fullWidth,
  className,
  placeholder,
  required,
  type,
  visible,
  error,
  rules, 
  value, 
  onChange, 
  icon,
  phoneInput = false 
}) => {
  const {
    field,
    fieldState: { error: fieldError },
  } = useController({
    name,
    control,
    rules: {
      required: required ? { value: true, message: required } : false,
      ...rules,
    },
  })

  // Функция для форматирования телефона
  const formatPhoneNumber = (value: string) => {
    const digits = value.replace(/\D/g, '')
    return digits.length > 10
      ? `+7${digits.slice(1, 4)}${digits.slice(4, 7)}${digits.slice(7, 9)}${digits.slice(9, 11)}`
      : `+7${digits.slice(1, 4)}${digits.slice(4, 7)}${digits.slice(7, 9)}${digits.slice(9)}`
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = phoneInput ? formatPhoneNumber(e.target.value) : e.target.value
    field.onChange(newValue)
    if (onChange) onChange(e)
  }

  return (
    <>
      {label && (
        <label htmlFor={name} className='label'>
          {label}
        </label>
      )}
      <div className={`${fullWidth ? 'w-full' : 'w-72'}`}>
        <input
          className={`outline-none bg-transparent border-[1px] px-4 py-2 rounded-xl border-slate-400 ${className} ${
            fullWidth ? 'w-full' : 'w-72'
          }
          focus:${fieldError && 'border-red-700 bg-red-800 placeholder:text-red-400'}`}
          id={name}
          type={visible ? 'text' : type}
          placeholder={placeholder}
          value={value || field.value}
          name={field.name}
          onChange={handleChange}
          onBlur={field.onBlur}
        />
        {icon && (
          <span className=''>{icon}</span>
        )}
        {(fieldError || error) && (
          <p className='text-red-600 text-sm m-1'>
            {fieldError?.message || error}
          </p>
        )}
      </div>
    </>
  )
}

export default MyInput
