import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  )
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  const [activeTabRect, setActiveTabRect] = React.useState<DOMRect | null>(null)
  const [isInitialized, setIsInitialized] = React.useState(false)
  const listRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const updateActiveTabPosition = () => {
      if (!listRef.current) return

      const activeTab = listRef.current.querySelector('[data-state="active"]') as HTMLElement
      if (activeTab) {
        const listRect = listRef.current.getBoundingClientRect()
        const activeRect = activeTab.getBoundingClientRect()
        
        setActiveTabRect({
          left: activeRect.left - listRect.left,
          width: activeRect.width,
          height: activeRect.height,
          top: activeRect.top - listRect.top,
        } as DOMRect)
        
        if (!isInitialized) {
          setIsInitialized(true)
        }
      }
    }

    // Actualizar posición inicial
    updateActiveTabPosition()

    // Observer para detectar cambios en la tab activa
    const observer = new MutationObserver(updateActiveTabPosition)
    
    if (listRef.current) {
      observer.observe(listRef.current, {
        attributes: true,
        subtree: true,
        attributeFilter: ['data-state']
      })
    }

    // Actualizar en resize
    window.addEventListener('resize', updateActiveTabPosition)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', updateActiveTabPosition)
    }
  }, [isInitialized])

  return (
    <TabsPrimitive.List
      ref={listRef}
      data-slot="tabs-list"
      className={cn(
        "w-full bg-muted text-muted-foreground inline-flex h-9 items-stretch rounded-lg p-1 relative",
        className
      )}
      {...props}
    >
      {/* Indicador deslizante */}
      {activeTabRect && (
        <div
          className={cn(
            "absolute bg-background dark:bg-input/30 rounded-md shadow-sm border border-border/50 transition-all duration-200 ease-out z-0",
            isInitialized ? "opacity-100" : "opacity-0"
          )}
          style={{
            left: activeTabRect.left,
            width: activeTabRect.width,
            height: activeTabRect.height,
            top: activeTabRect.top,
          }}
        />
      )}
      {props.children}
    </TabsPrimitive.List>
  )
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        // Estilo para que los botones ocupen el espacio disponible por igual
        "flex-1 h-full inline-flex items-center justify-center gap-1.5 rounded-md px-3 py-1 text-sm font-medium whitespace-nowrap transition-all duration-200 relative z-10",
        "text-foreground/60 data-[state=active]:text-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }