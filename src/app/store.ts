import { combineReducers, configureStore } from '@reduxjs/toolkit'
import user from '../features/userSlice'
import { listenerMiddleware } from '../middleware/auth'
import { api } from './services/api'
import orders from '../pages/Orders/OrderSlice'

const rootReducer = combineReducers({
	[api.reducerPath]: api.reducer,
	user,
	orders
})

export const setupStore = () => {
	return configureStore({
		reducer: rootReducer,
		middleware: getDefaultMiddleware =>
			getDefaultMiddleware()
				.concat(api.middleware)
				.prepend(listenerMiddleware.middleware),
	})
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
