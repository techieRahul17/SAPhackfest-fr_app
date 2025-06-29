"use client"

import { createContext, useContext, useState } from "react"
import { useRouter, usePathname } from "expo-router"

const NavigationContext = createContext({})

export const useNavigation = () => useContext(NavigationContext)

export const NavigationProvider = ({ children }) => {
    const router = useRouter()
    const pathname = usePathname()
    const [navigationHistory, setNavigationHistory] = useState([])
    const [previousRoute, setPreviousRoute] = useState(null)
    const [navigationState, setNavigationState] = useState({
        isNavigating: false,
        direction: "forward", // "forward" or "backward"
    })

    // Navigate to a new screen with animation
    const navigateTo = (route, options = {}) => {
        setNavigationState({
            isNavigating: true,
            direction: "forward",
        })

        // Add current route to history
        if (pathname) {
            setPreviousRoute(pathname)
            setNavigationHistory((prev) => [...prev, pathname])
        }

        // Navigate to the new route
        setTimeout(() => {
            router.push(route)

            setTimeout(() => {
                setNavigationState({
                    isNavigating: false,
                    direction: "forward",
                })
            }, 300)
        }, 50)
    }

    // Go back with animation
    const goBack = () => {
        setNavigationState({
            isNavigating: true,
            direction: "backward",
        })

        // Get the previous route
        const newHistory = [...navigationHistory]
        const lastRoute = newHistory.pop() || "/"
        setNavigationHistory(newHistory)
        setPreviousRoute(lastRoute)

        // Navigate back
        setTimeout(() => {
            router.back()

            setTimeout(() => {
                setNavigationState({
                    isNavigating: false,
                    direction: "backward",
                })
            }, 300)
        }, 50)
    }

    // Replace the current screen
    const replaceTo = (route) => {
        setNavigationState({
            isNavigating: true,
            direction: "forward",
        })

        setTimeout(() => {
            router.replace(route)

            setTimeout(() => {
                setNavigationState({
                    isNavigating: false,
                    direction: "forward",
                })
            }, 300)
        }, 50)
    }

    return (
        <NavigationContext.Provider
            value={{
                navigateTo,
                goBack,
                replaceTo,
                navigationState,
                previousRoute,
                currentRoute: pathname,
            }}
        >
            {children}
        </NavigationContext.Provider>
    )
}
