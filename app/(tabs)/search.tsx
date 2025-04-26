import { View, Text, Image, ScrollView, FlatList, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import { useRouter } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
    refetch: loadMovies,
    reset,
  } = useFetch(() => fetchMovies({ query: searchQuery }), false);

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        await loadMovies();
      } else {
        reset();
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  return (
    <View className="flex-1 bg-primary">
      <Image className="absolute z-0 w-full" resizeMode="cover" source={images.bg} />

      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        className="px-5"
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "center",
          gap: 16,
          marginVertical: 16,
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={
          <>
            <View className="flex-row justify-center w-full mt-20">
              <Image source={icons.logo} />
            </View>

            <View className="my-5">
              <SearchBar
                placeholder="Wyszukaj film"
                value={searchQuery}
                onChangeText={(text: string) => setSearchQuery(text)}
              />
            </View>

            {moviesLoading && (
              <ActivityIndicator size="large" color="#0000ff" className="my-3" />
            )}

            {moviesError && (
              <Text className="px-5 my-3 text-red-500">
                Błąd wyszukiwania: {moviesError.message}
              </Text>
            )}

            {!moviesError && !moviesLoading && searchQuery.trim() && movies?.length > 0 && (
              <Text className="text-xl font-bold text-white">
                Wyniki wyszukiwania dla{' '}
                <Text className="text-accent">{searchQuery}</Text>
              </Text>
            )}
          </>
        }
        ListEmptyComponent={
          !moviesLoading && !moviesError && searchQuery.trim() && movies?.length === 0 ? (
            <View className="mt-10">
              <Text className="text-base text-center text-gray-500">
                Brak wyników wyszukiwania 
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  );
};

export default Search;
