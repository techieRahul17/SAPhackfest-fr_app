"use client"

import { View, TouchableOpacity, Platform } from "react-native"
import { useNavigation } from "../../context/navigation-context"
import { useTheme } from "../../context/theme-context"
import AnimatedText from "./animated-text"
import { Ionicons } from "@expo/vector-icons"
// Remove these imports
// import { ChevronLeft } from "lucide-react-native"

const Header = ({
                    title,
                    showBackButton = true,
                    rightComponent,
                    backgroundColor,
                    titleColor,
                    onBackPress,
                    backIcon,
                    titleVariant = "heading3",
                    titleStyle,
                    style,
                }) => {
    const { goBack } = useNavigation()
    const { colors } = useTheme()

    const handleBackPress = () => {
        if (onBackPress) {
            onBackPress()
        } else {
            goBack()
        }
    }

    return (
        <View
            style={[
                {
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingVertical: 16,
                    paddingHorizontal: 16,
                    backgroundColor: backgroundColor || "transparent",
                    ...Platform.select({
                        ios: {
                            shadowColor: colors.shadow,
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.1,
                            shadowRadius: 4,
                        },
                        android: {
                            elevation: 4,
                        },
                    }),
                },
                style,
            ]}
        >
            <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
                {showBackButton && (
                    <TouchableOpacity
                        onPress={handleBackPress}
                        style={{
                            marginRight: 16,
                            padding: 4,
                        }}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                        {backIcon || <Ionicons name="chevron-back" size={24} color={titleColor || colors.text} />}
                    </TouchableOpacity>
                )}

                <AnimatedText
                    variant={titleVariant}
                    style={[
                        {
                            color: titleColor || colors.text,
                            flex: 1,
                        },
                        titleStyle,
                    ]}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                >
                    {title}
                </AnimatedText>
            </View>

            {rightComponent && <View style={{ marginLeft: 16 }}>{rightComponent}</View>}
        </View>
    )
}

export default Header
