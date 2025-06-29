"use client"
import { useEffect } from "react"
import { View, Animated, Platform } from "react-native"
import { useTheme } from "../../context/theme-context"
import { useAnimation } from "../../context/animation-context"

const Card = ({
                  children,
                  variant = "elevated", // elevated, outlined, flat
                  className = "",
                  style,
                  animate = false,
                  delay = 0,
                  duration = 500,
              }) => {
    const { colors } = useTheme()
    const { createFadeInAnimation, createSlideUpAnimation } = useAnimation()
    const { fadeAnim, startAnimation: startFade } = createFadeInAnimation(delay, duration)
    const { slideAnim, startAnimation: startSlide } = createSlideUpAnimation(delay, duration)

    useEffect(() => {
        if (animate) {
            startFade()
            startSlide()
        }
    }, [animate])

    // Define card styles based on variant
    let cardStyles = {}

    switch (variant) {
        case "elevated":
            cardStyles = {
                backgroundColor: colors.card,
                borderRadius: 16,
                padding: 16,
                shadowColor: colors.shadow,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
                elevation: Platform.OS === "android" ? 4 : 0,
            }
            break
        case "outlined":
            cardStyles = {
                backgroundColor: colors.card,
                borderRadius: 16,
                padding: 16,
                borderWidth: 1,
                borderColor: colors.border,
            }
            break
        case "flat":
            cardStyles = {
                backgroundColor: colors.card,
                borderRadius: 16,
                padding: 16,
            }
            break
        default:
            cardStyles = {
                backgroundColor: colors.card,
                borderRadius: 16,
                padding: 16,
                shadowColor: colors.shadow,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
                elevation: Platform.OS === "android" ? 4 : 0,
            }
    }

    if (animate) {
        return (
            <Animated.View
                style={[
                    cardStyles,
                    style,
                    {
                        opacity: fadeAnim,
                        transform: [{ translateY: slideAnim }],
                    },
                ]}
                className={className}
            >
                {children}
            </Animated.View>
        )
    }

    return (
        <View style={[cardStyles, style]} className={className}>
            {children}
        </View>
    )
}

export default Card
