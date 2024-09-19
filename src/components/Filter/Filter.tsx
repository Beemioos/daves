import React from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { CiCalendarDate } from 'react-icons/ci'
import FilterInput from '../FilterInput/FilterInput'

interface Props {
  passportFilter: string
  className?: string
  setPassportFilter: (value: string) => void
  phoneFilter: string
  setPhoneFilter: (value: string) => void
  addressFilter: string
  setAddressFilter: (value: string) => void
  dateDeliveryFilter: Date | null
  setDateDeliveryFilter: (date: Date | null) => void
  dateReceiptFilter: Date | null
  setDateReceiptFilter: (date: Date | null) => void
  dateTransferFilter: Date | null
  setDateTransferFilter: (date: Date | null) => void
  statusFilter: string
  classInp?:string
  setStatusFilter: (value: string) => void
}

const Filter: React.FC<Props> = ({
  passportFilter,
  setPassportFilter,
  phoneFilter,
  setPhoneFilter,
  addressFilter,
  setAddressFilter,
  dateDeliveryFilter,
  setDateDeliveryFilter,
  dateReceiptFilter,
  setDateReceiptFilter,
  dateTransferFilter,
  setDateTransferFilter,
  statusFilter,
  className,
  classInp,
  setStatusFilter,
}) => {
  const inputClasses =
    'outline-none bg-transparent w-40 text-sm border-[1px] px-4 py-1 rounded-xl border-slate-400 text-gray-500' + ' '+ classInp

  return (
    <div className={`flex items-center flex-wrap gap-2 ${className}`}>
      <FilterInput
        placeholder='По паспорту'
        classInp={classInp}
        filterValue={passportFilter}
        setFilter={setPassportFilter}
      />
      <FilterInput
      classInp={classInp}
        placeholder='По телефону'
        filterValue={phoneFilter}
        setFilter={setPhoneFilter}
      />
      <FilterInput
      classInp={classInp}
        placeholder='По адресу'
        filterValue={addressFilter}
        setFilter={setAddressFilter}
      />
      <div className={`relative ${classInp}`}>
        <DatePicker
          className={inputClasses + ' ' + classInp}
          placeholderText={'Дата доставки'}
          selected={dateDeliveryFilter}
          onChange={date => setDateDeliveryFilter(date)}
          dateFormat='dd.MM.yyyy'
          showPopperArrow={false}
          withPortal
        />
        <CiCalendarDate
          size={20}
          className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none'
        />
      </div>
      <div className={`relative ${classInp}`}>
        <DatePicker
          className={inputClasses + ' ' + classInp}
          placeholderText={'По выдаче'}
          selected={dateReceiptFilter}
          onChange={date => setDateReceiptFilter(date)}
          dateFormat='dd.MM.yyyy'
          showPopperArrow={false}
          withPortal
        />
        <CiCalendarDate
          size={20}
          className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none'
        />
      </div>
      <div className={`relative ${classInp}`}>
        <DatePicker
          className={inputClasses + ' ' + classInp}
          placeholderText={'По получению'}
          selected={dateTransferFilter}
          onChange={date => setDateTransferFilter(date)}
          dateFormat='dd.MM.yyyy'
          showPopperArrow={false}
          withPortal
        />
        <CiCalendarDate
          size={20}
          className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none'
        />
      </div>
      <select
        value={statusFilter}
        onChange={e => setStatusFilter(e.target.value)}
        className={inputClasses}
      >
        <option value='' disabled className='text-gray-500'>
          По статусу
        </option>
        <option value=''>Все статусы</option>
        <option value='pending'>На рассмотрении</option>
        <option value='in-progress'>В работе</option>
        <option value='completed'>Завершено</option>
        <option value='rejected'>Отклонено</option>
      </select>
    </div>
  )
}

export default Filter
