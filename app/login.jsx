"use client"

import { useState, useEffect } from "react"
import {
    View,
    ScrollView,
    TouchableOpacity,
    ImageBackground,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    Keyboard,
} from "react-native"
import { useRouter } from "expo-router"
import { LinearGradient } from "expo-linear-gradient"
// Replace the Lucide imports with Ionicons
import { Ionicons } from "@expo/vector-icons"
// Remove these imports
// import { Utensils, Building2, Users, User, ChevronLeft, ArrowRight } from "lucide-react-native"
import Animated from "react-native-reanimated"
import { useTheme } from "../context/theme-context"
import { useAnimation } from "../context/animation-context"
import { useNavigation } from "../context/navigation-context"
import { useAuth } from "../context/auth-context"
import AnimatedText from "../components/ui/animated-text"
import Button from "../components/ui/button"
import Card from "../components/ui/card"
import ScreenContainer from "../components/ui/screen-container"

const { width, height } = Dimensions.get("window")

export default function LoginScreen() {
    const router = useRouter()
    const { colors } = useTheme()
    const [selectedRole, setSelectedRole] = useState(null)
    const { createStaggeredAnimation } = useAnimation()
    const { goBack, navigateTo } = useNavigation()
    const { login, loading } = useAuth()
    const [keyboardVisible, setKeyboardVisible] = useState(false)

    // Replace all icon instances throughout the file
    // Role icons
    const roles = [
        {
            id: "government",
            title: "Government Worker",
            icon: <Ionicons name="business" size={32} color={colors.primary} />,
            description: "For canteen staff and food safety officers",
            route: "/government/index",
        },
        {
            id: "restaurant",
            title: "Restaurant Owner",
            icon: <Ionicons name="restaurant" size={32} color={colors.primary} />,
            description: "For restaurants and food establishments",
            route: "/restaurant/index",
        },
        {
            id: "catering",
            title: "Catering Service",
            icon: <Ionicons name="people" size={32} color={colors.primary} />,
            description: "For event and function catering services",
            route: "/catering/index",
        },
        {
            id: "user",
            title: "Regular User",
            icon: <Ionicons name="person" size={32} color={colors.primary} />,
            description: "For food enthusiasts and reviewers",
            route: "/user/index",
        },
    ]

    // Create staggered animations for roles
    const { animations: roleAnimations, startAllAnimations: startRoleAnimations } = createStaggeredAnimation(
        roles.length,
        300,
        100,
    )

    // Start animations when component mounts
    useEffect(() => {
        const timeout = setTimeout(() => {
            startRoleAnimations()
        }, 300)

        return () => clearTimeout(timeout)
    }, [])

    // Listen for keyboard events
    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => {
            setKeyboardVisible(true)
        })
        const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
            setKeyboardVisible(false)
        })

        return () => {
            keyboardDidHideListener.remove()
            keyboardDidShowListener.remove()
        }
    }, [])

    const handleContinue = async () => {
        if (selectedRole) {
            try {
                // In a real app, you would validate credentials here
                // For demo purposes, we'll just log in with dummy data
                await login(
                    {
                        id: "123",
                        name: "Demo User",
                        email: "demo@example.com",
                    },
                    selectedRole.id,
                )
            } catch (error) {
                console.error("Login error:", error)
            }
        }
    }

    return (
        <ScreenContainer
            scrollable={false}
            safeArea={true}
            statusBarStyle="light-content"
            statusBarColor="transparent"
            backgroundColor="transparent"
            padding={false}
        >
            <ImageBackground
                source={{
                    uri: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-dapur-melodi-192125-1109197.jpg-ftT1ERCZ75S9ZzPdvNElPLw9MoYvPD.jpeg",
                }}
                style={{ width: "100%", height: "100%" }}
            >
                <LinearGradient colors={[colors.overlay, colors.overlay]} className="flex-1">
                    <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "padding" : "height"}
                        style={{ flex: 1 }}
                        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
                    >
                        <ScrollView
                            className="flex-1"
                            contentContainerStyle={{
                                flexGrow: 1,
                                paddingBottom: 40,
                                justifyContent: keyboardVisible ? "flex-start" : "center",
                            }}
                            keyboardShouldPersistTaps="handled"
                        >
                            <View className="px-6 pt-12 flex-1 justify-center">
                                <TouchableOpacity onPress={goBack} className="flex-row items-center mb-6 absolute top-12 left-6">
                                    {/* Back button */}
                                    <Ionicons name="chevron-back" size={24} color={colors.textInverted} />
                                    <AnimatedText variant="subtitle" className="ml-1" style={{ color: colors.textInverted }}>
                                        Back
                                    </AnimatedText>
                                </TouchableOpacity>

                                <View className="flex-row items-center justify-center mb-8">
                                    {/* Header logo */}
                                    <Ionicons name="restaurant" size={32} color={colors.primary} />
                                    <AnimatedText variant="heading2" className="ml-2" style={{ color: colors.textInverted }}>
                                        FoodSaver
                                    </AnimatedText>
                                </View>

                                <View className="items-center mb-12">
                                    <AnimatedText variant="heading1" className="mb-2 text-center" style={{ color: colors.textInverted }}>
                                        Welcome Back
                                    </AnimatedText>

                                    <AnimatedText
                                        variant="subtitle"
                                        className="mb-8 text-center"
                                        style={{ color: colors.textInverted + "CC" }}
                                    >
                                        Select your role to continue
                                    </AnimatedText>
                                </View>

                                <Card variant="elevated" className="p-8 mb-6">
                                    {roles.map((role, index) => (
                                        <Animated.View
                                            key={role.id}
                                            style={{
                                                opacity: roleAnimations[index].fadeAnim,
                                                transform: [{ translateY: roleAnimations[index].slideAnim }],
                                            }}
                                        >
                                            <TouchableOpacity
                                                className={`flex-row items-center p-4 mb-4 rounded-xl border-2`}
                                                style={{
                                                    borderColor: selectedRole?.id === role.id ? colors.primary : colors.border,
                                                    backgroundColor: selectedRole?.id === role.id ? colors.primary + "10" : "transparent",
                                                }}
                                                onPress={() => setSelectedRole(role)}
                                                activeOpacity={0.7}
                                            >
                                                <View
                                                    className="w-12 h-12 rounded-full items-center justify-center mr-4"
                                                    style={{ backgroundColor: colors.primary + "20" }}
                                                >
                                                    {role.icon}
                                                </View>
                                                <View className="flex-1">
                                                    <AnimatedText variant="heading3" style={{ fontSize: 18 }}>
                                                        {role.title}
                                                    </AnimatedText>
                                                    <AnimatedText variant="caption">{role.description}</AnimatedText>
                                                </View>

                                                {selectedRole?.id === role.id && (
                                                    <View
                                                        className="w-6 h-6 rounded-full items-center justify-center"
                                                        style={{ backgroundColor: colors.primary }}
                                                    >
                                                        {/* Selected role indicator */}
                                                        <Ionicons name="arrow-forward" size={14} color={colors.textInverted} />
                                                    </View>
                                                )}
                                            </TouchableOpacity>
                                        </Animated.View>
                                    ))}

                                    <Animated.View
                                        style={{
                                            opacity: roleAnimations[0].fadeAnim,
                                            transform: [{ translateY: roleAnimations[0].slideAnim }],
                                        }}
                                    >
                                        <Button
                                            title="Continue"
                                            variant="primary"
                                            size="large"
                                            fullWidth
                                            className="mt-6"
                                            disabled={!selectedRole}
                                            loading={loading}
                                            onPress={handleContinue}
                                        />

                                        <View className="flex-row justify-center mt-6">
                                            <AnimatedText variant="body" className="mr-1">
                                                Don't have an account?
                                            </AnimatedText>
                                            <TouchableOpacity onPress={() => navigateTo("/register")}>
                                                <AnimatedText
                                                    variant="body"
                                                    style={{
                                                        color: colors.primary,
                                                        fontFamily: "Poppins-SemiBold",
                                                    }}
                                                >
                                                    Register
                                                </AnimatedText>
                                            </TouchableOpacity>
                                        </View>
                                    </Animated.View>
                                </Card>
                            </View>
                        </ScrollView>
                    </KeyboardAvoidingView>
                </LinearGradient>
            </ImageBackground>
        </ScreenContainer>
    )
}
