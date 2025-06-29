"use client"

import { useState, useEffect } from "react"
import { View, ScrollView, TouchableOpacity, ImageBackground, Dimensions, StatusBar as RNStatusBar } from "react-native"
import { useRouter } from "expo-router"
import { LinearGradient } from "expo-linear-gradient"
// Replace the Lucide imports with Ionicons
import { Ionicons } from "@expo/vector-icons"
// Remove these imports
// import { Utensils, ChevronLeft, Mail, Lock, User, Check, Eye, EyeOff } from "lucide-react-native"
import Animated from "react-native-reanimated"
import { useTheme } from "../context/theme-context"
import { useAnimation } from "../context/animation-context"
import AnimatedText from "../components/ui/animated-text"
import Button from "../components/ui/button"
import Card from "../components/ui/card"
import Input from "../components/ui/input"

const { width, height } = Dimensions.get("window")

export default function RegisterScreen() {
    const router = useRouter()
    const { colors } = useTheme()
    const { createStaggeredAnimation } = useAnimation()

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    })

    const [errors, setErrors] = useState({})
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [agreedToTerms, setAgreedToTerms] = useState(false)

    // Create staggered animations for form fields
    const { animations: formAnimations, startAllAnimations: startFormAnimations } = createStaggeredAnimation(5, 300, 100) // 4 fields + button

    // Start animations when component mounts
    useEffect(() => {
        const timeout = setTimeout(() => {
            startFormAnimations()
        }, 300)

        return () => clearTimeout(timeout)
    }, [])

    const handleChange = (field, value) => {
        setFormData({
            ...formData,
            [field]: value,
        })

        // Clear error when typing
        if (errors[field]) {
            setErrors({
                ...errors,
                [field]: null,
            })
        }
    }

    const validate = () => {
        const newErrors = {}

        if (!formData.name) newErrors.name = "Name is required"
        if (!formData.email) newErrors.email = "Email is required"
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid"

        if (!formData.password) newErrors.password = "Password is required"
        else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters"

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match"
        }

        if (!agreedToTerms) {
            newErrors.terms = "You must agree to the Terms of Service"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleRegister = () => {
        if (validate()) {
            // Registration logic would go here
            router.push("/user/index")
        }
    }

    return (
        <View className="flex-1">
            <RNStatusBar barStyle="light-content" />

            <ImageBackground
                source={{
                    uri: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/istockphoto-1299421209-612x612.jpg-ctxZ9W2vWEHUNfHOeoblflKPendP8N.jpeg",
                }}
                style={{ width: "100%", height: "100%" }}
            >
                <LinearGradient colors={["rgba(0,0,0,0.8)", "rgba(0,0,0,0.7)"]} className="flex-1">
                    <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 40 }}>
                        <View className="px-6 pt-12">
                            <TouchableOpacity onPress={() => router.back()} className="flex-row items-center mb-6">
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
                                    Create Account
                                </AnimatedText>

                                <AnimatedText
                                    variant="subtitle"
                                    className="mb-8 text-center"
                                    style={{ color: colors.textInverted + "CC" }}
                                >
                                    Join as a regular user to discover and review restaurants
                                </AnimatedText>
                            </View>

                            <Card variant="elevated" className="p-8 mb-6">
                                <Animated.View
                                    style={{
                                        opacity: formAnimations[0].fadeAnim,
                                        transform: [{ translateY: formAnimations[0].slideAnim }],
                                    }}
                                >
                                    <Input
                                        label="Full Name"
                                        placeholder="Enter your full name"
                                        value={formData.name}
                                        onChangeText={(text) => handleChange("name", text)}
                                        error={errors.name}
                                        leftIcon={<Ionicons name="person" size={20} color={colors.primary} />}
                                        autoCapitalize="words"
                                    />
                                </Animated.View>

                                <Animated.View
                                    style={{
                                        opacity: formAnimations[1].fadeAnim,
                                        transform: [{ translateY: formAnimations[1].slideAnim }],
                                    }}
                                >
                                    <Input
                                        label="Email Address"
                                        placeholder="Enter your email"
                                        value={formData.email}
                                        onChangeText={(text) => handleChange("email", text)}
                                        error={errors.email}
                                        leftIcon={<Ionicons name="mail" size={20} color={colors.primary} />}
                                        keyboardType="email-address"
                                    />
                                </Animated.View>

                                <Animated.View
                                    style={{
                                        opacity: formAnimations[2].fadeAnim,
                                        transform: [{ translateY: formAnimations[2].slideAnim }],
                                    }}
                                >
                                    <Input
                                        label="Password"
                                        placeholder="Create a password"
                                        value={formData.password}
                                        onChangeText={(text) => handleChange("password", text)}
                                        error={errors.password}
                                        leftIcon={<Ionicons name="lock-closed" size={20} color={colors.primary} />}
                                        rightIcon={
                                            showPassword ? (
                                                <Ionicons name="eye-off" size={20} color={colors.textLight} />
                                            ) : (
                                                <Ionicons name="eye" size={20} color={colors.textLight} />
                                            )
                                        }
                                        onRightIconPress={() => setShowPassword(!showPassword)}
                                        secureTextEntry={!showPassword}
                                    />
                                </Animated.View>

                                <Animated.View
                                    style={{
                                        opacity: formAnimations[3].fadeAnim,
                                        transform: [{ translateY: formAnimations[3].slideAnim }],
                                    }}
                                >
                                    <Input
                                        label="Confirm Password"
                                        placeholder="Confirm your password"
                                        value={formData.confirmPassword}
                                        onChangeText={(text) => handleChange("confirmPassword", text)}
                                        error={errors.confirmPassword}
                                        leftIcon={<Ionicons name="lock-closed" size={20} color={colors.primary} />}
                                        rightIcon={
                                            showConfirmPassword ? (
                                                <Ionicons name="eye-off" size={20} color={colors.textLight} />
                                            ) : (
                                                <Ionicons name="eye" size={20} color={colors.textLight} />
                                            )
                                        }
                                        onRightIconPress={() => setShowConfirmPassword(!showConfirmPassword)}
                                        secureTextEntry={!showConfirmPassword}
                                    />
                                </Animated.View>

                                <Animated.View
                                    style={{
                                        opacity: formAnimations[4].fadeAnim,
                                        transform: [{ translateY: formAnimations[4].slideAnim }],
                                    }}
                                >
                                    <TouchableOpacity
                                        className="flex-row items-center mb-6"
                                        onPress={() => setAgreedToTerms(!agreedToTerms)}
                                    >
                                        <View
                                            className="w-5 h-5 rounded-md items-center justify-center mr-2"
                                            style={{
                                                borderWidth: 2,
                                                borderColor: errors.terms ? colors.error : colors.primary,
                                                backgroundColor: agreedToTerms ? colors.primary : "transparent",
                                            }}
                                        >
                                            {/* Checkbox icon */}
                                            {agreedToTerms && <Ionicons name="checkmark" size={12} color={colors.textInverted} />}
                                        </View>
                                        <AnimatedText variant="caption" className="flex-1">
                                            I agree to the{" "}
                                            <AnimatedText
                                                variant="caption"
                                                style={{
                                                    color: colors.primary,
                                                    fontFamily: "Poppins-SemiBold",
                                                }}
                                            >
                                                Terms of Service
                                            </AnimatedText>{" "}
                                            and{" "}
                                            <AnimatedText
                                                variant="caption"
                                                style={{
                                                    color: colors.primary,
                                                    fontFamily: "Poppins-SemiBold",
                                                }}
                                            >
                                                Privacy Policy
                                            </AnimatedText>
                                        </AnimatedText>
                                    </TouchableOpacity>

                                    {errors.terms && (
                                        <AnimatedText variant="caption" className="mb-6" style={{ color: colors.error }}>
                                            {errors.terms}
                                        </AnimatedText>
                                    )}

                                    <Button title="Create Account" variant="primary" size="large" fullWidth onPress={handleRegister} />

                                    <View className="flex-row justify-center mt-6">
                                        <AnimatedText variant="body" className="mr-1">
                                            Already have an account?
                                        </AnimatedText>
                                        <TouchableOpacity onPress={() => router.push("/login")}>
                                            <AnimatedText
                                                variant="body"
                                                style={{
                                                    color: colors.primary,
                                                    fontFamily: "Poppins-SemiBold",
                                                }}
                                            >
                                                Login
                                            </AnimatedText>
                                        </TouchableOpacity>
                                    </View>
                                </Animated.View>
                            </Card>
                        </View>
                    </ScrollView>
                </LinearGradient>
            </ImageBackground>
        </View>
    )
}
