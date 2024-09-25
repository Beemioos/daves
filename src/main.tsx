import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { setupStore } from './app/store.ts'
import Layout from './components/Layout/Layout.tsx'
import { AuthGuard } from './features/authGuard.tsx'
import './index.css'
import Admin from './pages/Admin/Admin.tsx'
import Auth from './pages/Auth/Auth.tsx'
import CreateOrder from './pages/CreateOrder/CreateOrder.tsx'
import Orders from './pages/Orders/Orders.tsx'
import Profile from './pages/Profile/Profile.tsx'
import ThemeProvider from './theme-privider/index.tsx'
import Guest from './pages/Guest/Guest.tsx'

const router = createBrowserRouter([
	{
		path: '/auth',
		element: <Auth />,
	},
	{
		path: '/guest/:id',
		element: <Guest />,
	},
	{
		path: '/',
		element: (
			<AuthGuard>
				<Layout />
			</AuthGuard>
		),
		children: [
			{
				path: '',
				element: <CreateOrder />,
			},
			{
				path: 'orders',
				element: <Orders />,
			},
			{
				path: 'profile',
				element: <Profile />,
			},
		],
	},
	{
		path: '/admin',
		element: (
			<AuthGuard>
				<Admin />
			</AuthGuard>
		),
	},
])
const store = setupStore()

createRoot(document.getElementById('root')!).render(
	<Provider store={store}>
		<ThemeProvider>
			<RouterProvider router={router} />
		</ThemeProvider>
	</Provider>
)
