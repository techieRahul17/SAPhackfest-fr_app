"use client"

import { useEffect, useRef, useState } from "react"
import {
    View,
    ScrollView,
    Animated,
    Dimensions,
    ImageBackground,
    TouchableOpacity,
    StatusBar as RNStatusBar,
    Platform,
} from "react-native"
import { LinearGradient } from "expo-linear-gradient"
// Replace the Lucide imports with Ionicons
import { Ionicons } from "@expo/vector-icons"
// Remove these imports
// import {
//   ChevronRight,
//   Utensils,
//   BarChart3,
//   Recycle,
//   Heart,
//   Building2,
//   Users,
//   Star,
//   ArrowRight,
//   Sun,
//   Moon,
// } from "lucide-react-native"
import { useTheme } from "../context/theme-context"
import { useAnimation } from "../context/animation-context"
import { useNavigation } from "../context/navigation-context"
import AnimatedText from "../components/ui/animated-text"
import AnimatedImage from "../components/ui/animated-image"
import Button from "../components/ui/button"
import Card from "../components/ui/card"

const { width, height } = Dimensions.get("window")

export default function HomePage() {
    const { colors, isDark, toggleTheme } = useTheme()
    const scrollY = useRef(new Animated.Value(0)).current
    const { createStaggeredAnimation, createPulseAnimation } = useAnimation()
    const { navigateTo } = useNavigation()
    const [isScrolling, setIsScrolling] = useState(false)

    // Pulse animation for CTA button
    const { pulseAnim, startAnimation: startPulse } = createPulseAnimation(1000, 2000)

    // Animations for features section
    const features = [
        {
            icon: <Ionicons name="stats-chart" size={32} color={colors.primary} />,
            title: "AI-Driven Forecasting",
            description: "Predict meal demand using historical data, weather, and attendance patterns",
        },
        {
            icon: <Ionicons name="restaurant" size={32} color={colors.primary} />,
            title: "Real-Time Inventory",
            description: "Auto-update stock levels and get alerts for near-expiry ingredients",
        },
        {
            icon: <Ionicons name="refresh-circle" size={32} color={colors.primary} />,
            title: "Surplus Redistribution",
            description: "Connect with NGOs and food banks to donate excess food",
        },
        {
            icon: <Ionicons name="heart" size={32} color={colors.primary} />,
            title: "CSR Reporting",
            description: "Track food wastage metrics for ESG compliance and CSR impact",
        },
    ]

    // Animations for target customers section
    const customers = [
        {
            icon: <Ionicons name="business" size={32} color={colors.primary} />,
            title: "Government Canteens",
            description: "Optimized for schemes like Mid-Day Meals",
        },
        {
            icon: <Ionicons name="restaurant" size={32} color={colors.primary} />,
            title: "Restaurants",
            description: "Perfect for 1-3 star establishments",
        },
        {
            icon: <Ionicons name="people" size={32} color={colors.primary} />,
            title: "Corporate Cafeterias",
            description: "For TCS, Infosys, Wipro, and more",
        },
        {
            icon: <Ionicons name="heart" size={32} color={colors.primary} />,
            title: "Catering Services",
            description: "For events and large gatherings",
        },
    ]

    const { animations: customerAnimations, startAllAnimations: startCustomerAnimations } = createStaggeredAnimation(
        customers.length,
    )

    // Animations for pricing plans
    const plans = [
        {
            title: "Basic",
            price: "₹4,999",
            period: "/month",
            features: ["Basic tracking", "Limited forecasting", "Email support", "1 user account"],
            recommended: false,
            color: colors.primary,
        },
        {
            title: "Enterprise",
            price: "₹14,999",
            period: "/month",
            features: ["Advanced AI forecasting", "Full integration", "24/7 support", "Unlimited users", "Custom reporting"],
            recommended: true,
            color: colors.primary,
        },
        {
            title: "Government",
            price: "Custom",
            period: "",
            features: [
                "Tender-based pricing",
                "One-time setup",
                "Maintenance fee",
                "Training included",
                "Compliance reports",
            ],
            recommended: false,
            color: colors.primary,
        },
    ]

    const { animations: planAnimations, startAllAnimations: startPlanAnimations } = createStaggeredAnimation(plans.length)

    // Animations for testimonials
    const testimonials = [
        {
            name: "TCS Cafeteria",
            role: "Corporate Client",
            image: require("../assets/foodicon.jpg"),
            text: "Reduced our food wastage by 42% in just three months. The ROI is incredible!",
        },
        {
            name: "Amma Unavagam",
            role: "Government Scheme",
            image: require("../assets/favicon.png"),
            text: "Helped us optimize our meal planning and reduce costs while serving more people.",
        },
        {
            name: "Taj Catering",
            role: "Catering Service",
            image: require("../assets/splash-icon.png"),
            text: "The forecasting tool is a game-changer for our event planning process.",
        },
    ]

    const { animations: testimonialAnimations, startAllAnimations: startTestimonialAnimations } =
        createStaggeredAnimation(testimonials.length)

    // Animations for team members
    const team = [
        { name: "Rahul V S", role: "CEO & Founder", image: require("../assets/p1.jpg") },
        { name: "Ramcharan S", role: "CTO", image: require("../assets/p2.jpg") },
        { name: "Balamurugan S B", role: "Lead Developer", image: require("../assets/p3.jpg") },
        { name: "Yukesh D", role: "UI/UX Designer", image: require("../assets/p4.jpg") },
        { name: "Sakthivel T", role: "Data Scientist", image: require("../assets/p1.jpg") },
    ]

    const { animations: teamAnimations, startAllAnimations: startTeamAnimations } = createStaggeredAnimation(team.length)

    const { animations: featureAnimations, startAllAnimations: startFeatureAnimations } = createStaggeredAnimation(
        features.length,
    )

    // Start all animations when component mounts
    useEffect(() => {
        const timeout = setTimeout(() => {
            startFeatureAnimations()
            startCustomerAnimations()
            startPlanAnimations()
            startTestimonialAnimations()
            startTeamAnimations()
            startPulse()
        }, 500)

        return () => clearTimeout(timeout)
    }, [])

    // Header animation based on scroll position
    const headerOpacity = scrollY.interpolate({
        inputRange: [0, 100],
        outputRange: [0, 1],
        extrapolate: "clamp",
    })

    // Handle scroll events
    const handleScroll = Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
        useNativeDriver: false,
        listener: (event) => {
            const offsetY = event.nativeEvent.contentOffset.y
            setIsScrolling(offsetY > 10)
        },
    })

    // Fade In animation for FAB
    const fadeAnim = useRef(new Animated.Value(0)).current

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start()
    }, [isScrolling])

    return (
        <View className="flex-1 bg-white">
            <RNStatusBar barStyle="light-content" />

            {/* Animated Header */}
            <Animated.View
                style={{
                    opacity: headerOpacity,
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 10,
                    paddingTop: Platform.OS === "ios" ? 50 : RNStatusBar.currentHeight,
                    backgroundColor: colors.background,
                    borderBottomWidth: 1,
                    borderBottomColor: colors.border,
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
                }}
            >
                <View className="flex-row items-center justify-between px-6 py-4">
                    <View className="flex-row items-center">
                        <Ionicons name="restaurant" size={24} color={colors.primary} />
                        <AnimatedText variant="heading3" className="ml-2" style={{ color: colors.primary }}>
                            FoodSaver
                        </AnimatedText>
                    </View>
                    <View className="flex-row items-center">
                        <TouchableOpacity
                            onPress={toggleTheme}
                            className="mr-4 p-2"
                            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                        >
                            {isDark ? (
                                <Ionicons name="sunny" size={20} color={colors.primary} />
                            ) : (
                                <Ionicons name="moon" size={20} color={colors.primary} />
                            )}
                        </TouchableOpacity>
                        <Button title="Login" variant="primary" size="small" onPress={() => navigateTo("/login")} />
                    </View>
                </View>
            </Animated.View>

            <Animated.ScrollView
                className="flex-1"
                showsVerticalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                contentContainerStyle={{ paddingBottom: 40 }}
            >
                {/* Hero Section */}
                <ImageBackground
                    source={{
                        uri: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-dapur-melodi-192125-1109197.jpg-ftT1ERCZ75S9ZzPdvNElPLw9MoYvPD.jpeg",
                    }}
                    className="w-full"
                    style={{ height: height * 0.7 }}
                >
                    <LinearGradient
                        colors={[colors.overlay, "rgba(0,0,0,0.5)", "rgba(0,0,0,0.3)"]}
                        className="flex-1 px-6 pt-16 pb-12 justify-center"
                    >
                        <View className="flex-row items-center justify-between mb-8">
                            <View className="flex-row items-center">
                                <Ionicons name="restaurant" size={32} color={colors.primary} />
                                <AnimatedText variant="heading2" className="ml-2" style={{ color: colors.textInverted }}>
                                    FoodSaver
                                </AnimatedText>
                            </View>
                            <View className="flex-row items-center">
                                <TouchableOpacity
                                    onPress={toggleTheme}
                                    className="mr-4 p-2"
                                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                                >
                                    {isDark ? (
                                        <Ionicons name="sunny" size={20} color={colors.textInverted} />
                                    ) : (
                                        <Ionicons name="moon" size={20} color={colors.textInverted} />
                                    )}
                                </TouchableOpacity>
                                <Button
                                    title="Login"
                                    variant="outline"
                                    size="small"
                                    style={{ borderColor: colors.textInverted }}
                                    textStyle={{ color: colors.textInverted }}
                                    onPress={() => navigateTo("/login")}
                                />
                            </View>
                        </View>

                        <View className="mt-auto">
                            <AnimatedText
                                variant="heading1"
                                delay={300}
                                className="mb-4 w-4/5"
                                style={{ color: colors.textInverted }}
                            >
                                Smart Food Waste Management
                            </AnimatedText>

                            <AnimatedText
                                variant="subtitle"
                                delay={600}
                                className="mb-6 w-4/5"
                                style={{ color: colors.textInverted }}
                            >
                                AI-powered ecosystem for canteens, restaurants, and catering services to reduce food wastage and
                                maximize efficiency.
                            </AnimatedText>

                            <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
                                <Button
                                    title="Get Started"
                                    variant="primary"
                                    size="medium"
                                    icon={<Ionicons name="chevron-forward" size={18} color={colors.textInverted} />}
                                    iconPosition="right"
                                    className="mr-4"
                                    onPress={() => navigateTo("/register")}
                                />
                            </Animated.View>
                        </View>
                    </LinearGradient>
                </ImageBackground>

                {/* Food Quote Section */}
                <View className="py-12 px-6 items-center">
                    <AnimatedImage
                        source={{
                            uri: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/food-related-typographic-quote-vector-10767156.jpg-fQAi42E6o3ye7CR6usdtIOgQkRemNg.jpeg",
                        }}
                        style={{ width: width * 0.9, height: width * 0.9 * 0.75 }}
                        resizeMode="contain"
                        delay={300}
                    />
                </View>

                {/* Features Section */}
                <View className="px-6 py-12 bg-white">
                    <AnimatedText variant="heading2" className="text-center mb-2">
                        Our Features
                    </AnimatedText>

                    <AnimatedText variant="subtitle" className="text-center mb-8">
                        Comprehensive solutions to reduce food wastage
                    </AnimatedText>

                    <View className="flex-row flex-wrap justify-between">
                        {features.map((feature, index) => (
                            <Animated.View
                                key={index}
                                style={{
                                    opacity: featureAnimations[index].fadeAnim,
                                    transform: [{ translateY: featureAnimations[index].slideAnim }],
                                    width: width > 500 ? "48%" : "100%",
                                    marginBottom: 16,
                                }}
                            >
                                <Card variant="elevated" className="h-auto min-h-[180px] justify-between">
                                    <View className="mb-3">{feature.icon}</View>
                                    <View>
                                        <AnimatedText variant="heading3" className="mb-1" style={{ fontSize: 16 }}>
                                            {feature.title}
                                        </AnimatedText>
                                        <AnimatedText variant="caption">{feature.description}</AnimatedText>
                                    </View>
                                </Card>
                            </Animated.View>
                        ))}
                    </View>

                    <TouchableOpacity className="mt-6 self-center flex-row items-center">
                        <AnimatedText
                            variant="subtitle"
                            style={{ color: colors.primary, fontFamily: "Poppins-SemiBold" }}
                            className="mr-2"
                        >
                            View All Features
                        </AnimatedText>
                        <Ionicons name="arrow-forward" size={16} color={colors.primary} />
                    </TouchableOpacity>
                </View>

                {/* For Who Section */}
                <LinearGradient
                    colors={[colors.card, colors.background]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    className="px-6 py-12"
                >
                    <AnimatedText variant="heading2" className="text-center mb-2">
                        Who We Serve
                    </AnimatedText>

                    <AnimatedText variant="subtitle" className="text-center mb-8">
                        Tailored solutions for different food service providers
                    </AnimatedText>

                    <View className="flex-row flex-wrap justify-between">
                        {customers.map((customer, index) => (
                            <Animated.View
                                key={index}
                                style={{
                                    opacity: customerAnimations[index].fadeAnim,
                                    transform: [{ translateY: customerAnimations[index].slideAnim }],
                                    width: width > 500 ? "48%" : "100%",
                                    marginBottom: 16,
                                }}
                            >
                                <Card variant="elevated" className="items-center py-6">
                                    <View className="mb-3">{customer.icon}</View>
                                    <AnimatedText variant="heading3" className="mb-1" style={{ fontSize: 16, textAlign: "center" }}>
                                        {customer.title}
                                    </AnimatedText>
                                    <AnimatedText variant="caption" style={{ textAlign: "center" }}>
                                        {customer.description}
                                    </AnimatedText>
                                </Card>
                            </Animated.View>
                        ))}
                    </View>
                </LinearGradient>

                {/* Pricing Plans */}
                <View className="px-6 py-12 bg-white">
                    <AnimatedText variant="heading2" className="text-center mb-2">
                        Pricing Plans
                    </AnimatedText>

                    <AnimatedText variant="subtitle" className="text-center mb-8">
                        Choose the perfect plan for your needs
                    </AnimatedText>

                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingHorizontal: 8 }}
                        className="mb-8"
                        snapToInterval={width * 0.85}
                        decelerationRate="fast"
                    >
                        {plans.map((plan, index) => (
                            <Animated.View
                                key={index}
                                style={{
                                    opacity: planAnimations[index].fadeAnim,
                                    transform: [{ translateY: planAnimations[index].slideAnim }],
                                    width: width * 0.8,
                                    marginHorizontal: 8,
                                }}
                            >
                                <Card
                                    variant={plan.recommended ? "elevated" : "outlined"}
                                    style={{
                                        borderColor: plan.recommended ? colors.primary : colors.border,
                                        borderWidth: plan.recommended ? 2 : 1,
                                    }}
                                >
                                    {plan.recommended && (
                                        <View
                                            className="absolute -top-3 right-4 px-3 py-1 rounded-full"
                                            style={{ backgroundColor: colors.primary }}
                                        >
                                            <AnimatedText
                                                variant="caption"
                                                style={{ color: colors.textInverted, fontFamily: "Poppins-SemiBold" }}
                                            >
                                                Recommended
                                            </AnimatedText>
                                        </View>
                                    )}

                                    <AnimatedText variant="heading3" className="mb-2">
                                        {plan.title}
                                    </AnimatedText>

                                    <View className="flex-row items-end mb-4">
                                        <AnimatedText variant="heading1" style={{ color: colors.primary }}>
                                            {plan.price}
                                        </AnimatedText>
                                        <AnimatedText variant="subtitle" className="ml-1">
                                            {plan.period}
                                        </AnimatedText>
                                    </View>

                                    {plan.features.map((feature, i) => (
                                        <View key={i} className="flex-row items-center mb-2">
                                            <View className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: colors.primary }} />
                                            <AnimatedText variant="body">{feature}</AnimatedText>
                                        </View>
                                    ))}

                                    <Button
                                        title="Get Started"
                                        variant={plan.recommended ? "primary" : "outline"}
                                        fullWidth
                                        className="mt-6"
                                        onPress={() => navigateTo("/register")}
                                    />
                                </Card>
                            </Animated.View>
                        ))}
                    </ScrollView>

                    <View className="items-center">
                        <AnimatedText variant="subtitle" className="text-center mb-4">
                            Need a custom solution?
                        </AnimatedText>
                        <Button
                            title="Contact Sales"
                            variant="outline"
                            icon={<Ionicons name="arrow-forward" size={16} color={colors.primary} />}
                            iconPosition="right"
                        />
                    </View>
                </View>

                {/* Food Quote Section */}
                <View className="py-12 px-6 items-center">
                    <AnimatedImage
                        source={{
                            uri: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/stock-vector-food-related-typographic-quote-food-old-logo-design-foodstuffs-background-printable-vintage-408738838.jpg-3hKzmoNIQvjJbobVWHewAZFfmZRouN.jpeg",
                        }}
                        style={{ width: width * 0.9, height: width * 0.9 * 0.75 }}
                        resizeMode="contain"
                        delay={300}
                    />
                </View>

                {/* Testimonials */}
                <LinearGradient
                    colors={[colors.card, colors.background]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    className="px-6 py-12"
                >
                    <AnimatedText variant="heading2" className="text-center mb-2">
                        What Our Clients Say
                    </AnimatedText>

                    <AnimatedText variant="subtitle" className="text-center mb-8">
                        Success stories from our partners
                    </AnimatedText>

                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingHorizontal: 8 }}
                        snapToInterval={width * 0.85}
                        decelerationRate="fast"
                    >
                        {testimonials.map((testimonial, index) => (
                            <Animated.View
                                key={index}
                                style={{
                                    opacity: testimonialAnimations[index].fadeAnim,
                                    transform: [{ translateY: testimonialAnimations[index].slideAnim }],
                                    width: width * 0.8,
                                    marginHorizontal: 8,
                                }}
                            >
                                <Card variant="elevated">
                                    <View className="flex-row items-center mb-4">
                                        <View
                                            className="w-12 h-12 rounded-full items-center justify-center mr-3"
                                            style={{ backgroundColor: colors.primary + "20" }}
                                        >
                                            <AnimatedImage
                                                source={testimonial.image}
                                                style={{ width: 36, height: 36 }}
                                                resizeMode="contain"
                                            />
                                        </View>
                                        <View>
                                            <AnimatedText variant="heading3" style={{ fontSize: 16 }}>
                                                {testimonial.name}
                                            </AnimatedText>
                                            <AnimatedText variant="caption">{testimonial.role}</AnimatedText>
                                        </View>
                                    </View>

                                    <AnimatedText variant="body" className="italic mb-4">
                                        "{testimonial.text}"
                                    </AnimatedText>

                                    <View className="flex-row">
                                        {[1, 2, 3, 4, 5].map((star, index) => (
                                            <Ionicons key={index} name="star" size={16} color="#FFB400" />
                                        ))}
                                    </View>
                                </Card>
                            </Animated.View>
                        ))}
                    </ScrollView>
                </LinearGradient>

                {/* CTA Section */}
                <LinearGradient
                    colors={[colors.primary, colors.primaryDark]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    className="px-6 py-12"
                >
                    <AnimatedText variant="heading2" className="text-center mb-4" style={{ color: colors.textInverted }}>
                        Ready to Reduce Food Waste?
                    </AnimatedText>

                    <AnimatedText variant="subtitle" className="text-center mb-8" style={{ color: colors.textInverted + "CC" }}>
                        Join thousands of businesses making a difference
                    </AnimatedText>

                    <View className="flex-row justify-center flex-wrap">
                        <Button
                            title="Get Started"
                            variant="outline"
                            size="medium"
                            icon={<Ionicons name="chevron-forward" size={18} color={colors.textInverted} />}
                            iconPosition="right"
                            className="mr-4 mb-4"
                            style={{ borderColor: colors.textInverted }}
                            textStyle={{ color: colors.textInverted }}
                            onPress={() => navigateTo("/register")}
                        />

                        <Button
                            title="Contact Sales"
                            variant="outline"
                            size="medium"
                            style={{ borderColor: colors.textInverted }}
                            textStyle={{ color: colors.textInverted }}
                        />
                    </View>
                </LinearGradient>

                {/* Footer */}
                <View className="px-6 py-8 bg-gray-900">
                    <View className="flex-row items-center mb-6">
                        <Ionicons name="restaurant" size={24} color={colors.primary} />
                        <AnimatedText variant="heading3" className="ml-2" style={{ color: colors.textInverted }}>
                            FoodSaver
                        </AnimatedText>
                    </View>

                    <View className="flex-row flex-wrap justify-between mb-8">
                        <View className="w-[48%] mb-6">
                            <AnimatedText variant="subtitle" className="mb-3" style={{ color: colors.textInverted }}>
                                Product
                            </AnimatedText>
                            <AnimatedText variant="caption" style={{ color: colors.textInverted + "99" }} className="mb-2">
                                Features
                            </AnimatedText>
                            <AnimatedText variant="caption" style={{ color: colors.textInverted + "99" }} className="mb-2">
                                Pricing
                            </AnimatedText>
                            <AnimatedText variant="caption" style={{ color: colors.textInverted + "99" }} className="mb-2">
                                Case Studies
                            </AnimatedText>
                        </View>

                        <View className="w-[48%] mb-6">
                            <AnimatedText variant="subtitle" className="mb-3" style={{ color: colors.textInverted }}>
                                Company
                            </AnimatedText>
                            <AnimatedText variant="caption" style={{ color: colors.textInverted + "99" }} className="mb-2">
                                About Us
                            </AnimatedText>
                            <AnimatedText variant="caption" style={{ color: colors.textInverted + "99" }} className="mb-2">
                                Team
                            </AnimatedText>
                            <AnimatedText variant="caption" style={{ color: colors.textInverted + "99" }} className="mb-2">
                                Careers
                            </AnimatedText>
                        </View>

                        <View className="w-[48%] mb-6">
                            <AnimatedText variant="subtitle" className="mb-3" style={{ color: colors.textInverted }}>
                                Resources
                            </AnimatedText>
                            <AnimatedText variant="caption" style={{ color: colors.textInverted + "99" }} className="mb-2">
                                Blog
                            </AnimatedText>
                            <AnimatedText variant="caption" style={{ color: colors.textInverted + "99" }} className="mb-2">
                                Support
                            </AnimatedText>
                            <AnimatedText variant="caption" style={{ color: colors.textInverted + "99" }} className="mb-2">
                                Documentation
                            </AnimatedText>
                        </View>

                        <View className="w-[48%] mb-6">
                            <AnimatedText variant="subtitle" className="mb-3" style={{ color: colors.textInverted }}>
                                Legal
                            </AnimatedText>
                            <AnimatedText variant="caption" style={{ color: colors.textInverted + "99" }} className="mb-2">
                                Privacy Policy
                            </AnimatedText>
                            <AnimatedText variant="caption" style={{ color: colors.textInverted + "99" }} className="mb-2">
                                Terms of Service
                            </AnimatedText>
                            <AnimatedText variant="caption" style={{ color: colors.textInverted + "99" }} className="mb-2">
                                Cookie Policy
                            </AnimatedText>
                        </View>
                    </View>

                    <View className="pt-6 border-t border-gray-800">
                        <AnimatedText variant="caption" className="text-center" style={{ color: colors.textInverted + "66" }}>
                            © 2025 FoodSaver. All rights reserved.
                        </AnimatedText>
                    </View>
                </View>
            </Animated.ScrollView>

            {/* Floating Action Button */}
            {isScrolling && (
                <Animated.View
                    style={{
                        position: "absolute",
                        bottom: 20,
                        right: 20,
                        opacity: fadeAnim,
                        transform: [{ scale: pulseAnim }],
                    }}
                >
                    <TouchableOpacity
                        style={{
                            width: 50,
                            height: 50,
                            borderRadius: 25,
                            backgroundColor: colors.primary,
                            justifyContent: "center",
                            alignItems: "center",
                            shadowColor: colors.shadow,
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.3,
                            shadowRadius: 4,
                            elevation: 5,
                        }}
                        onPress={() => {
                            scrollY.setValue(0)
                            setIsScrolling(false)
                        }}
                    >
                        <Ionicons name="chevron-up" size={24} color={colors.textInverted} />
                    </TouchableOpacity>
                </Animated.View>
            )}
        </View>
    )
}
