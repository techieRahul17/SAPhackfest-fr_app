"use client"

import { useEffect, useState } from "react"
import { View, ActivityIndicator } from "react-native"
import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { useFonts } from "expo-font"
import { SplashScreen } from "expo-router"
import { Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold } from "@expo-google-fonts/poppins"
import {
    PlayfairDisplay_400Regular,
    PlayfairDisplay_500Medium,
    PlayfairDisplay_700Bold,
    PlayfairDisplay_900Black,
} from "@expo-google-fonts/playfair-display"

// Animation provider
import { AnimationProvider } from "../context/animation-context"
// Theme provider
import { ThemeProvider } from "../context/theme-context"
// Auth provider
import { AuthProvider } from "../context/auth-context"
// Navigation provider
import { NavigationProvider } from "../context/navigation-context"

export default function RootLayout() {
    const [appIsReady, setAppIsReady] = useState(false)

    const [fontsLoaded] = useFonts({
        "Poppins-Regular": Poppins_400Regular,
        "Poppins-Medium": Poppins_500Medium,
        "Poppins-SemiBold": Poppins_600SemiBold,
        "Poppins-Bold": Poppins_700Bold,
        "Playfair-Regular": PlayfairDisplay_400Regular,
        "Playfair-Medium": PlayfairDisplay_500Medium,
        "Playfair-Bold": PlayfairDisplay_700Bold,
        "Playfair-Black": PlayfairDisplay_900Black,
    })

    useEffect(() => {
        async function prepare() {
            try {
                // Pre-load fonts, make API calls, etc.
                await new Promise((resolve) => setTimeout(resolve, 1000)) // Artificial delay for demo
            } catch (e) {
                console.warn(e)
            } finally {
                // Tell the application to render
                setAppIsReady(true)
            }
        }

        prepare()
    }, [])

    useEffect(() => {
        if (appIsReady && fontsLoaded) {
            try {
                SplashScreen.hideAsync()
            } catch (e) {
                console.log("SplashScreen error:", e)
            }
        }
    }, [appIsReady, fontsLoaded])

    if (!appIsReady || !fontsLoaded) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#FF6B35" }}>
                <ActivityIndicator size="large" color="#FFFFFF" />
            </View>
        )
    }

    return (
        <ThemeProvider>
            <AuthProvider>
                <NavigationProvider>
                    <AnimationProvider>
                        <SafeAreaProvider>
                            <GestureHandlerRootView style={{ flex: 1 }}>
                                <StatusBar style="light" />
                                <Stack
                                    screenOptions={{
                                        headerShown: false,
                                        animation: "slide_from_right",
                                        contentStyle: { backgroundColor: "#FFFFFF" },
                                        gestureEnabled: true,
                                        fullScreenGestureEnabled: true,
                                    }}
                                >
                                    <Stack.Screen
                                        name="index"
                                        options={{
                                            animation: "fade",
                                        }}
                                    />
                                    <Stack.Screen
                                        name="login"
                                        options={{
                                            animation: "slide_from_bottom",
                                            presentation: "modal",
                                        }}
                                    />
                                    <Stack.Screen
                                        name="register"
                                        options={{
                                            animation: "slide_from_bottom",
                                            presentation: "modal",
                                        }}
                                    />
                                    <Stack.Screen
                                        name="government/index"
                                        options={{
                                            animation: "fade_from_bottom",
                                        }}
                                    />
                                    <Stack.Screen
                                        name="restaurant/index"
                                        options={{
                                            animation: "fade_from_bottom",
                                        }}
                                    />
                                    <Stack.Screen
                                        name="catering/index"
                                        options={{
                                            animation: "fade_from_bottom",
                                        }}
                                    />
                                    <Stack.Screen
                                        name="user/index"
                                        options={{
                                            animation: "fade_from_bottom",
                                        }}
                                    />
                                </Stack>
                            </GestureHandlerRootView>
                        </SafeAreaProvider>
                    </AnimationProvider>
                </NavigationProvider>
            </AuthProvider>
        </ThemeProvider>
    )
}
