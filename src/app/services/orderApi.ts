import { IOrder } from '../../modals/IOrder'
import { api } from './api'

export const orderApi = api.injectEndpoints({
	endpoints: builder => ({
		createOrder: builder.mutation<void, { formData: FormData; userId: string }>(
			{
				query: ({ formData, userId }) => {
					formData.append('userId', userId)
					return {
						url: '/orders',
						method: 'POST',
						body: formData,
					}
				},
			}
		),
		getAllOrder: builder.query<IOrder[], void>({
			query: () => ({
				url: '/allorders',
				method: 'GET',
			}),
		}),
		updateOrderById: builder.mutation<IOrder, { id: string | undefined; status: string }>({
			query: ({ id, status }) => ({
				url: `/orders/${id}`,
				method: 'PUT',
				body: { status }, 
				
			}),
		}),

		getOrderByUserId: builder.query<IOrder[], string>({
			query: userId => ({
				url: `/orders`,
				method: 'GET',
				params: { userId },
			}),
		}),
		
		getOrderByID: builder.query<IOrder, string>({
            query: (id) => `/orders/${id}`,
        }),
	}),
})
export const {
	useCreateOrderMutation,
	useGetOrderByIDQuery,
	useGetAllOrderQuery,
	useLazyGetOrderByIDQuery,
	useLazyGetAllOrderQuery,
	useUpdateOrderByIdMutation,
	// useGetOrderByIdQuery,
	// useLazyGetOrderByIdQuery,
	useGetOrderByUserIdQuery,
	useLazyGetOrderByUserIdQuery,
} = orderApi

export const {
	endpoints: {
		createOrder,
		getOrderByID,
		updateOrderById,
		getAllOrder,
		// getOrderById,
		getOrderByUserId,
	},
} = orderApi
