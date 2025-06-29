"use client"

import { useState } from "react"
import { View, Text, TouchableOpacity, ScrollView, TextInput } from "react-native"
import { useRouter } from "expo-router"
import { StatusBar } from "expo-status-bar"
import Animated, { FadeInDown } from "react-native-reanimated"

export default function CateringDashboard() {
    const router = useRouter()
    const [activeTab, setActiveTab] = useState("events")

    const upcomingEvents = [
        {
            id: 1,
            name: "Corporate Annual Dinner",
            date: "May 25, 2025",
            time: "7:00 PM",
            location: "Grand Hyatt, Chennai",
            guests: 250,
            status: "confirmed",
        },
        {
            id: 2,
            name: "Wedding Reception",
            date: "May 28, 2025",
            time: "6:30 PM",
            location: "Leela Palace, Chennai",
            guests: 500,
            status: "confirmed",
        },
        {
            id: 3,
            name: "Tech Conference Lunch",
            date: "June 5, 2025",
            time: "12:30 PM",
            location: "ITC Grand Chola, Chennai",
            guests: 300,
            status: "pending",
        },
    ]

    const nearbyNGOs = [
        {
            id: 1,
            name: "Food Bank India",
            distance: "2.3 km",
            rating: 4.8,
            coordinate: { latitude: 13.0827, longitude: 80.2707 },
        },
        {
            id: 2,
            name: "Feeding Hands",
            distance: "3.5 km",
            rating: 4.6,
            coordinate: { latitude: 13.0569, longitude: 80.2425 },
        },
        {
            id: 3,
            name: "Hope Foundation",
            distance: "5.1 km",
            rating: 4.9,
            coordinate: { latitude: 13.1067, longitude: 80.2206 },
        },
    ]

    const wastageStats = [
        { id: 1, event: "Corporate Annual Dinner (Last Year)", total: "45 kg", donated: "38 kg", wasted: "7 kg" },
        { id: 2, event: "Wedding Reception (Last Month)", total: "85 kg", donated: "72 kg", wasted: "13 kg" },
        { id: 3, event: "Tech Conference (Last Week)", total: "52 kg", donated: "48 kg", wasted: "4 kg" },
    ]

    const renderTabContent = () => {
        switch (activeTab) {
            case "events":
                return (
                    <View>
                        <View className="flex-row flex-wrap justify-between mb-6">
                            <Animated.View
                                entering={FadeInDown.delay(300).duration(500)}
                                className="w-[48%] bg-green-50 rounded-xl p-4 mb-4"
                            >
                                <View className="flex-row justify-between items-center mb-2">
                                    <Text className="text-green-900 font-bold">Upcoming</Text>
                                    <Calendar size={20} color="#2E7D32" />
                                </View>

                                <Text className="text-2xl font-bold text-green-800">3</Text>
                                <Text className="text-green-600 text-sm">Next event in 5 days</Text>
                            </Animated.View>

                            <Animated.View
                                entering={FadeInDown.delay(400).duration(500)}
                                className="w-[48%] bg-green-50 rounded-xl p-4 mb-4"
                            >
                                <View className="flex-row justify-between items-center mb-2">
                                    <Text className="text-green-900 font-bold">Total Guests</Text>
                                    <Users size={20} color="#2E7D32" />
                                </View>
                                <Text className="text-2xl font-bold text-green-800">1,050</Text>
                                <Text className="text-green-600 text-sm">Across all events</Text>
                            </Animated.View>

                            <Animated.View
                                entering={FadeInDown.delay(500).duration(500)}
                                className="w-[48%] bg-green-50 rounded-xl p-4 mb-4"
                            >
                                <View className="flex-row justify-between items-center mb-2">
                                    <Text className="text-green-900 font-bold">Food Prepared</Text>
                                    <Utensils size={20} color="#2E7D32" />
                                </View>
                                <Text className="text-2xl font-bold text-green-800">850 kg</Text>
                                <Text className="text-green-600 text-sm">Estimated for all events</Text>
                            </Animated.View>

                            <Animated.View
                                entering={FadeInDown.delay(600).duration(500)}
                                className="w-[48%] bg-green-50 rounded-xl p-4 mb-4"
                            >
                                <View className="flex-row justify-between items-center mb-2">
                                    <Text className="text-green-900 font-bold">Donations</Text>
                                    <Heart size={20} color="#2E7D32" />
                                </View>
                                <Text className="text-2xl font-bold text-green-800">158 kg</Text>
                                <Text className="text-green-600 text-sm">Last month</Text>
                            </Animated.View>
                        </View>

                        <Animated.View entering={FadeInDown.delay(700).duration(500)} className="mb-6">
                            <View className="flex-row justify-between items-center mb-4">
                                <Text className="text-xl font-bold text-green-900">Upcoming Events</Text>
                                <TouchableOpacity>
                                    <Text className="text-green-700">View All</Text>
                                </TouchableOpacity>
                            </View>

                            {upcomingEvents.map((event) => (
                                <View key={event.id} className="bg-white rounded-xl p-4 mb-3 shadow-sm">
                                    <View className="flex-row justify-between items-center mb-2">
                                        <Text className="font-bold text-gray-800">{event.name}</Text>
                                        <View
                                            className={`px-2 py-1 rounded-full ${
                                                event.status === "confirmed" ? "bg-green-100" : "bg-orange-100"
                                            }`}
                                        >
                                            <Text className={event.status === "confirmed" ? "text-green-800" : "text-orange-800"}>
                                                {event.status === "confirmed" ? "Confirmed" : "Pending"}
                                            </Text>
                                        </View>
                                    </View>

                                    <View className="flex-row items-center mb-2">
                                        <Calendar size={16} color="#6B7280" className="mr-2" />
                                        <Text className="text-gray-600 mr-4">{event.date}</Text>
                                        <Clock size={16} color="#6B7280" className="mr-2" />
                                        <Text className="text-gray-600">{event.time}</Text>
                                    </View>

                                    <View className="flex-row items-center mb-2">
                                        <MapPin size={16} color="#6B7280" className="mr-2" />
                                        <Text className="text-gray-600">{event.location}</Text>
                                    </View>

                                    <View className="flex-row items-center justify-between">
                                        <View className="flex-row items-center">
                                            <Users size={16} color="#6B7280" className="mr-2" />
                                            <Text className="text-gray-600">{event.guests} guests</Text>
                                        </View>

                                        <TouchableOpacity className="flex-row items-center">
                                            <Text className="text-green-700 font-medium mr-1">Details</Text>
                                            <ChevronRight size={16} color="#2E7D32" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ))}
                        </Animated.View>
                    </View>
                )

            case "ngo":
                return (
                    <View>
                        <Animated.View entering={FadeInDown.delay(300).duration(500)} className="mb-6">
                            <Text className="text-xl font-bold text-green-900 mb-4">Nearby NGOs for Donation</Text>

                            <View className="bg-white rounded-xl overflow-hidden shadow-sm mb-4">
                                {/* Removed MapView to fix the RNMapsAirModule error */}
                                <View style={{ width: "100%", height: 200 }} className="bg-green-100 items-center justify-center">
                                    <Text className="text-green-800 font-medium">Map View of Nearby NGOs</Text>
                                    <Text className="text-gray-600 text-sm mt-2">(Install react-native-maps to enable this feature)</Text>
                                </View>
                            </View>

                            {nearbyNGOs.map((ngo) => (
                                <View key={ngo.id} className="bg-white rounded-xl p-4 mb-3 shadow-sm">
                                    <View className="flex-row justify-between items-center">
                                        <View className="flex-row items-center">
                                            <View className="w-10 h-10 rounded-full bg-green-100 items-center justify-center mr-3">
                                                <Heart size={20} color="#2E7D32" />
                                            </View>
                                            <View>
                                                <Text className="font-bold text-gray-800">{ngo.name}</Text>
                                                <View className="flex-row items-center">
                                                    <MapPin size={12} color="#6B7280" className="mr-1" />
                                                    <Text className="text-gray-600 mr-2">{ngo.distance}</Text>
                                                    <Star size={12} color="#F59E0B" fill="#F59E0B" className="mr-1" />
                                                    <Text className="text-gray-600">{ngo.rating}</Text>
                                                </View>
                                            </View>
                                        </View>
                                        <TouchableOpacity className="bg-green-600 px-3 py-2 rounded-full">
                                            <Text className="text-white font-medium">Contact</Text>
                                        </TouchableOpacity>
                                    </View>

                                    <View className="mt-3 pt-3 border-t border-gray-100 flex-row justify-between">
                                        <TouchableOpacity className="flex-1 items-center mr-2 py-2 bg-green-100 rounded-lg">
                                            <Text className="text-green-800 font-medium">Get Directions</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity className="flex-1 items-center ml-2 py-2 bg-green-600 rounded-lg">
                                            <Text className="text-white font-medium">Schedule Pickup</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ))}
                        </Animated.View>
                    </View>
                )

            case "wastage":
                return (
                    <View>
                        <Animated.View entering={FadeInDown.delay(300).duration(500)} className="mb-6">
                            <Text className="text-xl font-bold text-green-900 mb-4">Food Wastage Analytics</Text>

                            <View className="bg-white rounded-xl p-5 shadow-sm mb-4">
                                <Text className="font-bold text-gray-800 mb-3">Overall Statistics</Text>

                                <View className="flex-row justify-between mb-4">
                                    <View className="items-center">
                                        <Text className="text-gray-600 mb-1">Total Food</Text>
                                        <Text className="text-2xl font-bold text-green-800">182 kg</Text>
                                    </View>

                                    <View className="items-center">
                                        <Text className="text-gray-600 mb-1">Donated</Text>
                                        <Text className="text-2xl font-bold text-green-800">158 kg</Text>
                                    </View>

                                    <View className="items-center">
                                        <Text className="text-gray-600 mb-1">Wasted</Text>
                                        <Text className="text-2xl font-bold text-red-600">24 kg</Text>
                                    </View>
                                </View>

                                <View className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                                    <View className="h-full bg-green-600" style={{ width: "87%" }} />
                                </View>

                                <Text className="text-center mt-2 text-gray-600">87% of excess food was donated</Text>
                            </View>

                            <Text className="font-bold text-gray-800 mb-3">Event Breakdown</Text>

                            {wastageStats.map((stat) => (
                                <View key={stat.id} className="bg-white rounded-xl p-4 mb-3 shadow-sm">
                                    <Text className="font-bold text-gray-800 mb-2">{stat.event}</Text>

                                    <View className="flex-row justify-between mb-2">
                                        <Text className="text-gray-600">Total Excess Food:</Text>
                                        <Text className="font-medium">{stat.total}</Text>
                                    </View>

                                    <View className="flex-row justify-between mb-2">
                                        <Text className="text-gray-600">Donated:</Text>
                                        <Text className="font-medium text-green-600">{stat.donated}</Text>
                                    </View>

                                    <View className="flex-row justify-between mb-3">
                                        <Text className="text-gray-600">Wasted:</Text>
                                        <Text className="font-medium text-red-600">{stat.wasted}</Text>
                                    </View>

                                    <View className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                                        <View
                                            className="h-full bg-green-600"
                                            style={{
                                                width: `${(Number.parseInt(stat.donated) / Number.parseInt(stat.total)) * 100}%`,
                                            }}
                                        />
                                    </View>
                                </View>
                            ))}

                            <View className="bg-white rounded-xl p-5 shadow-sm mt-4">
                                <View className="flex-row items-center mb-3">
                                    <AlertTriangle size={20} color="#F59E0B" className="mr-2" />
                                    <Text className="font-bold text-gray-800">Recommendations</Text>
                                </View>

                                <Text className="text-gray-700 mb-3">Based on your past events, we recommend:</Text>

                                <View className="mb-2 pl-4 border-l-2 border-green-600">
                                    <Text className="text-gray-700">Reduce rice portions by 15% for corporate events</Text>
                                </View>

                                <View className="mb-2 pl-4 border-l-2 border-green-600">
                                    <Text className="text-gray-700">Schedule NGO pickups 1 hour after event conclusion</Text>
                                </View>

                                <View className="pl-4 border-l-2 border-green-600">
                                    <Text className="text-gray-700">Use smaller serving platters for desserts</Text>
                                </View>
                            </View>
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
                        <Users size={24} color="#2E7D32" />
                        <Text className="ml-2 text-xl font-bold text-green-800">FoodSaver Catering</Text>
                    </View>

                    <View className="flex-row">
                        <TouchableOpacity className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center mr-2">
                            <Bell size={20} color="#2E7D32" />
                            <View className="absolute top-0 right-0 w-3 h-3 rounded-full bg-red-500" />
                        </TouchableOpacity>

                        <TouchableOpacity className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center">
                            <User size={20} color="#2E7D32" />
                        </TouchableOpacity>
                    </View>
                </View>

                <View className="flex-row items-center bg-gray-100 rounded-full px-4 py-2">
                    <Search size={18} color="#6B7280" />
                    <TextInput className="flex-1 ml-2 text-base" placeholder="Search events, NGOs, etc." />
                </View>
            </View>

            {/* Content */}
            <ScrollView className="flex-1 px-6 pt-6 pb-20">
                <View className="mb-6">
                    <Text className="text-2xl font-bold text-green-900">Catering Dashboard</Text>
                    <Text className="text-gray-600">Taj Catering Services</Text>
                </View>

                {renderTabContent()}
            </ScrollView>

            {/* Bottom Navigation */}
            <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 flex-row justify-between">
                <TouchableOpacity
                    className={`items-center py-2 ${activeTab === "events" ? "border-t-2 border-green-600" : ""}`}
                    onPress={() => setActiveTab("events")}
                >
                    <Calendar size={24} color={activeTab === "events" ? "#2E7D32" : "#6B7280"} />
                    <Text className={activeTab === "events" ? "text-green-700 font-medium" : "text-gray-600"}>Events</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    className={`items-center py-2 ${activeTab === "ngo" ? "border-t-2 border-green-600" : ""}`}
                    onPress={() => setActiveTab("ngo")}
                >
                    <Heart size={24} color={activeTab === "ngo" ? "#2E7D32" : "#6B7280"} />
                    <Text className={activeTab === "ngo" ? "text-green-700 font-medium" : "text-gray-600"}>NGOs</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    className={`items-center py-2 ${activeTab === "wastage" ? "border-t-2 border-green-600" : ""}`}
                    onPress={() => setActiveTab("wastage")}
                >
                    <BarChart3 size={24} color={activeTab === "wastage" ? "#2E7D32" : "#6B7280"} />
                    <Text className={activeTab === "wastage" ? "text-green-700 font-medium" : "text-gray-600"}>Wastage</Text>
                </TouchableOpacity>

                <TouchableOpacity className="items-center py-2">
                    <Settings size={24} color="#6B7280" />
                    <Text className="text-gray-600">Settings</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

// Missing imports
function Star(props) {
    return (
        <Animated.View {...props}>
            <Text>⭐</Text>
        </Animated.View>
    )
}

function Settings(props) {
    return (
        <Animated.View {...props}>
            <Text>⚙️</Text>
        </Animated.View>
    )
}
