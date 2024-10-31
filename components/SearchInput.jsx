import { icons } from "@/constants";
import { router, useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Image, TextInput, TouchableOpacity, View } from "react-native";

const SearchInput = ({
  initialQuery,
  placeholder = "Search for a video topic",
}) => {
  const [query, setQuery] = useState(initialQuery ?? "");
  const { pathname, setParams } = useRouter();

  const handleSearch = () => {
    if (!query.trim()) {
      return Alert.alert("Missing Query", "Please enter a query");
    }

    if (pathname && pathname.startsWith("/search")) {
      setParams({
        query: query.trim(),
      });
    } else {
      router.navigate(`/search/${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <View className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-500 focus:border-secondary items-center flex-row space-x-4">
      <TextInput
        className="text-base mt-0.5 text-white flex-1 font-pregular"
        value={query}
        onChangeText={setQuery}
        placeholder={placeholder}
        placeholderTextColor="#CDCDE0"
      />
      <TouchableOpacity onPress={handleSearch}>
        <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
