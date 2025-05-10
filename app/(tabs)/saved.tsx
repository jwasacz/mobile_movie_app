import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import MovieCard from "@/components/MovieCard";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";

const Saved = () => {
  const [savedMovies, setSavedMovies] = useState<any[]>([]);
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      const loadSavedMovies = async () => {
        try {
          const storedMovies = await AsyncStorage.getItem("savedMovies");
          const movies = storedMovies ? JSON.parse(storedMovies) : [];
          setSavedMovies(movies);
        } catch (error) {
          console.error("Błąd podczas ładowania zapisanych filmów:", error);
        }
      };

      loadSavedMovies();
    }, [])
  );

  const clearSavedMovies = async () => {
    try {
      await AsyncStorage.removeItem("savedMovies");
      setSavedMovies([]);
      Alert.alert("Usunięto", "Wszystkie zapisane filmy zostały usunięte.");
    } catch (error) {
      console.error("Błąd podczas usuwania zapisanych filmów:", error);
    }
  };

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute z-0 w-full" />

      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        <Image source={icons.logo} className="w-12 h-10 mx-auto mt-20 mb-5" />

        <Text className="text-white text-2xl font-bold text-center mb-4">
          Saved Movies
        </Text>

        {savedMovies.length > 0 ? (
          <>
            <TouchableOpacity
              onPress={clearSavedMovies}
              style={{
                backgroundColor: "#FF4C4C",
                padding: 12,
                marginHorizontal: 16,
                borderRadius: 10,
                marginBottom: 8,
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "bold" }}>
                Usuń wszystkie filmy
              </Text>
            </TouchableOpacity>

            <FlatList
              data={savedMovies}
              renderItem={({ item }) => <MovieCard {...item} />}
              keyExtractor={(item) => item.id.toString()}
              numColumns={3}
              columnWrapperStyle={{
                justifyContent: "flex-start",
                gap: 20,
                paddingRight: 5,
                marginBottom: 10,
              }}
              className="pb-32 mt-2"
              scrollEnabled={false}
            />
          </>
        ) : (
          <Text
            style={{
              textAlign: "center",
              color: "#aaa",
              marginTop: 20,
              fontSize: 16,
            }}
          >
            Brak zapisanych filmów.
          </Text>
        )}
      </ScrollView>
    </View>
  );
};

export default Saved;
