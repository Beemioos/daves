import { useState, useContext, useRef, useEffect } from 'react'
import { CSSTransition } from 'react-transition-group'
import './FilterPanel.scss'
import { ThemeContext } from '../../theme-privider'

interface FilterPanelProps {
  isOpen: boolean
  closePanel: () => void
  children: React.ReactNode
}

const FilterPanel: React.FC<FilterPanelProps> = ({ isOpen, closePanel, children }) => {
  const { theme } = useContext(ThemeContext)
  const panelRef = useRef<HTMLDivElement | null>(null)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)

  // Обработчик изменения размера окна
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  return (
    <CSSTransition
      in={isOpen}
      timeout={300}
      classNames="filter-slide"
      unmountOnExit
    >
      <div
        className={`filter-panel ${
          isMobile ? 'filter-mobile' : 'filter-desktop'
        } ${theme === 'dark' ? 'bg-dark' : 'bg-light'}`}
        ref={panelRef}
      >
        {isMobile && <div className="filter-handle"></div>}
        <button onClick={closePanel} className="close-button">&times;</button>
        {children}
      </div>
    </CSSTransition>
  )
}

export default FilterPanel
