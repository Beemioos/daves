import React from 'react'

interface Props {
  placeholder: string
  setFilter: (value: string) => void
  onChange?: (value: string) => void
  filterValue: string
  classInp?: string
}

const FilterInput: React.FC<Props> = ({ placeholder, setFilter, filterValue, classInp }) => {
  return (
    <input
      type='text'
      placeholder={placeholder}
      value={filterValue}
      onChange={(e) => setFilter(e.target.value)}
      className={`outline-none bg-transparent w-40 text-sm border-[1px] px-4 py-1 rounded-xl border-slate-400 ${classInp}`}
    />
  )
}

export default FilterInput
