import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native"; // ← tutaj

const Saved = () => {
  const [savedMovies, setSavedMovies] = useState<any[]>([]);
  const router = useRouter();

  // 🔁 Ładowanie danych przy wejściu na ekran
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

  const renderMovieCard = ({ item }: { item: any }) => (
    <TouchableOpacity
      onPress={() => router.push(`../movies/${item.id.toString()}`)}
      style={{
        backgroundColor: "#1F1F1F",
        padding: 16,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 12,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
      }}
    >
      <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>
        {item.title}
      </Text>
      <Text style={{ color: "#aaa", marginTop: 4 }}>ID: {item.id}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#0F0D23", paddingTop: 20 }}>
      <Text
        style={{
          color: "#fff",
          fontSize: 24,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 12,
        }}
      >
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
            renderItem={renderMovieCard}
            keyExtractor={(item) => `${item.id}-${item.title}`}
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
    </View>
  );
};

export default Saved;
