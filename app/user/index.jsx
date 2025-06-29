"use client"

import { useState } from "react"
import { View, Text, TouchableOpacity, ScrollView, Image, TextInput } from "react-native"
import { useRouter } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { Ionicons } from "@expo/vector-icons"
import Animated, { FadeInDown } from "react-native-reanimated"

export default function UserDashboard() {
    const router = useRouter()
    const [activeTab, setActiveTab] = useState("restaurants")

    const restaurants = [
        {
            id: 1,
            name: "Spice Garden",
            cuisine: "North Indian",
            rating: 4.5,
            safetyRating: 4.8,
            distance: "1.2 km",
            image: require("../../assets/foodicon.jpg"),
        },
        {
            id: 2,
            name: "Green Leaf",
            cuisine: "South Indian",
            rating: 4.2,
            safetyRating: 4.5,
            distance: "0.8 km",
            image: require("../../assets/p1.jpg"),
        },
        {
            id: 3,
            name: "China Town",
            cuisine: "Chinese",
            rating: 4.0,
            safetyRating: 3.9,
            distance: "2.5 km",
            image: require("../../assets/p3.jpg"),
        },
    ]

    const topRated = [
        {
            id: 1,
            name: "Taj Restaurant",
            cuisine: "Multi-cuisine",
            rating: 4.8,
            safetyRating: 4.9,
            wastageReduction: "95%",
            image: require("../../assets/favicon.png"),
        },
        {
            id: 2,
            name: "Green Earth Cafe",
            cuisine: "Organic",
            rating: 4.7,
            safetyRating: 4.8,
            wastageReduction: "92%",
            image: require("../../assets/p4.jpg"),
        },
    ]

    const reviews = [
        {
            id: 1,
            restaurant: "Spice Garden",
            rating: 4,
            safetyRating: 5,
            comment: "Great food and excellent hygiene standards. Staff was wearing proper uniforms and gloves.",
            date: "2 days ago",
            image: require("../../assets/splash-icon.png"),
        },
        {
            id: 2,
            restaurant: "Green Leaf",
            rating: 5,
            safetyRating: 4,
            comment: "Amazing food! Kitchen was visible and clean. They also have a food donation program.",
            date: "1 week ago",
            image: require("../../assets/adaptive-icon.png"),
        },
    ]

    const renderTabContent = () => {
        switch (activeTab) {
            case "restaurants":
                return (
                    <View>
                        <Animated.View entering={FadeInDown.delay(300).duration(500)} className="mb-6">
                            <View className="flex-row items-center justify-between mb-4">
                                <Text className="text-xl font-bold text-green-900">Top Rated for Food Safety</Text>
                                <TouchableOpacity>
                                    <Text className="text-green-700">See All</Text>
                                </TouchableOpacity>
                            </View>

                            <ScrollView
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{ paddingRight: 20 }}
                            >
                                {topRated.map((restaurant) => (
                                    <TouchableOpacity key={restaurant.id} className="mr-4 w-[280px]">
                                        <View className="bg-white rounded-xl shadow-sm overflow-hidden">
                                            <Image source={restaurant.image} className="w-full h-36" resizeMode="cover" />

                                            <View className="absolute top-2 right-2 bg-green-600 px-2 py-1 rounded-full">
                                                <Text className="text-white font-bold text-xs">Top Safety</Text>
                                            </View>

                                            <View className="p-3">
                                                <Text className="font-bold text-lg text-gray-800">{restaurant.name}</Text>
                                                <Text className="text-gray-600 mb-2">{restaurant.cuisine}</Text>

                                                <View className="flex-row items-center justify-between">
                                                    <View className="flex-row items-center">
                                                        <Ionicons name="star" size={16} color="#FFB400" />
                                                        <Text className="ml-1 text-gray-700">{restaurant.rating}</Text>
                                                    </View>

                                                    <View className="flex-row items-center">
                                                        <View className="w-4 h-4 rounded-full bg-green-100 items-center justify-center mr-1">
                                                            <ShieldCheck size={10} color="#2E7D32" />
                                                        </View>
                                                        <Text className="text-gray-700">{restaurant.safetyRating}</Text>
                                                    </View>

                                                    <View className="flex-row items-center">
                                                        <Recycle size={14} color="#2E7D32" className="mr-1" />
                                                        <Text className="text-green-700">{restaurant.wastageReduction}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </Animated.View>

                        <Animated.View entering={FadeInDown.delay(400).duration(500)} className="mb-6">
                            <View className="flex-row items-center justify-between mb-4">
                                <Text className="text-xl font-bold text-green-900">Nearby Restaurants</Text>
                                <TouchableOpacity className="flex-row items-center">
                                    <Ionicons name="filter" size={16} color="#2E7D32" className="mr-1" />
                                    <Text className="text-green-700">Filter</Text>
                                </TouchableOpacity>
                            </View>

                            {restaurants.map((restaurant) => (
                                <TouchableOpacity key={restaurant.id} className="mb-4">
                                    <View className="bg-white rounded-xl shadow-sm overflow-hidden">
                                        <View className="flex-row">
                                            <Image source={restaurant.image} className="w-24 h-24" resizeMode="cover" />

                                            <View className="flex-1 p-3">
                                                <Text className="font-bold text-lg text-gray-800">{restaurant.name}</Text>
                                                <Text className="text-gray-600 mb-2">{restaurant.cuisine}</Text>

                                                <View className="flex-row items-center justify-between">
                                                    <View className="flex-row items-center">
                                                        <Ionicons name="star" size={16} color="#FFB400" />
                                                        <Text className="ml-1 text-gray-700">{restaurant.rating}</Text>
                                                    </View>

                                                    <View className="flex-row items-center">
                                                        <View className="w-4 h-4 rounded-full bg-green-100 items-center justify-center mr-1">
                                                            <ShieldCheck size={10} color="#2E7D32" />
                                                        </View>
                                                        <Text className="text-gray-700">{restaurant.safetyRating}</Text>
                                                    </View>

                                                    <View className="flex-row items-center">
                                                        <Ionicons name="location" size={14} color="#6B7280" className="mr-1" />
                                                        <Text className="text-gray-600">{restaurant.distance}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            ))}

                            <TouchableOpacity className="bg-green-600 py-3 rounded-xl mt-2">
                                <Text className="text-white font-bold text-center">View All Restaurants</Text>
                            </TouchableOpacity>
                        </Animated.View>
                    </View>
                )

            case "reviews":
                return (
                    <View>
                        <Animated.View entering={FadeInDown.delay(300).duration(500)} className="mb-6">
                            <Text className="text-xl font-bold text-green-900 mb-4">Your Reviews</Text>

                            {reviews.map((review) => (
                                <View key={review.id} className="bg-white rounded-xl p-4 mb-4 shadow-sm">
                                    <View className="flex-row items-center mb-3">
                                        <Image source={review.image} className="w-12 h-12 rounded-lg mr-3" />
                                        <View>
                                            <Text className="font-bold text-gray-800">{review.restaurant}</Text>
                                            <View className="flex-row items-center">
                                                <Ionicons name="time" size={12} color="#6B7280" className="mr-1" />
                                                <Text className="text-gray-600">{review.date}</Text>
                                            </View>
                                        </View>
                                    </View>

                                    <Text className="text-gray-700 mb-3">{review.comment}</Text>

                                    <View className="flex-row justify-between">
                                        <View>
                                            <Text className="text-gray-600 mb-1">Food Rating</Text>
                                            <View className="flex-row">
                                                {[...Array(5)].map((_, i) => (
                                                    <Ionicons
                                                        key={i}
                                                        name="star"
                                                        size={16}
                                                        color="#FFB400"
                                                        fill={i < review.rating ? "#FFB400" : "none"}
                                                    />
                                                ))}
                                            </View>
                                        </View>

                                        <View>
                                            <Text className="text-gray-600 mb-1">Safety Rating</Text>
                                            <View className="flex-row">
                                                {[...Array(5)].map((_, i) => (
                                                    <View key={i} className="w-4 h-4 rounded-full bg-green-100 items-center justify-center mr-1">
                                                        <ShieldCheck
                                                            size={10}
                                                            color="#2E7D32"
                                                            style={{ opacity: i < review.safetyRating ? 1 : 0.3 }}
                                                        />
                                                    </View>
                                                ))}
                                            </View>
                                        </View>
                                    </View>

                                    <View className="mt-3 pt-3 border-t border-gray-100 flex-row justify-between">
                                        <TouchableOpacity className="flex-1 items-center mr-2 py-2 bg-gray-100 rounded-lg">
                                            <Text className="text-gray-700 font-medium">Edit</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity className="flex-1 items-center ml-2 py-2 bg-green-600 rounded-lg">
                                            <Text className="text-white font-medium">Share</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ))}

                            <TouchableOpacity className="bg-white rounded-xl p-4 shadow-sm items-center justify-center border-2 border-dashed border-gray-300">
                                <Text className="text-green-700 font-medium">Write a New Review</Text>
                            </TouchableOpacity>
                        </Animated.View>
                    </View>
                )

            case "favorites":
                return (
                    <View>
                        <Animated.View entering={FadeInDown.delay(300).duration(500)} className="mb-6">
                            <Text className="text-xl font-bold text-green-900 mb-4">Your Favorite Restaurants</Text>

                            {restaurants.map((restaurant) => (
                                <View key={restaurant.id} className="bg-white rounded-xl p-4 mb-4 shadow-sm">
                                    <View className="flex-row">
                                        <Image source={restaurant.image} className="w-20 h-20 rounded-lg mr-3" />

                                        <View className="flex-1">
                                            <View className="flex-row justify-between items-start">
                                                <Text className="font-bold text-lg text-gray-800">{restaurant.name}</Text>
                                                <TouchableOpacity>
                                                    <Ionicons name="heart" size={20} color="#EF4444" fill="#EF4444" />
                                                </TouchableOpacity>
                                            </View>

                                            <Text className="text-gray-600 mb-2">{restaurant.cuisine}</Text>

                                            <View className="flex-row items-center">
                                                <View className="flex-row items-center mr-3">
                                                    <Ionicons name="star" size={16} color="#FFB400" />
                                                    <Text className="ml-1 text-gray-700">{restaurant.rating}</Text>
                                                </View>

                                                <View className="flex-row items-center mr-3">
                                                    <View className="w-4 h-4 rounded-full bg-green-100 items-center justify-center mr-1">
                                                        <ShieldCheck size={10} color="#2E7D32" />
                                                    </View>
                                                    <Text className="text-gray-700">{restaurant.safetyRating}</Text>
                                                </View>

                                                <View className="flex-row items-center">
                                                    <Ionicons name="location" size={14} color="#6B7280" className="mr-1" />
                                                    <Text className="text-gray-600">{restaurant.distance}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>

                                    <View className="mt-3 pt-3 border-t border-gray-100 flex-row justify-between">
                                        <TouchableOpacity className="flex-1 items-center mr-2 py-2 bg-green-100 rounded-lg">
                                            <Text className="text-green-800 font-medium">View Menu</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity className="flex-1 items-center ml-2 py-2 bg-green-600 rounded-lg">
                                            <Text className="text-white font-medium">Order Now</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ))}

                            <TouchableOpacity className="bg-green-600 py-3 rounded-xl mt-2">
                                <Text className="text-white font-bold text-center">Explore More Restaurants</Text>
                            </TouchableOpacity>
                        </Animated.View>
                    </View>
                )

            default:
                return null
        }
    }

    return (
        <View className="flex-1 bg-gray-50">
            <StatusBar style="dark" />

            {/* Header */}
            <View className="bg-white pt-12 pb-4 px-6 shadow-sm">
                <View className="flex-row items-center justify-between mb-4">
                    <View className="flex-row items-center">
                        <Ionicons name="restaurant" size={24} color="#2E7D32" />
                        <Text className="ml-2 text-xl font-bold text-green-800">FoodSaver</Text>
                    </View>

                    <View className="flex-row">
                        <TouchableOpacity className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center mr-2">
                            <Ionicons name="notifications" size={20} color="#2E7D32" />
                            <View className="absolute top-0 right-0 w-3 h-3 rounded-full bg-red-500" />
                        </TouchableOpacity>

                        <TouchableOpacity className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center">
                            <Ionicons name="person" size={20} color="#2E7D32" />
                        </TouchableOpacity>
                    </View>
                </View>

                <View className="flex-row items-center bg-gray-100 rounded-full px-4 py-2">
                    <Ionicons name="search" size={18} color="#6B7280" />
                    <TextInput className="flex-1 ml-2 text-base" placeholder="Search restaurants, food, etc." />
                </View>
            </View>

            {/* Content */}
            <ScrollView className="flex-1 px-6 pt-6 pb-20">
                <View className="mb-6">
                    <Text className="text-2xl font-bold text-green-900">Discover Restaurants</Text>
                    <Text className="text-gray-600">Find safe and sustainable dining options</Text>
                </View>

                {renderTabContent()}
            </ScrollView>

            {/* Bottom Navigation */}
            <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 flex-row justify-between">
                <TouchableOpacity
                    className={`items-center py-2 ${activeTab === "restaurants" ? "border-t-2 border-green-600" : ""}`}
                    onPress={() => setActiveTab("restaurants")}
                >
                    <Ionicons name="restaurant" size={24} color={activeTab === "restaurants" ? "#2E7D32" : "#6B7280"} />
                    <Text className={activeTab === "restaurants" ? "text-green-700 font-medium" : "text-gray-600"}>
                        Restaurants
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    className={`items-center py-2 ${activeTab === "reviews" ? "border-t-2 border-green-600" : ""}`}
                    onPress={() => setActiveTab("reviews")}
                >
                    <Ionicons name="star" size={24} color={activeTab === "reviews" ? "#2E7D32" : "#6B7280"} />
                    <Text className={activeTab === "reviews" ? "text-green-700 font-medium" : "text-gray-600"}>Reviews</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    className={`items-center py-2 ${activeTab === "favorites" ? "border-t-2 border-green-600" : ""}`}
                    onPress={() => setActiveTab("favorites")}
                >
                    <Ionicons name="heart" size={24} color={activeTab === "favorites" ? "#2E7D32" : "#6B7280"} />
                    <Text className={activeTab === "favorites" ? "text-green-700 font-medium" : "text-gray-600"}>Favorites</Text>
                </TouchableOpacity>

                <TouchableOpacity className="items-center py-2">
                    <Ionicons name="person" size={24} color="#6B7280" />
                    <Text className="text-gray-600">Profile</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

// Replace the missing icon functions with Ionicons
function ShieldCheck(props) {
    return (
        <Animated.View {...props}>
            <Ionicons name="shield-checkmark" size={10} color={props.color || "#2E7D32"} />
        </Animated.View>
    )
}

function Recycle(props) {
    return (
        <Animated.View {...props}>
            <Ionicons name="refresh-circle" size={14} color={props.color || "#2E7D32"} />
        </Animated.View>
    )
}
