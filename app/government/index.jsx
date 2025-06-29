"use client"

import { useState } from "react"
import { View, Text, TouchableOpacity, ScrollView, Image, TextInput } from "react-native"
import { useRouter } from "expo-router"
import { StatusBar } from "expo-status-bar"
import Animated, { FadeInDown } from "react-native-reanimated"

export default function GovernmentDashboard() {
    const router = useRouter()
    const [activeTab, setActiveTab] = useState("overview")

    const centres = [
        { id: 1, name: "Amma Canteen - T Nagar", status: "operational", meals: 450, rating: 4.2 },
        { id: 2, name: "Mid-Day Meal Centre - Adyar", status: "warning", meals: 320, rating: 3.8 },
        { id: 3, name: "Amma Canteen - Velachery", status: "operational", meals: 380, rating: 4.5 },
    ]

    const inspections = [
        { id: 1, centre: "Amma Canteen - T Nagar", date: "May 15, 2025", status: "completed", rating: 4.2 },
        { id: 2, centre: "Mid-Day Meal Centre - Adyar", date: "May 10, 2025", status: "issues", rating: 3.8 },
        { id: 3, centre: "Amma Canteen - Velachery", date: "May 5, 2025", status: "completed", rating: 4.5 },
        { id: 4, centre: "Mid-Day Meal Centre - Mylapore", date: "May 2, 2025", status: "completed", rating: 4.0 },
    ]

    const staffPerformance = [
        { id: 1, name: "Rajesh Kumar", role: "Chef", attendance: "95%", productivity: "High", rating: 4.8 },
        { id: 2, name: "Lakshmi S", role: "Server", attendance: "90%", productivity: "Medium", rating: 4.2 },
        { id: 3, name: "Venkat R", role: "Manager", attendance: "98%", productivity: "High", rating: 4.7 },
    ]

    const renderTabContent = () => {
        switch (activeTab) {
            case "overview":
                return (
                    <View>
                        <View className="flex-row flex-wrap justify-between mb-6">
                            <Animated.View
                                entering={FadeInDown.delay(300).duration(500)}
                                className="w-[48%] bg-green-50 rounded-xl p-4 mb-4"
                            >
                                <View className="flex-row justify-between items-center mb-2">
                                    <Text className="text-green-900 font-bold">Total Centres</Text>
                                    <Building2 size={20} color="#2E7D32" />
                                </View>
                                <Text className="text-2xl font-bold text-green-800">24</Text>
                                <Text className="text-green-600 text-sm">All operational</Text>
                            </Animated.View>

                            <Animated.View
                                entering={FadeInDown.delay(400).duration(500)}
                                className="w-[48%] bg-green-50 rounded-xl p-4 mb-4"
                            >
                                <View className="flex-row justify-between items-center mb-2">
                                    <Text className="text-green-900 font-bold">Meals Today</Text>
                                    <Utensils size={20} color="#2E7D32" />
                                </View>
                                <Text className="text-2xl font-bold text-green-800">5,280</Text>
                                <Text className="text-green-600 text-sm">+8% from yesterday</Text>
                            </Animated.View>

                            <Animated.View
                                entering={FadeInDown.delay(500).duration(500)}
                                className="w-[48%] bg-green-50 rounded-xl p-4 mb-4"
                            >
                                <View className="flex-row justify-between items-center mb-2">
                                    <Text className="text-green-900 font-bold">Food Waste</Text>
                                    <AlertTriangle size={20} color="#2E7D32" />
                                </View>
                                <Text className="text-2xl font-bold text-green-800">42 kg</Text>
                                <Text className="text-red-600 text-sm">-12% from yesterday</Text>
                            </Animated.View>

                            <Animated.View
                                entering={FadeInDown.delay(600).duration(500)}
                                className="w-[48%] bg-green-50 rounded-xl p-4 mb-4"
                            >
                                <View className="flex-row justify-between items-center mb-2">
                                    <Text className="text-green-900 font-bold">Staff</Text>
                                    <Users size={20} color="#2E7D32" />
                                </View>
                                <Text className="text-2xl font-bold text-green-800">156</Text>
                                <Text className="text-green-600 text-sm">92% attendance</Text>
                            </Animated.View>
                        </View>

                        <Animated.View entering={FadeInDown.delay(700).duration(500)} className="mb-6">
                            <View className="flex-row justify-between items-center mb-4">
                                <Text className="text-xl font-bold text-green-900">Centre Status</Text>
                                <TouchableOpacity>
                                    <Text className="text-green-700">View All</Text>
                                </TouchableOpacity>
                            </View>

                            {centres.map((centre) => (
                                <View key={centre.id} className="bg-white rounded-xl p-4 mb-3 shadow-sm">
                                    <View className="flex-row justify-between items-center">
                                        <View className="flex-row items-center">
                                            <View
                                                className={`w-10 h-10 rounded-full ${
                                                    centre.status === "operational" ? "bg-green-100" : "bg-orange-100"
                                                } items-center justify-center mr-3`}
                                            >
                                                <Building2 size={20} color={centre.status === "operational" ? "#2E7D32" : "#F59E0B"} />
                                            </View>
                                            <View>
                                                <Text className="font-bold text-gray-800">{centre.name}</Text>
                                                <View className="flex-row items-center">
                                                    <Text
                                                        className={`text-sm ${
                                                            centre.status === "operational" ? "text-green-600" : "text-orange-500"
                                                        } mr-2`}
                                                    >
                                                        {centre.status === "operational" ? "Operational" : "Needs Attention"}
                                                    </Text>
                                                    <Text className="text-gray-600">•</Text>
                                                    <Text className="text-gray-600 ml-2">{centre.meals} meals today</Text>
                                                </View>
                                            </View>
                                        </View>
                                        <TouchableOpacity>
                                            <ChevronRight size={20} color="#6B7280" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ))}
                        </Animated.View>

                        <Animated.View entering={FadeInDown.delay(800).duration(500)}>
                            <View className="flex-row justify-between items-center mb-4">
                                <Text className="text-xl font-bold text-green-900">Recent Inspections</Text>
                                <TouchableOpacity>
                                    <Text className="text-green-700">View All</Text>
                                </TouchableOpacity>
                            </View>

                            {inspections.map((inspection) => (
                                <View key={inspection.id} className="bg-white rounded-xl p-4 mb-3 shadow-sm">
                                    <View className="flex-row justify-between items-center">
                                        <View className="flex-row items-center">
                                            <View
                                                className={`w-10 h-10 rounded-full ${
                                                    inspection.status === "completed" ? "bg-green-100" : "bg-orange-100"
                                                } items-center justify-center mr-3`}
                                            >
                                                <FileText size={20} color={inspection.status === "completed" ? "#2E7D32" : "#F59E0B"} />
                                            </View>
                                            <View>
                                                <Text className="font-bold text-gray-800">{inspection.centre}</Text>
                                                <View className="flex-row items-center">
                                                    <Calendar size={12} color="#6B7280" className="mr-1" />
                                                    <Text className="text-gray-600 mr-2">{inspection.date}</Text>
                                                    <Text className="text-gray-600">•</Text>
                                                    <Text
                                                        className={`ml-2 ${
                                                            inspection.status === "completed" ? "text-green-600" : "text-orange-500"
                                                        }`}
                                                    >
                                                        {inspection.status === "completed" ? "Completed" : "Issues Found"}
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                        <View className="bg-green-100 px-2 py-1 rounded-full">
                                            <Text className="text-green-800 font-medium">{inspection.rating}/5</Text>
                                        </View>
                                    </View>
                                </View>
                            ))}
                        </Animated.View>
                    </View>
                )

            case "forecast":
                return (
                    <View>
                        <Animated.View entering={FadeInDown.delay(300).duration(500)} className="mb-6">
                            <Text className="text-xl font-bold text-green-900 mb-4">AI Forecasts</Text>

                            <View className="bg-white rounded-xl p-5 shadow-sm mb-4">
                                <Text className="font-bold text-gray-800 mb-3">Meal Demand Prediction</Text>

                                <Image
                                    source={require("../../assets/favicon.png")}
                                    className="w-full h-40 mb-4"
                                    resizeMode="contain"
                                />

                                <View className="flex-row justify-between mb-2">
                                    <Text className="text-gray-600">Today's Estimate</Text>
                                    <Text className="font-medium">5,500 - 6,000 meals</Text>
                                </View>

                                <View className="flex-row justify-between mb-2">
                                    <Text className="text-gray-600">Tomorrow's Estimate</Text>
                                    <Text className="font-medium">5,800 - 6,200 meals</Text>
                                </View>

                                <View className="flex-row justify-between">
                                    <Text className="text-gray-600">Weekly Trend</Text>
                                    <Text className="font-medium text-green-600">+5% increase</Text>
                                </View>
                            </View>

                            <View className="bg-white rounded-xl p-5 shadow-sm mb-4">
                                <Text className="font-bold text-gray-800 mb-3">Overproduction Risk</Text>

                                <View className="flex-row items-center justify-between mb-3 p-3 bg-red-50 rounded-lg">
                                    <View className="flex-row items-center">
                                        <View className="w-8 h-8 rounded-full bg-red-200 items-center justify-center mr-2">
                                            <AlertTriangle size={16} color="#DC2626" />
                                        </View>
                                        <View>
                                            <Text className="text-gray-800 font-medium">Amma Canteen - Velachery</Text>
                                            <Text className="text-gray-600">Consistently overproducing by 15%</Text>
                                        </View>
                                    </View>
                                    <TouchableOpacity className="bg-red-600 px-3 py-1 rounded-full">
                                        <Text className="text-white font-medium">Alert</Text>
                                    </TouchableOpacity>
                                </View>

                                <View className="flex-row items-center justify-between p-3 bg-orange-50 rounded-lg">
                                    <View className="flex-row items-center">
                                        <View className="w-8 h-8 rounded-full bg-orange-200 items-center justify-center mr-2">
                                            <AlertTriangle size={16} color="#F59E0B" />
                                        </View>
                                        <View>
                                            <Text className="text-gray-800 font-medium">Mid-Day Meal Centre - Adyar</Text>
                                            <Text className="text-gray-600">Occasional overproduction (8%)</Text>
                                        </View>
                                    </View>
                                    <TouchableOpacity className="bg-orange-500 px-3 py-1 rounded-full">
                                        <Text className="text-white font-medium">Monitor</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View className="bg-white rounded-xl p-5 shadow-sm">
                                <Text className="font-bold text-gray-800 mb-3">Stock Optimization</Text>

                                <Text className="text-gray-700 mb-4">
                                    Based on our AI analysis, the following adjustments are recommended for the next procurement cycle:
                                </Text>

                                <View className="flex-row items-center justify-between mb-2">
                                    <Text className="text-gray-700">Rice</Text>
                                    <Text className="font-medium text-red-600">-10% (excess stock)</Text>
                                </View>

                                <View className="flex-row items-center justify-between mb-2">
                                    <Text className="text-gray-700">Lentils</Text>
                                    <Text className="font-medium text-green-600">+5% (low stock)</Text>
                                </View>

                                <View className="flex-row items-center justify-between mb-2">
                                    <Text className="text-gray-700">Vegetables</Text>
                                    <Text className="font-medium text-green-600">+15% (high demand)</Text>
                                </View>

                                <TouchableOpacity className="bg-green-600 py-3 rounded-xl mt-4">
                                    <Text className="text-white font-bold text-center">Generate Procurement Plan</Text>
                                </TouchableOpacity>
                            </View>
                        </Animated.View>
                    </View>
                )

            case "staff":
                return (
                    <View>
                        <Animated.View entering={FadeInDown.delay(300).duration(500)} className="mb-6">
                            <Text className="text-xl font-bold text-green-900 mb-4">Staff Performance</Text>

                            <View className="bg-white rounded-xl p-5 shadow-sm mb-4">
                                <View className="flex-row justify-between items-center mb-4">
                                    <Text className="font-bold text-gray-800">Overall Metrics</Text>
                                    <TouchableOpacity className="bg-green-100 px-3 py-1 rounded-full">
                                        <Text className="text-green-800 font-medium">This Month</Text>
                                    </TouchableOpacity>
                                </View>

                                <View className="flex-row justify-between mb-4">
                                    <View className="items-center">
                                        <Text className="text-gray-600 mb-1">Attendance</Text>
                                        <Text className="text-2xl font-bold text-green-800">92%</Text>
                                    </View>

                                    <View className="items-center">
                                        <Text className="text-gray-600 mb-1">Productivity</Text>
                                        <Text className="text-2xl font-bold text-green-800">87%</Text>
                                    </View>

                                    <View className="items-center">
                                        <Text className="text-gray-600 mb-1">Satisfaction</Text>
                                        <Text className="text-2xl font-bold text-green-800">4.3/5</Text>
                                    </View>
                                </View>
                            </View>

                            <Text className="font-bold text-gray-800 mb-3">Top Performers</Text>

                            {staffPerformance.map((staff) => (
                                <View key={staff.id} className="bg-white rounded-xl p-4 mb-3 shadow-sm">
                                    <View className="flex-row justify-between items-center">
                                        <View className="flex-row items-center">
                                            <View className="w-10 h-10 rounded-full bg-green-100 items-center justify-center mr-3">
                                                <User size={20} color="#2E7D32" />
                                            </View>
                                            <View>
                                                <Text className="font-bold text-gray-800">{staff.name}</Text>
                                                <View className="flex-row items-center">
                                                    <Text className="text-gray-600 mr-2">{staff.role}</Text>
                                                    <Text className="text-gray-600">•</Text>
                                                    <Text className="text-gray-600 ml-2">Attendance: {staff.attendance}</Text>
                                                </View>
                                            </View>
                                        </View>
                                        <View className="bg-green-100 px-2 py-1 rounded-full">
                                            <Text className="text-green-800 font-medium">{staff.rating}/5</Text>
                                        </View>
                                    </View>

                                    <View className="mt-3 pt-3 border-t border-gray-100 flex-row justify-between">
                                        <Text className="text-gray-600">Productivity</Text>
                                        <Text
                                            className={`font-medium ${staff.productivity === "High" ? "text-green-600" : "text-orange-500"}`}
                                        >
                                            {staff.productivity}
                                        </Text>
                                    </View>
                                </View>
                            ))}

                            <TouchableOpacity className="bg-green-600 py-3 rounded-xl mt-4">
                                <Text className="text-white font-bold text-center">View All Staff</Text>
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
                        <Building2 size={24} color="#2E7D32" />
                        <Text className="ml-2 text-xl font-bold text-green-800">FoodSaver Gov</Text>
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
                    <TextInput className="flex-1 ml-2 text-base" placeholder="Search centres, staff, etc." />
                </View>
            </View>

            {/* Content */}
            <ScrollView className="flex-1 px-6 pt-6 pb-20">
                <View className="mb-6">
                    <Text className="text-2xl font-bold text-green-900">Government Dashboard</Text>
                    <Text className="text-gray-600">Tamil Nadu Food Safety Department</Text>
                </View>

                {renderTabContent()}
            </ScrollView>

            {/* Bottom Navigation */}
            <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 flex-row justify-between">
                <TouchableOpacity
                    className={`items-center py-2 ${activeTab === "overview" ? "border-t-2 border-green-600" : ""}`}
                    onPress={() => setActiveTab("overview")}
                >
                    <BarChart3 size={24} color={activeTab === "overview" ? "#2E7D32" : "#6B7280"} />
                    <Text className={activeTab === "overview" ? "text-green-700 font-medium" : "text-gray-600"}>Overview</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    className={`items-center py-2 ${activeTab === "forecast" ? "border-t-2 border-green-600" : ""}`}
                    onPress={() => setActiveTab("forecast")}
                >
                    <TrendingUp size={24} color={activeTab === "forecast" ? "#2E7D32" : "#6B7280"} />
                    <Text className={activeTab === "forecast" ? "text-green-700 font-medium" : "text-gray-600"}>Forecast</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    className={`items-center py-2 ${activeTab === "staff" ? "border-t-2 border-green-600" : ""}`}
                    onPress={() => setActiveTab("staff")}
                >
                    <Users size={24} color={activeTab === "staff" ? "#2E7D32" : "#6B7280"} />
                    <Text className={activeTab === "staff" ? "text-green-700 font-medium" : "text-gray-600"}>Staff</Text>
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
function TrendingUp(props) {
    return (
        <Animated.View {...props}>
            <Text>📈</Text>
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
