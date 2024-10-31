import CustomButton from "@/components/CustomButton";
import FormField from "@/components/FormField";
import { icons } from "@/constants";
import { ResizeMode, Video } from "expo-av";
import React, { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useGlobalContext } from "@/context/GlobalProvider";
import { createPost } from "@/lib/appwrite";
import * as DocumentPiker from "expo-document-picker";
import { router } from "expo-router";

type FormType = {
  title: string;
  video: any;
  prompt: string;
  image: any;
};

const Create = () => {
  const { user } = useGlobalContext();
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState<FormType>({
    title: "",
    video: null,
    prompt: "",
    image: null,
  });

  const openPicker = async (selectType: string) => {
    const res = await DocumentPiker.getDocumentAsync({
      type:
        selectType === "image"
          ? ["image/png", "image/jpeg", "image/jpg"]
          : ["video/mp4", "video/gif"],
    });
    if (!res.canceled) {
      setForm({ ...form, [selectType]: res.assets[0] });
    }
  };

  const submit = async () => {
    if (!form.title || !form.video || !form.prompt || !form.image) {
      return Alert.alert("Missing Fields", "All fields are required");
    }

    await createPost({ ...form, userId: user.$id });
    setUploading(true);
    try {
      Alert.alert("Success", "Video uploaded successfully");
      router.push("/home");
    } catch (error: any) {
      console.log(error);
      Alert.alert("error", error.message);
    } finally {
      setForm({ title: "", video: null, prompt: "", image: null });
      setUploading(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <Text className="font-psemibold text-2xl text-white">Upload Video</Text>
        <FormField
          title={"Video title"}
          value={form.title}
          placeholder={"give a title to your video"}
          handleChangeText={(e: any) => setForm({ ...form, title: e })}
          otherStyles={"mt-10"}
          keyboardType={"default"}
        />
        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Upload Video
          </Text>
          <TouchableOpacity onPress={() => openPicker("video")}>
            {form.video ? (
              <Video
                source={{ uri: form.video?.uri }}
                // className="w-full h-64 rounded-2xl"
                style={{ width: "100%", height: 256, borderRadius: 16 }}
                useNativeControls
                resizeMode={ResizeMode.CONTAIN}
                isLooping
              />
            ) : (
              <View className="w-full h-40 px-4 bg-black-100 rounded-2xl  justify-center items-center">
                <View className="w-14 h-14  border border-dashed border-secondary-100 justify-center items-center">
                  <Image
                    source={icons.upload}
                    className="w-1/2 h-1/2"
                    resizeMode="contain"
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Thumbnail image
          </Text>
          <TouchableOpacity onPress={() => openPicker("image")}>
            {form.image ? (
              <Image
                source={{ uri: form.image?.uri }}
                resizeMode="cover"
                className="w-full h-64 rounded-2xl"
              />
            ) : (
              <View className="w-full h-16 px-4 bg-black-100 border-2 border-black-200 flex-row gap-2 rounded-2xl justify-center items-center">
                <Image
                  source={icons.upload}
                  className="w-5 h-5"
                  resizeMode="contain"
                />
                <Text className="font-pmedium text-gray-100 text-sm">
                  Choose a file
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <FormField
          title={"Prompt"}
          value={form.prompt}
          placeholder={"the prompt to generate the video"}
          handleChangeText={(e: any) => setForm({ ...form, prompt: e })}
          otherStyles={"mt-7"}
          keyboardType={"default"}
        />
        <CustomButton
          title={"Submit & Publish"}
          handlePress={submit}
          containerStyle={"mt-7"}
          isLoading={uploading}
          textStyles={""}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
