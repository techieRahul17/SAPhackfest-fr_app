"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { Appearance } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"

// Define our theme colors
const themes = {
    light: {
        primary: "#FF6B35", // Vibrant orange
        primaryDark: "#E85826", // Darker orange
        primaryLight: "#FF8C5F", // Lighter orange
        secondary: "#2A9D8F", // Teal
        secondaryDark: "#1E7268", // Darker teal
        secondaryLight: "#43B3A4", // Lighter teal
        accent: "#F9C74F", // Yellow
        accentDark: "#E8B73E", // Darker yellow
        accentLight: "#FFDA82", // Lighter yellow
        background: "#FFFFFF", // White
        card: "#F8F9FA", // Light gray
        text: "#212529", // Dark gray
        textLight: "#6C757D", // Medium gray
        textInverted: "#FFFFFF", // White
        success: "#43AA8B", // Green
        warning: "#F9C74F", // Yellow
        error: "#F94144", // Red
        info: "#90E0EF", // Light blue
        border: "#E9ECEF", // Very light gray
        shadow: "rgba(0, 0, 0, 0.1)", // Shadow color
        overlay: "rgba(0, 0, 0, 0.7)", // Overlay color
    },
    dark: {
        primary: "#FF6B35", // Vibrant orange
        primaryDark: "#E85826", // Darker orange
        primaryLight: "#FF8C5F", // Lighter orange
        secondary: "#2A9D8F", // Teal
        secondaryDark: "#1E7268", // Darker teal
        secondaryLight: "#43B3A4", // Lighter teal
        accent: "#F9C74F", // Yellow
        accentDark: "#E8B73E", // Darker yellow
        accentLight: "#FFDA82", // Lighter yellow
        background: "#121212", // Dark background
        card: "#1E1E1E", // Slightly lighter dark
        text: "#F8F9FA", // Light gray
        textLight: "#CED4DA", // Medium light gray
        textInverted: "#212529", // Dark gray
        success: "#43AA8B", // Green
        warning: "#F9C74F", // Yellow
        error: "#F94144", // Red
        info: "#90E0EF", // Light blue
        border: "#2A2A2A", // Dark gray
        shadow: "rgba(0, 0, 0, 0.3)", // Shadow color
        overlay: "rgba(0, 0, 0, 0.85)", // Overlay color
    },
}

// Create the context
const ThemeContext = createContext({
    theme: themes.light,
    isDark: false,
    toggleTheme: () => {},
    colors: themes.light,
    setColorScheme: () => {},
})

// Custom hook to use the theme context
export const useTheme = () => useContext(ThemeContext)

// Theme provider component
export const ThemeProvider = ({ children }) => {
    const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme() || "light")
    const [isSystemTheme, setIsSystemTheme] = useState(true)

    // Load saved theme preference
    useEffect(() => {
        const loadThemePreference = async () => {
            try {
                const savedTheme = await AsyncStorage.getItem("theme")
                const savedIsSystem = await AsyncStorage.getItem("isSystemTheme")

                if (savedTheme) {
                    setColorScheme(savedTheme)
                }

                if (savedIsSystem !== null) {
                    setIsSystemTheme(savedIsSystem === "true")
                }
            } catch (error) {
                console.error("Error loading theme preference:", error)
            }
        }

        loadThemePreference()
    }, [])

    // Listen for system theme changes
    useEffect(() => {
        const subscription = Appearance.addChangeListener(({ colorScheme: newColorScheme }) => {
            if (isSystemTheme && newColorScheme) {
                setColorScheme(newColorScheme)
            }
        })

        return () => {
            subscription.remove()
        }
    }, [isSystemTheme])

    // Get the current theme based on colorScheme
    const theme = colorScheme === "dark" ? themes.dark : themes.light

    // Toggle between light and dark themes
    const toggleTheme = async () => {
        const newScheme = colorScheme === "dark" ? "light" : "dark"
        setColorScheme(newScheme)
        setIsSystemTheme(false)

        try {
            await AsyncStorage.setItem("theme", newScheme)
            await AsyncStorage.setItem("isSystemTheme", "false")
        } catch (error) {
            console.error("Error saving theme preference:", error)
        }
    }

    // Set a specific color scheme
    const setThemeColorScheme = async (newScheme, useSystem = false) => {
        if (useSystem) {
            const systemScheme = Appearance.getColorScheme() || "light"
            setColorScheme(systemScheme)
            setIsSystemTheme(true)

            try {
                await AsyncStorage.setItem("isSystemTheme", "true")
            } catch (error) {
                console.error("Error saving theme preference:", error)
            }
        } else {
            setColorScheme(newScheme)
            setIsSystemTheme(false)

            try {
                await AsyncStorage.setItem("theme", newScheme)
                await AsyncStorage.setItem("isSystemTheme", "false")
            } catch (error) {
                console.error("Error saving theme preference:", error)
            }
        }
    }

    return (
        <ThemeContext.Provider
            value={{
                theme,
                isDark: colorScheme === "dark",
                toggleTheme,
                colors: theme,
                colorScheme,
                isSystemTheme,
                setColorScheme: setThemeColorScheme,
            }}
        >
            {children}
        </ThemeContext.Provider>
    )
}
