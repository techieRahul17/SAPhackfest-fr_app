"use client"
import { useState, useEffect } from "react"
import { TouchableOpacity, Text, ActivityIndicator, View, Animated, Easing, Platform } from "react-native"
import { useTheme } from "../../context/theme-context"

const Button = ({
                    onPress,
                    title,
                    variant = "primary", // primary, secondary, outline, text, gradient
                    size = "medium", // small, medium, large
                    icon,
                    iconPosition = "left",
                    loading = false,
                    disabled = false,
                    fullWidth = false,
                    className = "",
                    textClassName = "",
                    style,
                    textStyle,
                    animateOnPress = true,
                }) => {
    const { colors } = useTheme()
    const [pressAnim] = useState(new Animated.Value(1))

    // Define button styles based on variant
    let buttonStyles = {}
    let textStyles = {}

    switch (variant) {
        case "primary":
            buttonStyles = {
                backgroundColor: colors.primary,
                borderWidth: 0,
            }
            textStyles = {
                color: colors.textInverted,
            }
            break
        case "secondary":
            buttonStyles = {
                backgroundColor: colors.secondary,
                borderWidth: 0,
            }
            textStyles = {
                color: colors.textInverted,
            }
            break
        case "outline":
            buttonStyles = {
                backgroundColor: "transparent",
                borderWidth: 2,
                borderColor: colors.primary,
            }
            textStyles = {
                color: colors.primary,
            }
            break
        case "text":
            buttonStyles = {
                backgroundColor: "transparent",
                borderWidth: 0,
            }
            textStyles = {
                color: colors.primary,
            }
            break
        case "gradient":
            buttonStyles = {
                backgroundColor: colors.primary,
                borderWidth: 0,
            }
            textStyles = {
                color: colors.textInverted,
            }
            break
        default:
            buttonStyles = {
                backgroundColor: colors.primary,
                borderWidth: 0,
            }
            textStyles = {
                color: colors.textInverted,
            }
    }

    // Define button size styles
    let sizeStyles = {}
    let textSizeStyles = {}

    switch (size) {
        case "small":
            sizeStyles = {
                paddingVertical: 8,
                paddingHorizontal: 16,
                borderRadius: 8,
            }
            textSizeStyles = {
                fontSize: 14,
                fontFamily: Platform.OS === "ios" ? "Poppins-Medium" : "Poppins-Medium",
            }
            break
        case "medium":
            sizeStyles = {
                paddingVertical: 12,
                paddingHorizontal: 24,
                borderRadius: 12,
            }
            textSizeStyles = {
                fontSize: 16,
                fontFamily: Platform.OS === "ios" ? "Poppins-Medium" : "Poppins-Medium",
            }
            break
        case "large":
            sizeStyles = {
                paddingVertical: 16,
                paddingHorizontal: 32,
                borderRadius: 16,
            }
            textSizeStyles = {
                fontSize: 18,
                fontFamily: Platform.OS === "ios" ? "Poppins-SemiBold" : "Poppins-SemiBold",
            }
            break
        default:
            sizeStyles = {
                paddingVertical: 12,
                paddingHorizontal: 24,
                borderRadius: 12,
            }
            textSizeStyles = {
                fontSize: 16,
                fontFamily: Platform.OS === "ios" ? "Poppins-Medium" : "Poppins-Medium",
            }
    }

    // Apply disabled styles
    if (disabled) {
        buttonStyles = {
            ...buttonStyles,
            backgroundColor: variant === "outline" || variant === "text" ? "transparent" : colors.border,
            borderColor: colors.border,
            opacity: 0.7,
        }
        textStyles = {
            ...textStyles,
            color: variant === "outline" || variant === "text" ? colors.textLight : colors.textLight,
        }
    }

    // Apply full width style
    const widthStyle = fullWidth ? { width: "100%" } : {}

    // Handle press animation
    const handlePressIn = () => {
        if (animateOnPress && !disabled && !loading) {
            Animated.timing(pressAnim, {
                toValue: 0.95,
                duration: 100,
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: true,
            }).start()
        }
    }

    const handlePressOut = () => {
        if (animateOnPress && !disabled && !loading) {
            Animated.timing(pressAnim, {
                toValue: 1,
                duration: 200,
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: true,
            }).start()
        }
    }

    // Reset animation when disabled or loading changes
    useEffect(() => {
        pressAnim.setValue(1)
    }, [disabled, loading])

    return (
        <Animated.View
            style={{
                transform: [{ scale: pressAnim }],
                opacity: disabled ? 0.7 : 1,
                ...(fullWidth ? { width: "100%" } : {}),
            }}
        >
            <TouchableOpacity
                onPress={onPress}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                disabled={disabled || loading}
                activeOpacity={0.8}
                style={[
                    buttonStyles,
                    sizeStyles,
                    widthStyle,
                    {
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        elevation: variant !== "text" && !disabled ? 2 : 0,
                        shadowColor: colors.shadow,
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: variant !== "text" && !disabled ? 0.2 : 0,
                        shadowRadius: 4,
                    },
                    style,
                ]}
                className={className}
            >
                {loading ? (
                    <ActivityIndicator
                        size="small"
                        color={variant === "outline" || variant === "text" ? colors.primary : colors.textInverted}
                    />
                ) : (
                    <>
                        {icon && iconPosition === "left" && <View className="mr-2">{icon}</View>}
                        <Text style={[textStyles, textSizeStyles, textStyle]} className={textClassName} allowFontScaling={false}>
                            {title}
                        </Text>
                        {icon && iconPosition === "right" && <View className="ml-2">{icon}</View>}
                    </>
                )}
            </TouchableOpacity>
        </Animated.View>
    )
}

export default Button
