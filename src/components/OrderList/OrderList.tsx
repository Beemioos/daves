import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import Loading from '../../components/Loading/Loading'
import { IOrder } from '../../modals/IOrder'
import { ThemeContext } from '../../theme-privider'
import CardDetails from '../CardDetails/CardDetails'
import OrderCard from '../OrderCard/OrderCard'
import './OrderList.scss'

interface Props {
	isLoading: boolean
	orders: IOrder[] | undefined
}

const OrderList: React.FC<Props> = ({ isLoading, orders }) => {
	const { theme } = useContext(ThemeContext)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [touchStart, setTouchStart] = useState(0)
	const [touchCurrent, setTouchCurrent] = useState(0)
	const [isDragging, setIsDragging] = useState(false)
	const modalRef = useRef<HTMLDivElement | null>(null)
	const isMobile = window.innerWidth <= 760

	const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null)

	const [localOrders, setLocalOrders] = useState<IOrder[] | undefined | null>(null)
	useEffect(()=>{
		setLocalOrders(orders)
	},[orders])
	

	const openDetails = (order: IOrder) => {
		setSelectedOrder(order)
		setIsModalOpen(true)
		disableScroll()
	}

	const closeDetails = () => {
		setSelectedOrder(null)
		setIsModalOpen(false)
		enableScroll()
	}
	const handleOrderUpdate = (updatedOrder: IOrder) => {
		// Обновляем локальное состояние с заказами
		setLocalOrders(prevOrders =>
			prevOrders?.map(order =>
				order.id === updatedOrder.id ? updatedOrder : order
			)
		)
	}

	const handleTouchStart = (e: TouchEvent) => {
		if (isDragging) {
			setTouchStart(e.touches[0].clientY)
			setTouchCurrent(e.touches[0].clientY)
		}
	}
	const handleTouchMove = (e: TouchEvent) => {
		if (isDragging) {
			const touchY = e.touches[0].clientY
			setTouchCurrent(touchY)
			updateModalPosition(touchY - touchStart)
		}
	}
	const handleTouchEnd = () => {
		if (isDragging) {
			const moveDelta = touchCurrent - touchStart
			const screenHeight = window.innerHeight

			if (moveDelta > screenHeight / 1.2 || moveDelta > screenHeight / 3) {
				closeDetails()
			} else {
				resetModalPosition()
			}
			setIsDragging(false)
		}
	}
	const updateModalPosition = (moveDelta: number) => {
		if (modalRef.current) {
			modalRef.current.style.transform = `translateY(${Math.max(
				moveDelta,
				0
			)}px)`
		}
	}
	const resetModalPosition = () => {
		if (modalRef.current) {
			modalRef.current.style.transform = 'translateY(8vh)'
		}
	}
	const disableScroll = () => {
		document.body.style.position = 'fixed'
		document.body.style.width = '100%'
	}
	const enableScroll = () => {
		document.body.style.position = ''
		document.body.style.width = ''
	}
	const addTouchListeners = useCallback(() => {
		if (modalRef.current && isMobile) {
			modalRef.current.addEventListener('touchstart', handleTouchStart)
			modalRef.current.addEventListener('touchmove', handleTouchMove)
			modalRef.current.addEventListener('touchend', handleTouchEnd)
		}
	}, [isMobile, handleTouchStart, handleTouchMove, handleTouchEnd, isDragging])
	const removeTouchListeners = useCallback(() => {
		if (modalRef.current && isMobile) {
			modalRef.current.removeEventListener('touchstart', handleTouchStart)
			modalRef.current.removeEventListener('touchmove', handleTouchMove)
			modalRef.current.removeEventListener('touchend', handleTouchEnd)
		}
	}, [isMobile, handleTouchStart, handleTouchMove, handleTouchEnd])
	const startDragging = () => {
		setIsDragging(true)
	}
	useEffect(() => {
		if (isModalOpen) {
			addTouchListeners()
		} else {
			enableScroll()
		}

		return () => {
			removeTouchListeners()
		}
	}, [isModalOpen, addTouchListeners, removeTouchListeners])

	if (isLoading) {
		return (
			<div className='flex justify-center items-center h-[70vh] flex-col text-4xl font-bold'>
				<Loading />
			</div>
		)
	}

	if (!localOrders || localOrders.length === 0) {
		return (
			<p className='flex justify-center items-center h-[70vh] flex-col text-4xl font-bold'>
				Заказы не найдены.
			</p>
		)
	}

	return (
		<div className='relative'>
			<ul
				className={`flex mt-4 justify-left items-center max-w-full flex-wrap `}
			>
				{localOrders.map(localOrder => (
					<OrderCard
						order={localOrder}
						key={localOrder.id}
						onClick={() => openDetails(localOrder)}
					/>
				))}
			</ul>

			<CSSTransition
				in={isModalOpen}
				timeout={300}
				classNames='modal-slide'
				unmountOnExit
			>
				<div className='fixed inset-0 flex z-50'>
					<div
						className='flex-1 bg-black opacity-50 transition-opacity duration-700 ease-in-out'
						onClick={closeDetails}
					></div>
					<div
						ref={modalRef}
						className={`modal ${isMobile ? 'modal-mobile' : 'modal-desktop'}
							${theme === 'dark' ? 'bg-zinc-800' : 'bg-white'} px-4
						`}
						style={{
							transform: `${isMobile ? 'translateY(8vh)' : 'translateY(0vh)'} `,
						}}
					>
						{isMobile && (
							<div onTouchStart={startDragging}>
								<div className='handle'></div>
							</div>
						)}
						<button
							onClick={closeDetails}
							className='absolute top-4 right-4 text-xl font-bold'
						>
							&times;
						</button>
						<CardDetails order={selectedOrder} onUpdate={handleOrderUpdate} />
					</div>
				</div>
			</CSSTransition>
		</div>
	)
}

export default OrderList
