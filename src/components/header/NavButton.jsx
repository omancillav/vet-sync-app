export function NavButton({ children, isActive = false, ...props }) {
  const baseClasses = 'w-full md:w-auto px-4 py-2 rounded-full transition-colors'
  const activeClasses = 'bg-primary text-primary-foreground text-sm hover:bg-primary/90 hover:cursor-default'
  const inactiveClasses = 'hover:bg-accent hover:text-accent-foreground hover:cursor-pointer'

  return (
    <button className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`} {...props}>
      {children}
    </button>
  )
}
