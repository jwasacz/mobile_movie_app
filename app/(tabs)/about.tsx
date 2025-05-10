import { View, Text, Image, ScrollView } from "react-native";
import React from "react";
import { icons } from "@/constants/icons";
import { SafeAreaView } from "react-native-safe-area-context";

const About = () => {
  return (
    <SafeAreaView className="bg-primary flex-1">
      <ScrollView className="px-5">

        <View className="items-center mt-10">
          
          <Image
            source={icons.logo} 
            className="w-20 h-20"
            resizeMode="contain"
          />
          
          <Text className="text-white text-2xl font-bold mt-6">
            Mobile Movie - App
          </Text>

          <Text className="text-light-200 text-sm mt-2 text-center">
            Twoje źródło najnowszych filmów.
          </Text>
        </View>

        <View className="mt-10">
          <Text className="text-white text-lg font-bold mb-4">
            O aplikacji
          </Text>
          <View className="bg-dark-100 rounded-lg p-4">
            <Text className="text-light-200 text-base leading-relaxed">
              Aplikacja pozwala śledzić aktualnie najpopularniejsze premiery filmów, 
              przeglądać podstawowe informacje o nich, a także zapisywać je do ulubionych,
              by szybko wracać do najciekawszych tytułów.
            </Text>
          </View>
        </View>

        <View className="mt-10">
          <Text className="text-white text-lg font-bold mb-4">
            Jakie funkcjonalności zostały zawarte w projekcie?
          </Text>
          <View className="bg-dark-100 rounded-lg p-4 space-y-3">
            <Text className="text-light-200 text-base">• Zastosowanie wbudowanych komponentów takich jak View, Image, ScrollView czy TextInput ...</Text>
            <Text className="text-light-200 text-base">• Zastosowanie nawigacji Stack navigation oraz Tab navigation</Text>
            <Text className="text-light-200 text-base">• Responsywny desgin strony</Text>
            <Text className="text-light-200 text-base">• Prosty i intuicyjny interfejs wraz z wyszukiwarką filmów</Text>
          </View>
        </View>

        <View className="items-center mt-16 mb-10">
            <Text className="text-light-100 text-xs">
            © 2025
            </Text>
            <Text className="text-light-100 text-xs">
            Jakub Wąsacz 14681
            </Text>
            <Text className="text-light-100 text-xs">
            Korneliusz Świerczek 14933
            </Text>
            <Text className="text-light-100 text-xs">
            Krystian Żak 14912
            </Text>
            
          
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default About;
