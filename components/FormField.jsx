import { icons } from "@/constants";
import React, { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";

const FormField = ({
  title,
  value,
  handleChangeText,
  placeholder,
  keyboardType,
  otherStyles,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <View className={`space-y-2 ${otherStyles} `}>
        <Text className="text-base text-gray-100 font-pmedium">{title}</Text>
        <View className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-500 focus:border-secondary items-center flex-row ">
          <TextInput
            className="flex-1 text-white font-psemibold text-base w-full"
            value={value}
            onChangeText={handleChangeText}
            placeholder={placeholder}
            placeholderTextColor={"#7b7b8b"}
            keyboardType={keyboardType}
            secureTextEntry={title === "Password" && !showPassword}
            {...props}
          />
          {title === "Password" && (
            <TouchableOpacity
              className="text-white font-pmedium text-base"
              onPress={() => setShowPassword((prev) => !prev)}
            >
              <Image
                source={!showPassword ? icons.eye : icons.eyeHide}
                className="w-6 h-6"
                resizeMode="contain"
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </>
  );
};

export default FormField;
