import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  const userName = "John Doe";

  return (
    <SafeAreaView className="bg-primary flex-1">
      <ScrollView className="px-5">
        
        <View className="items-center mt-10">
          <Image
            source={images.avatar}
            className="w-24 h-24 rounded-full border-2 border-accent"
          />
          <Text className="text-white text-xl font-bold mt-4">{userName}</Text>

          {/* Przyciski */}
          <View className="flex-row items-center mt-6 space-x-4">
            <TouchableOpacity className="bg-accent py-2 px-6 rounded-full">
              <Text className="text-primary font-semibold">Edytuj profil</Text>
            </TouchableOpacity>
            <TouchableOpacity className="border border-light-100 py-2 px-6 rounded-full">
              <Text className="text-light-200 font-semibold">Ustawienia</Text>
            </TouchableOpacity>
          </View>
        </View>

        
        <View className="mt-10">
          <Text className="text-white text-lg font-bold mb-4">Moje ulubione</Text>
          <View className="bg-dark-100 rounded-lg p-4">
            <Text className="text-light-200 text-sm">Brak ulubionych filmów.</Text>
          </View>
        </View>

        <View className="mt-10">
          <Text className="text-white text-lg font-bold mb-4">Ostatnio oglądane</Text>
          <View className="bg-dark-100 rounded-lg p-4">
            <Text className="text-light-200 text-sm">Brak historii oglądania.</Text>
          </View>
        </View>

        
        <TouchableOpacity className="bg-red-600 py-4 rounded-lg mt-16 mb-10 items-center">
          <Text className="text-white font-bold text-base">Wyloguj się</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
