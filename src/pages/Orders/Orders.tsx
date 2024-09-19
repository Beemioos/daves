import { useContext, useEffect, useState } from 'react'
import { FaFilter } from 'react-icons/fa6'
import { useSelector } from 'react-redux'
import { CSSTransition } from 'react-transition-group'
import { useGetOrderByUserIdQuery } from '../../app/services/orderApi'
import Filter from '../../components/Filter/Filter'
import MyButton from '../../components/MyButton/MyButton'
import OrderList from '../../components/OrderList/OrderList'
import { selectCurrent } from '../../features/userSlice'
import { IOrder } from '../../modals/IOrder'
import { ThemeContext } from '../../theme-privider'
import './Orders.scss'
import { LiaTimesSolid } from "react-icons/lia";


const Orders = () => {
	const { theme } = useContext(ThemeContext)
	const user = useSelector(selectCurrent)
	const userId = user?.id
	const normalizedUserId = String(userId)

	const { data: orders = [], isLoading } =
		useGetOrderByUserIdQuery(normalizedUserId)
		
	
	const [passportFilter, setPassportFilter] = useState('')
	const [phoneFilter, setPhoneFilter] = useState('')
	const [addressFilter, setAddressFilter] = useState('')
	const [statusFilter, setStatusFilter] = useState('')
	const [dateDeliveryFilter, setDateDeliveryFilter] = useState<Date | null>(
		null
	)
	const [dateReceiptFilter, setDateReceiptFilter] = useState<Date | null>(null)
	const [dateTransferFilter, setDateTransferFilter] = useState<Date | null>(
		null
	)
	const filteredOrders = orders.filter((order: IOrder) => {
		const passportMatch = order.passport.includes(passportFilter)
		const phoneMatch = order.phone.includes(phoneFilter)
		const addressMatch = order.address
			.toLowerCase()
			.includes(addressFilter.toLowerCase())
		const dateDeliveryMatch = dateDeliveryFilter
			? new Date(order.dateDelivery).toDateString() ===
			  dateDeliveryFilter?.toDateString()
			: true
		const dateReceiptMatch = dateReceiptFilter
			? new Date(order.dateReceipt).toDateString() ===
			  dateReceiptFilter?.toDateString()
			: true
		const dateTransferMatch = dateTransferFilter
			? new Date(order.dateTransfer).toDateString() ===
			  dateTransferFilter?.toDateString()
			: true
		const statusMatch = statusFilter ? order.status === statusFilter : true

		return (
			passportMatch &&
			phoneMatch &&
			addressMatch &&
			dateDeliveryMatch &&
			dateReceiptMatch &&
			dateTransferMatch &&
			statusMatch
		)
	})

	const [isOpen, setIsOpen] = useState(false)
	const [isMobile, setIsMobile] = useState(window.innerWidth <= 700)
	const [filterText, setFilterText] = useState('Фильтрация по всему')

	const updateFilterText = () => {
		const filters: string[] = []
		if (passportFilter) filters.push(`Паспорт: ${passportFilter}`)
		if (phoneFilter) filters.push(`Телефон: ${phoneFilter}`)
		if (addressFilter) filters.push(`Адрес: ${addressFilter}`)
		if (dateDeliveryFilter)
			filters.push(`Дата доставки: ${dateDeliveryFilter.toDateString()}`)
		if (dateReceiptFilter)
			filters.push(`Дата получения: ${dateReceiptFilter.toDateString()}`)
		if (dateTransferFilter)
			filters.push(`Дата передачи: ${dateTransferFilter.toDateString()}`)
		if (statusFilter)
			filters.push(
				`Статус: ${
					statusFilter === 'rejected'
						? 'Отклонено'
						: statusFilter === 'completed'
						? 'Завершено'
						: statusFilter === 'in-progress'
						? 'В работе'
						: statusFilter === 'pending'
						? 'На рассмотрении'
						: ''
				}`
			)
		setFilterText(filters.length ? filters.join(', ') : 'Фильтрация по всему')
	}

	useEffect(() => {
		updateFilterText()
	}, [
		passportFilter,
		phoneFilter,
		addressFilter,
		dateDeliveryFilter,
		dateReceiptFilter,
		dateTransferFilter,
		statusFilter,
	])
 
  
	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 800)
		}
    const isMobileDevice = window.innerWidth <= 800;
    setIsMobile(isMobileDevice);

		window.addEventListener('resize', handleResize)
		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	const clearFilters = () => {
		setPassportFilter('')
		setPhoneFilter('')
		setAddressFilter('')
		setStatusFilter('')
		setDateDeliveryFilter(null)
		setDateReceiptFilter(null)
		setDateTransferFilter(null)
		setFilterText('Фильтрация по всему')
		setIsOpen(false)
	}

	return (
		<div>
			{isMobile && (
				<div
					className={`px-4 py-2 rounded-xl w-60 flex items-center ${
						theme === 'light' ? 'border-yellow-950' : 'border-white'
					} border-[1px]`}
				>
					<button onClick={() => setIsOpen(!isOpen)}>{filterText}</button>
					{filterText !== 'Фильтрация по всему' ? (
						<div className='ml-2 text-4xl' onClick={clearFilters}>
							<LiaTimesSolid size={22}/>
						</div>
					) : (
						<FaFilter className='ml-4' />
					)}
				</div>
			)}

			<CSSTransition
				in={isOpen}
				timeout={300}
				classNames='slide-transition'
				unmountOnExit
			>
				<div className='slide-container'>
					<button  className='absolute right-5 top-3' onClick={() => setIsOpen(false)}>
            <LiaTimesSolid size={38}/>
          </button>
					<Filter
						className='flex-col justify-between h-[85vh] mt-10'
						classInp='w-full text-xl py-4'
						passportFilter={passportFilter}
						setPassportFilter={setPassportFilter}
						phoneFilter={phoneFilter}
						setPhoneFilter={setPhoneFilter}
						addressFilter={addressFilter}
						setAddressFilter={setAddressFilter}
						dateDeliveryFilter={dateDeliveryFilter}
						setDateDeliveryFilter={setDateDeliveryFilter}
						dateReceiptFilter={dateReceiptFilter}
						setDateReceiptFilter={setDateReceiptFilter}
						dateTransferFilter={dateTransferFilter}
						setDateTransferFilter={setDateTransferFilter}
						statusFilter={statusFilter}
						setStatusFilter={setStatusFilter}
					/>
					<MyButton
						fullWidth
						className={`${
							theme === 'light' ? 'bg-yellow-900' : 'bg-blue-600'
						} border-[1px] text-white w-full py-4 border-none mt-8`}
						type='submit'
						onClick={() => setIsOpen(false)}
					>
						Применить
					</MyButton>
				</div>
			</CSSTransition>

			{!isMobile && (
				<div className='filter-container'>
					<Filter
						passportFilter={passportFilter}
						setPassportFilter={setPassportFilter}
						phoneFilter={phoneFilter}
						setPhoneFilter={setPhoneFilter}
						addressFilter={addressFilter}
						setAddressFilter={setAddressFilter}
						dateDeliveryFilter={dateDeliveryFilter}
						setDateDeliveryFilter={setDateDeliveryFilter}
						dateReceiptFilter={dateReceiptFilter}
						setDateReceiptFilter={setDateReceiptFilter}
						dateTransferFilter={dateTransferFilter}
						setDateTransferFilter={setDateTransferFilter}
						statusFilter={statusFilter}
						setStatusFilter={setStatusFilter}
					/>
				</div>
			)}

			<OrderList isLoading={isLoading} orders={filteredOrders} />
		</div>
	)
}

export default Orders
