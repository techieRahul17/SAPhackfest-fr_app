"use client"

import { useEffect } from "react"
import { Animated, Platform } from "react-native"
import { useAnimation } from "../../context/animation-context"
import { useTheme } from "../../context/theme-context"

const AnimatedText = ({
                          children,
                          style,
                          delay = 0,
                          duration = 800,
                          className = "",
                          variant = "body", // heading1, heading2, heading3, body, caption
                          animation = "fadeSlide", // fadeSlide, fade, scale, none
                      }) => {
    const { createFadeInAnimation, createSlideUpAnimation, createScaleAnimation } = useAnimation()
    const { fadeAnim, startAnimation: startFade } = createFadeInAnimation(delay, duration)
    const { slideAnim, startAnimation: startSlide } = createSlideUpAnimation(delay, duration)
    const { scaleAnim, startAnimation: startScale } = createScaleAnimation(delay, duration)
    const { colors } = useTheme()

    useEffect(() => {
        if (animation === "fadeSlide" || animation === "fade") {
            startFade()
        }

        if (animation === "fadeSlide") {
            startSlide()
        }

        if (animation === "scale") {
            startFade()
            startScale()
        }
    }, [animation])

    // Define text styles based on variant
    let variantStyle = {}

    switch (variant) {
        case "heading1":
            variantStyle = {
                fontFamily: Platform.OS === "ios" ? "Playfair-Bold" : "Playfair-Bold",
                fontSize: 32,
                lineHeight: 40,
                color: colors.text,
                letterSpacing: -0.5,
            }
            break
        case "heading2":
            variantStyle = {
                fontFamily: Platform.OS === "ios" ? "Playfair-Medium" : "Playfair-Medium",
                fontSize: 24,
                lineHeight: 32,
                color: colors.text,
                letterSpacing: -0.3,
            }
            break
        case "heading3":
            variantStyle = {
                fontFamily: Platform.OS === "ios" ? "Poppins-SemiBold" : "Poppins-SemiBold",
                fontSize: 20,
                lineHeight: 28,
                color: colors.text,
            }
            break
        case "subtitle":
            variantStyle = {
                fontFamily: Platform.OS === "ios" ? "Poppins-Medium" : "Poppins-Medium",
                fontSize: 16,
                lineHeight: 24,
                color: colors.textLight,
            }
            break
        case "body":
            variantStyle = {
                fontFamily: Platform.OS === "ios" ? "Poppins-Regular" : "Poppins-Regular",
                fontSize: 16,
                lineHeight: 24,
                color: colors.text,
            }
            break
        case "caption":
            variantStyle = {
                fontFamily: Platform.OS === "ios" ? "Poppins-Regular" : "Poppins-Regular",
                fontSize: 14,
                lineHeight: 20,
                color: colors.textLight,
            }
            break
        default:
            variantStyle = {
                fontFamily: Platform.OS === "ios" ? "Poppins-Regular" : "Poppins-Regular",
                fontSize: 16,
                lineHeight: 24,
                color: colors.text,
            }
    }

    // Apply animations based on the animation type
    let animationStyle = {}

    if (animation === "fadeSlide") {
        animationStyle = {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
        }
    } else if (animation === "fade") {
        animationStyle = {
            opacity: fadeAnim,
        }
    } else if (animation === "scale") {
        animationStyle = {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
        }
    }

    return (
        <Animated.Text style={[variantStyle, animationStyle, style]} className={className} allowFontScaling={false}>
            {children}
        </Animated.Text>
    )
}

export default AnimatedText
