import { icons } from "@/constants";
import { useGlobalContext } from "@/context/GlobalProvider";
import { savePost } from "@/lib/appwrite";
import { ResizeMode, Video } from "expo-av";
import React, { useState } from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";

const VideoCard = ({
  item: {
    $id,
    title,
    thumbnail,
    video,
    prompt,
    creator: { username, avatar },
  },
}) => {
  const [play, setPlay] = useState(false);
  const { user } = useGlobalContext();
  const handleSave = async () => {
    try {
      await savePost($id, user.$id);
      Alert.alert("Success", "Video saved successfully");
    } catch (err) {
      console.log(err);
      Alert.alert("Error", err.message);
    }
  };
  return (
    <View className="flex-col items-center px-4 mb-14">
      <View className="flex-row items-start gap-3">
        <View className="justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5">
            <Image
              source={{ uri: avatar }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>
          <View className="justify-center flex-1 ml-3 gap-y-1">
            <Text className="text-white font-pmedium text-sm" numberOfLines={1}>
              {title}
            </Text>
            <Text
              className="text-gray-100 font-pregular text-xs"
              numberOfLines={1}
            >
              {username}
            </Text>
          </View>
        </View>
        <View className="pt-2">
          <TouchableOpacity onPress={handleSave}>
            <Image
              source={icons.bookmark}
              style={{ tintColor: "#ff9C01" }}
              className="w-4 h-4 color-secondary "
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
      {play ? (
        <Video
          source={{
            uri: video,
            headers: {
              "User-Agent":
                "Mozilla/5.0 (Linux; Android 13; Pixel 6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
              // Standard mobile headers
              Accept: "*/*",
              "Accept-Language": "en-US,en;q=0.9",
              "Accept-Encoding": "gzip, deflate",
              Connection: "keep-alive",
            },
          }}
          style={{
            width: "100%",
            height: 240,
            borderRadius: 12,
            marginTop: 12,
          }}
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if (status.didJustFinish) setPlay(false);
          }}
          onError={(error) => {
            console.error("Video error:", error);
            setPlay(false); // Go back to thumbnail view if there's an error
          }}
        />
      ) : (
        <TouchableOpacity
          onPress={() => setPlay(true)}
          className="w-full h-60 rounded-xl mt-3 relative justify-center items-center "
          activeOpacity={0.7}
        >
          <Image
            source={{ uri: thumbnail }}
            className="w-full h-full rounded-xl mt-3"
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className="w-12 h-12 absolute "
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;
