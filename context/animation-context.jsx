"use client"

import { createContext, useContext } from "react"
import { Animated, Easing } from "react-native"

const AnimationContext = createContext({})

export const useAnimation = () => useContext(AnimationContext)

export const AnimationProvider = ({ children }) => {
    // Fade in animation
    const createFadeInAnimation = (delay = 0, duration = 800) => {
        const fadeAnim = new Animated.Value(0)

        const startAnimation = () => {
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration,
                delay,
                useNativeDriver: true,
                easing: Easing.out(Easing.cubic),
            }).start()
        }

        return { fadeAnim, startAnimation }
    }

    // Slide up animation
    const createSlideUpAnimation = (delay = 0, duration = 800) => {
        const slideAnim = new Animated.Value(50)

        const startAnimation = () => {
            Animated.timing(slideAnim, {
                toValue: 0,
                duration,
                delay,
                useNativeDriver: true,
                easing: Easing.out(Easing.cubic),
            }).start()
        }

        return { slideAnim, startAnimation }
    }

    // Scale animation
    const createScaleAnimation = (delay = 0, duration = 800) => {
        const scaleAnim = new Animated.Value(0.9)

        const startAnimation = () => {
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration,
                delay,
                useNativeDriver: true,
                easing: Easing.out(Easing.cubic),
            }).start()
        }

        return { scaleAnim, startAnimation }
    }

    // Staggered animations for lists
    const createStaggeredAnimation = (numItems, baseDelay = 100, itemDelay = 50) => {
        const animations = Array(numItems)
            .fill()
            .map((_, i) => {
                const fadeAnim = new Animated.Value(0)
                const slideAnim = new Animated.Value(20)

                const startAnimation = () => {
                    const delay = baseDelay + i * itemDelay

                    Animated.parallel([
                        Animated.timing(fadeAnim, {
                            toValue: 1,
                            duration: 500,
                            delay,
                            useNativeDriver: true,
                        }),
                        Animated.timing(slideAnim, {
                            toValue: 0,
                            duration: 500,
                            delay,
                            useNativeDriver: true,
                            easing: Easing.out(Easing.cubic),
                        }),
                    ]).start()
                }

                return { fadeAnim, slideAnim, startAnimation }
            })

        const startAllAnimations = () => {
            animations.forEach((anim) => anim.startAnimation())
        }

        return { animations, startAllAnimations }
    }

    // Pulse animation
    const createPulseAnimation = (delay = 0, duration = 1500) => {
        const pulseAnim = new Animated.Value(1)

        const startAnimation = (loop = true) => {
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1.1,
                    duration: duration / 2,
                    delay,
                    useNativeDriver: true,
                    easing: Easing.out(Easing.sin),
                }),
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: duration / 2,
                    useNativeDriver: true,
                    easing: Easing.in(Easing.sin),
                }),
            ]).start(({ finished }) => {
                if (finished && loop) {
                    startAnimation(loop)
                }
            })
        }

        return { pulseAnim, startAnimation }
    }

    // Rotate animation
    const createRotateAnimation = (delay = 0, duration = 2000) => {
        const rotateAnim = new Animated.Value(0)

        const startAnimation = (loop = true) => {
            Animated.timing(rotateAnim, {
                toValue: 1,
                duration,
                delay,
                useNativeDriver: true,
                easing: Easing.linear,
            }).start(({ finished }) => {
                if (finished && loop) {
                    rotateAnim.setValue(0)
                    startAnimation(loop)
                }
            })
        }

        const interpolatedRotate = rotateAnim.interpolate({
            inputRange: [0, 1],
            outputRange: ["0deg", "360deg"],
        })

        return { rotateAnim, interpolatedRotate, startAnimation }
    }

    // Bounce animation
    const createBounceAnimation = (delay = 0, duration = 800) => {
        const bounceAnim = new Animated.Value(0)

        const startAnimation = () => {
            Animated.spring(bounceAnim, {
                toValue: 1,
                delay,
                useNativeDriver: true,
                friction: 5,
                tension: 40,
            }).start()
        }

        return { bounceAnim, startAnimation }
    }

    return (
        <AnimationContext.Provider
            value={{
                createFadeInAnimation,
                createSlideUpAnimation,
                createScaleAnimation,
                createStaggeredAnimation,
                createPulseAnimation,
                createRotateAnimation,
                createBounceAnimation,
            }}
        >
            {children}
        </AnimationContext.Provider>
    )
}
