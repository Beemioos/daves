import '../App.scss'
import React, { useState } from 'react'
interface IThemeContext {
	theme: 'dark' | 'light'
	toggleTheme: () => void
}

export const ThemeContext = React.createContext<IThemeContext>({
	theme: 'dark',
	toggleTheme: () => null,
})

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
	const storedTheme = localStorage.getItem('theme')
	const currentTheme = storedTheme ? (storedTheme as 'dark' | 'light') : 'dark'
	const [theme, setTheme] = useState(currentTheme)

	const toggleTheme = () => {
		setTheme(prev => {
			const newTheme = prev === 'light' ? 'dark' : 'light'
			localStorage.setItem('theme', newTheme)
			return newTheme
		})
	}
	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			<main className={`${theme}`}>{children}</main>
		</ThemeContext.Provider>
	)
}

export default ThemeProvider
