"use client"

import { View, SafeAreaView, StatusBar, ScrollView, KeyboardAvoidingView, Platform } from "react-native"
import { useTheme } from "../../context/theme-context"

const ScreenContainer = ({
                             children,
                             scrollable = true,
                             safeArea = true,
                             statusBarStyle = "light-content",
                             statusBarColor,
                             keyboardAvoiding = true,
                             backgroundColor,
                             contentContainerStyle,
                             style,
                             padding = true,
                             paddingHorizontal = 16,
                             paddingVertical = 16,
                         }) => {
    const { colors } = useTheme()

    const bgColor = backgroundColor || colors.background
    const statusBgColor = statusBarColor || colors.primary

    const renderContent = () => {
        if (scrollable) {
            return (
                <ScrollView
                    style={[{ flex: 1, backgroundColor: bgColor }, style]}
                    contentContainerStyle={[
                        padding && {
                            paddingHorizontal,
                            paddingVertical,
                            paddingBottom: Platform.OS === "ios" ? 100 : 80, // Extra padding at bottom for keyboard
                        },
                        contentContainerStyle,
                    ]}
                    showsVerticalScrollIndicator={false}
                    bounces={true}
                    keyboardShouldPersistTaps="handled"
                >
                    {children}
                </ScrollView>
            )
        }

        return (
            <View
                style={[
                    {
                        flex: 1,
                        backgroundColor: bgColor,
                        ...(padding && {
                            paddingHorizontal,
                            paddingVertical,
                        }),
                    },
                    style,
                ]}
            >
                {children}
            </View>
        )
    }

    const content = keyboardAvoiding ? (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
        >
            {renderContent()}
        </KeyboardAvoidingView>
    ) : (
        renderContent()
    )

    if (safeArea) {
        return (
            <>
                <StatusBar barStyle={statusBarStyle} backgroundColor={statusBgColor} />
                <SafeAreaView style={{ flex: 0, backgroundColor: statusBgColor }} />
                <SafeAreaView style={{ flex: 1, backgroundColor: bgColor }}>{content}</SafeAreaView>
            </>
        )
    }

    return (
        <>
            <StatusBar barStyle={statusBarStyle} backgroundColor={statusBgColor} />
            {content}
        </>
    )
}

export default ScreenContainer
