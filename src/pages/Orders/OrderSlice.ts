import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IOrder } from '../../modals/IOrder'

interface OrdersState {
	orders: IOrder[]
}

const initialState: OrdersState = {
	orders: [],
}

const ordersSlice = createSlice({
	name: 'orders',
	initialState,
	reducers: {
		setOrders(state, action: PayloadAction<IOrder[]>) {
			state.orders = action.payload
		},
		updateOrderStatus(
			state,
			action: PayloadAction<{ id: string; status: string }>
		) {
			const { id, status } = action.payload
			const order = state.orders.find(order => order.id === id)
			if (order) {
				order.status = status
			}
		},
	},
})

export const { setOrders, updateOrderStatus } = ordersSlice.actions
export default ordersSlice.reducer
