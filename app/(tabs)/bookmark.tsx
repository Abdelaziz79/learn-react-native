import EmptyState from "@/components/EmptyState";
import SearchInput from "@/components/SearchInput";
import VideoCard from "@/components/VideoCard";
import { useGlobalContext } from "@/context/GlobalProvider";
import { getUserSavedPosts } from "@/lib/appwrite";
import useAppwrite from "@/lib/useAppwrite";
import React from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Bookmark = () => {
  const { user } = useGlobalContext();
  const { data: posts } = useAppwrite(() => getUserSavedPosts(user.$id));
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        renderItem={({ item }: { item: any }) => <VideoCard item={item} />}
        keyExtractor={(item) => item.$id}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 ">
            <Text className="font-psemibold text-2xl text-white">Bookmark</Text>

            <View className="mt-6 mb-8">
              <SearchInput initialQuery={""} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title={"No videos found"}
            subtitle="No videos found for this query"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Bookmark;
