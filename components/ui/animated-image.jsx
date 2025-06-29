"use client"

import { useEffect, useState } from "react"
import { Animated, Image, View, ActivityIndicator } from "react-native"
import { useAnimation } from "../../context/animation-context"
import { useTheme } from "../../context/theme-context"

const AnimatedImage = ({
                           source,
                           style,
                           delay = 0,
                           duration = 800,
                           resizeMode = "cover",
                           className = "",
                           containerClassName = "",
                           showLoadingIndicator = true,
                       }) => {
    const { createFadeInAnimation, createScaleAnimation } = useAnimation()
    const { fadeAnim, startAnimation: startFade } = createFadeInAnimation(delay, duration)
    const { scaleAnim, startAnimation: startScale } = createScaleAnimation(delay, duration)
    const { colors } = useTheme()
    const [isLoading, setIsLoading] = useState(true)
    const [hasError, setHasError] = useState(false)

    useEffect(() => {
        startFade()
        startScale()
    }, [])

    const handleLoad = () => {
        setIsLoading(false)
    }

    const handleError = () => {
        setIsLoading(false)
        setHasError(true)
    }

    return (
        <View className={containerClassName} style={{ position: "relative" }}>
            {isLoading && showLoadingIndicator && (
                <View
                    style={[
                        style,
                        {
                            position: "absolute",
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: colors.card,
                            borderRadius: 8,
                        },
                    ]}
                >
                    <ActivityIndicator size="small" color={colors.primary} />
                </View>
            )}

            <Animated.View
                style={[
                    {
                        opacity: fadeAnim,
                        transform: [{ scale: scaleAnim }],
                        overflow: "hidden",
                        borderRadius: 8,
                    },
                ]}
            >
                <Image
                    source={source}
                    style={style}
                    resizeMode={resizeMode}
                    className={className}
                    onLoad={handleLoad}
                    onError={handleError}
                />

                {hasError && (
                    <View
                        style={[
                            style,
                            {
                                position: "absolute",
                                top: 0,
                                left: 0,
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: colors.card,
                                borderRadius: 8,
                            },
                        ]}
                    >
                        <Text style={{ color: colors.textLight, fontSize: 12 }}>Image not available</Text>
                    </View>
                )}
            </Animated.View>
        </View>
    )
}

export default AnimatedImage
