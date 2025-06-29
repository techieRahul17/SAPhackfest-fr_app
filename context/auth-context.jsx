"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "expo-router"
import AsyncStorage from "@react-native-async-storage/async-storage"

const AuthContext = createContext({})

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
    const router = useRouter()
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [userRole, setUserRole] = useState(null)

    // Check if user is logged in on app start
    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const userData = await AsyncStorage.getItem("user")
                const roleData = await AsyncStorage.getItem("userRole")

                if (userData) {
                    setUser(JSON.parse(userData))
                    setUserRole(roleData)
                }
            } catch (error) {
                console.error("Error checking login status:", error)
            } finally {
                setLoading(false)
            }
        }

        checkLoginStatus()
    }, [])

    // Login function
    const login = async (userData, role) => {
        try {
            setLoading(true)

            // In a real app, you would make an API call here
            // For demo purposes, we'll just store the user data locally
            await AsyncStorage.setItem("user", JSON.stringify(userData))
            await AsyncStorage.setItem("userRole", role)

            setUser(userData)
            setUserRole(role)

            // Navigate to the appropriate dashboard based on role
            switch (role) {
                case "government":
                    router.replace("/government/index")
                    break
                case "restaurant":
                    router.replace("/restaurant/index")
                    break
                case "catering":
                    router.replace("/catering/index")
                    break
                case "user":
                    router.replace("/user/index")
                    break
                default:
                    router.replace("/")
            }
        } catch (error) {
            console.error("Login error:", error)
            throw error
        } finally {
            setLoading(false)
        }
    }

    // Register function
    const register = async (userData, role = "user") => {
        try {
            setLoading(true)

            // In a real app, you would make an API call here
            // For demo purposes, we'll just store the user data locally
            await AsyncStorage.setItem("user", JSON.stringify(userData))
            await AsyncStorage.setItem("userRole", role)

            setUser(userData)
            setUserRole(role)

            // Navigate to the user dashboard
            router.replace("/user/index")
        } catch (error) {
            console.error("Registration error:", error)
            throw error
        } finally {
            setLoading(false)
        }
    }

    // Logout function
    const logout = async () => {
        try {
            setLoading(true)

            // Clear user data from storage
            await AsyncStorage.removeItem("user")
            await AsyncStorage.removeItem("userRole")

            setUser(null)
            setUserRole(null)

            // Navigate to the home screen
            router.replace("/")
        } catch (error) {
            console.error("Logout error:", error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                userRole,
                loading,
                login,
                register,
                logout,
                isAuthenticated: !!user,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
