import "react-native-reanimated";

import CustomButton from "@/components/CustomButton";
import { images } from "@/constants";
import { useGlobalContext } from "@/context/GlobalProvider";
import { Redirect, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  const { isLoading, isLoggedIn } = useGlobalContext();
  if (!isLoading && isLoggedIn) return <Redirect href="/home" />;
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full min-h-[85vh] px-4  justify-center items-center">
          <Image
            source={images.logo}
            className="w-[130px] h-[84px] "
            resizeMode="contain"
          />
          <Image
            source={images.cards}
            className="max-w-[380px] w-full h-[300px] "
            resizeMode="contain"
          />
          <View className="relative mt-5">
            <Text className="text-3xl font-bold max-w-[300px] text-white text-center">
              Discover Endless Possibilities With
              <Text className="text-secondary-200 "> Aora</Text>
            </Text>
            <Image
              source={images.path}
              className="absolute -bottom-0 -right-8 w-[110px] h-[15px] "
              resizeMode="contain"
            />
          </View>
          <Text className="text-gray-100 mt-7 text-center text-sm font-pregular">
            Wheres creativity meet innovation: embark on a journey of limitless
            exploration with Aora
          </Text>
          <CustomButton
            title="Continue with Email"
            handlePress={() => router.push("/sign-in")}
            containerStyle="mt-7 w-full"
            isLoading={false}
            textStyles={""}
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
}
