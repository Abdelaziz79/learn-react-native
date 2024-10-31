import CustomButton from "@/components/CustomButton";
import FormField from "@/components/FormField";
import { images } from "@/constants";
import { useGlobalContext } from "@/context/GlobalProvider";
import { createUser, getCurrentUser } from "@/lib/appwrite";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { Alert, Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SignUp = () => {
  const { setUser, setIsLoggedIn } = useGlobalContext();
  const [form, setForm] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    if (!form.userName || !form.email || !form.password) {
      Alert.alert("Missing Fields", "All fields are required");
      return;
    }

    setIsSubmitting(true);
    try {
      await createUser(form.email, form.password, form.userName);
      const res = await getCurrentUser();

      setUser(res);
      setIsLoggedIn(true);

      router.replace("/home");
    } catch (error: any) {
      Alert.alert("error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full min-h-[85vh] my-6 px-4 justify-center ">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35px]"
          />
          <Text className="text-2xl text-white font-semibold mt-10  font-psemibold">
            Sign Up to Aora
          </Text>

          <FormField
            title="Username"
            value={form.userName}
            handleChangeText={(e: string) => setForm({ ...form, userName: e })}
            placeholder="Enter your username"
            otherStyles="mt-10"
            keyboardType={"default"}
          />
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e: string) => setForm({ ...form, email: e })}
            placeholder="Enter your email"
            keyboardType="email-address"
            otherStyles="mt-7"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e: string) => setForm({ ...form, password: e })}
            placeholder="Enter your password"
            otherStyles="mt-7"
            keyboardType={"default"}
          />
          <CustomButton
            title={"Sign Up"}
            containerStyle={"mt-7"}
            handlePress={submit}
            isLoading={isSubmitting}
            textStyles={""}
          />
          <View className="flex-row justify-center items-center pt-5 gap-2">
            <Text className="text-gray-100 text-lg font-pregular">
              Already have an account?
            </Text>
            <Link
              className="text-secondary-200 text-lg font-psemibold"
              href={"/(auth)/sign-in"}
            >
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
