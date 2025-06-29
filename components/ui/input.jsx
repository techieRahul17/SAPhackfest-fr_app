"use client"

import { useState, useEffect } from "react"
import { View, TextInput, Text, TouchableOpacity, Animated, Platform } from "react-native"
import { useTheme } from "../../context/theme-context"
import { useAnimation } from "../../context/animation-context"

const Input = ({
                   label,
                   placeholder,
                   value,
                   onChangeText,
                   secureTextEntry,
                   keyboardType,
                   autoCapitalize = "none",
                   error,
                   leftIcon,
                   rightIcon,
                   onRightIconPress,
                   multiline = false,
                   numberOfLines = 1,
                   className = "",
                   containerClassName = "",
                   style,
                   disabled = false,
                   animate = false,
                   delay = 0,
                   ...props
               }) => {
    const { colors } = useTheme()
    const [isFocused, setIsFocused] = useState(false)
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)
    const { createFadeInAnimation, createSlideUpAnimation } = useAnimation()
    const { fadeAnim, startAnimation: startFade } = createFadeInAnimation(delay, 500)
    const { slideAnim, startAnimation: startSlide } = createSlideUpAnimation(delay, 500)

    useEffect(() => {
        if (animate) {
            startFade()
            startSlide()
        }
    }, [animate])

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible)
    }

    // Determine if this is a password input
    const isPassword = secureTextEntry && !rightIcon

    const renderContent = () => (
        <>
            {label && (
                <Text
                    style={{
                        color: error ? colors.error : colors.text,
                        fontFamily: Platform.OS === "ios" ? "Poppins-Medium" : "Poppins-Medium",
                        marginBottom: 6,
                        fontSize: 14,
                    }}
                    allowFontScaling={false}
                >
                    {label}
                </Text>
            )}

            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    borderWidth: 1.5,
                    borderColor: error ? colors.error : isFocused ? colors.primary : colors.border,
                    borderRadius: 12,
                    backgroundColor: disabled ? colors.border : colors.background,
                    paddingHorizontal: 12,
                    paddingVertical: multiline ? 12 : 0,
                }}
                className={className}
            >
                {leftIcon && <View className="mr-2">{leftIcon}</View>}

                <TextInput
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    placeholderTextColor={colors.textLight}
                    secureTextEntry={isPassword ? !isPasswordVisible : secureTextEntry}
                    keyboardType={keyboardType}
                    autoCapitalize={autoCapitalize}
                    multiline={multiline}
                    numberOfLines={multiline ? numberOfLines : 1}
                    editable={!disabled}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    style={[
                        {
                            flex: 1,
                            color: colors.text,
                            fontFamily: Platform.OS === "ios" ? "Poppins-Regular" : "Poppins-Regular",
                            fontSize: 16,
                            paddingVertical: multiline ? 0 : 14,
                            textAlignVertical: multiline ? "top" : "center",
                        },
                        style,
                    ]}
                    allowFontScaling={false}
                    {...props}
                />

                {isPassword ? (
                    <TouchableOpacity onPress={togglePasswordVisibility} className="ml-2">
                        {isPasswordVisible ? (
                            <EyeOff size={20} color={colors.textLight} />
                        ) : (
                            <Eye size={20} color={colors.textLight} />
                        )}
                    </TouchableOpacity>
                ) : (
                    rightIcon && (
                        <TouchableOpacity onPress={onRightIconPress} className="ml-2">
                            {rightIcon}
                        </TouchableOpacity>
                    )
                )}
            </View>

            {error && (
                <Text
                    style={{
                        color: colors.error,
                        fontFamily: Platform.OS === "ios" ? "Poppins-Regular" : "Poppins-Regular",
                        fontSize: 12,
                        marginTop: 4,
                    }}
                    allowFontScaling={false}
                >
                    {error}
                </Text>
            )}
        </>
    )

    if (animate) {
        return (
            <Animated.View
                className={`mb-4 ${containerClassName}`}
                style={{
                    opacity: fadeAnim,
                    transform: [{ translateY: slideAnim }],
                }}
            >
                {renderContent()}
            </Animated.View>
        )
    }

    return <View className={`mb-4 ${containerClassName}`}>{renderContent()}</View>
}

export default Input
