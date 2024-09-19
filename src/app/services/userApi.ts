import { IUser } from '../../modals/IUser'
import { api } from './api'

export const userApi = api.injectEndpoints({
	endpoints: builder => ({
		login: builder.mutation<
			{ token: string },
			{ login: string; password: string }
		>({
			query: body => ({
				url: '/login',
				method: 'POST',
				body,
			}),
		}),
		register: builder.mutation<
			{
				email: string
				password: string
				inn: string
				ogrn: string
				phone: string
				login: string
				name: string
			},
			{
				email: string
				password: string
				inn: string
				ogrn: string
				phone: string
				login: string
				name: string
			}
		>({
			query: body => ({
				url: '/register',
				method: 'POST',
				body,
			}),
		}),
		current: builder.query<IUser, void>({
			query: () => ({
				url: `/current`,
				method: 'GET',
			}),
		}),
		getUserById: builder.query<IUser, string>({
			query: id => ({
				url: `/user/${id}`,
				method: 'GET',
			}),
		}),
		updateUser: builder.mutation<
			IUser,
			{ id: string | number | undefined; data: IUser }
		>({
			query: ({ data, id }) => ({
				url: `/user/${id}`,
				method: 'PUT',
				body: data,
			}),
		}),
	}),
})

export const {
	useCurrentQuery,
	useGetUserByIdQuery,
	useLazyCurrentQuery,
	useLazyGetUserByIdQuery,
	useLoginMutation,
	useRegisterMutation,
	useUpdateUserMutation,
} = userApi

export const {
	endpoints: { current, getUserById, login, register, updateUser },
} = userApi
