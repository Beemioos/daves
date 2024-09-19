import { useContext, useState } from 'react'
import { FaRegMoon } from 'react-icons/fa'
import { LuSunMedium } from 'react-icons/lu'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useGetAllOrderQuery } from '../../app/services/orderApi'
import Filter from '../../components/FilterAdmin/Filter'
import MyButton from '../../components/MyButton/MyButton'
import OrderList from '../../components/OrderList/OrderList'
import { logout } from '../../features/userSlice'
import { IOrder } from '../../modals/IOrder'
import { ThemeContext } from '../../theme-privider'
import './Admin.scss'

const Admin = () => {
	const { theme, toggleTheme } = useContext(ThemeContext)
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const [orderIdFilter, setOrderIdFilter] = useState('')
	const [dateDeliveryFilter, setDateDeliveryFilter] = useState<Date | null>(
		null
	)
	const [dateReceiptFilter, setDateReceiptFilter] = useState<Date | null>(null)
	const [dateTransferFilter, setDateTransferFilter] = useState<Date | null>(
		null
	)
	const [statusFilter, setStatusFilter] = useState('')
	const { data: orders = [], isLoading } = useGetAllOrderQuery()

	const filteredOrders = orders.filter((order: IOrder) => {
		const orderId = String(order.id)
		const idMatch = orderId.includes(orderIdFilter)
		const dateDeliveryMatch = dateDeliveryFilter
			? new Date(order.dateDelivery).toDateString() ===
			  dateDeliveryFilter.toDateString()
			: true
		const dateReceiptMatch = dateReceiptFilter
			? new Date(order.dateReceipt).toDateString() ===
			  dateReceiptFilter.toDateString()
			: true
		const dateTransferMatch = dateTransferFilter
			? new Date(order.dateTransfer).toDateString() ===
			  dateTransferFilter.toDateString()
			: true
		const statusMatch = statusFilter ? order.status === statusFilter : true

		return (
			idMatch &&
			dateDeliveryMatch &&
			dateReceiptMatch &&
			dateTransferMatch &&
			statusMatch
		)
	})
	const handleLogout = () => {
		dispatch(logout())
		localStorage.removeItem('token')
		navigate('/auth')
	}
	return (
		<div className={`admin-page ${theme}`}>
			<header className='w-full h-[70px] flex items-center justify-between px-10'>
				{/* Лого слева */}
				<div className="logo text-xl font-bold">
					Лого
				</div>

				{/* Кнопка выхода и переключение темы справа */}
				<div className="flex items-center space-x-4">
					<MyButton
						className={`${
							theme === 'light'
								? 'border-yellow-900 bg-yellow-900'
								: ' border-blue-600 bg-blue-600'
						} hover:bg-red-600 hover:border-red-600 border-[1px] text-white`}
						fullWidth
						onClick={() => handleLogout()}
					>
						Выйти
					</MyButton>
					<div onClick={() => toggleTheme()}>
						{theme === 'light' ? (
							<FaRegMoon size={26} />
						) : (
							<LuSunMedium size={26} />
						)}
					</div>
				</div>
			</header>

			<div className='main1'>
				<div className='filter-container w-full px-10 flex items-center'>
					<Filter
						className='filltering'
						orderIdFilter={orderIdFilter}
						setOrderIdFilter={setOrderIdFilter}
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

				<div className='order-list w-full'>
					<OrderList isLoading={isLoading} orders={filteredOrders} />
				</div>
			</div>
		</div>
	)
}

export default Admin
