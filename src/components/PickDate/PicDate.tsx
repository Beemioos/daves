import React from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { CiCalendarDate } from 'react-icons/ci'
import { Controller } from 'react-hook-form'

interface MyDatePickerProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any
  name: string
  className?: string
  minDate?: Date | undefined
  maxDate?: Date | undefined
  placeholder?: string
  required?: string
}

const MyDatePicker: React.FC<MyDatePickerProps> = ({
  control,
  className,
  name,
  placeholder,
  required,
  maxDate,
  minDate,
}) => {
  return (
    <div className='relative flex items-center'>
      <Controller
        control={control}
        name={name}
        rules={{ required }}
        render={({ field, fieldState: { error } }) => (
          <div className='relative w-full'>
            <DatePicker
              className={`relative cursor-pointer rounded-xl px-4 py-2 w-full
                bg-transparent border-[1px] pl-10 h-10
                ${error ? 'border-red-800' : 'border-gray-300'}`}
              placeholderText={placeholder}
              selected={field.value ? new Date(field.value) : null}
              onChange={date => field.onChange(date)}
              dateFormat='dd.MM.yyyy'
              minDate={minDate}
              maxDate={maxDate}
			  
              showPopperArrow={false}
              withPortal
            />
            {error && (
              <span className={`absolute text-red-600 text-sm top-full mt-1 ${className}`}>
                {error.message}
              </span>
            )}
          </div>
        )}
      />
      <CiCalendarDate 
        size={25} 
        className='absolute left-3 text-gray-400 pointer-events-none' 
      />
    </div>
  )
}

export default MyDatePicker
