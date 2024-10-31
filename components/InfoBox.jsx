import React from "react";
import { Text, View } from "react-native";

const InfoBox = ({ title, subtitle, containerStyle, titleStyle }) => {
  return (
    <View className={containerStyle}>
      <Text className={`text-white font-psemibold  text-center ${titleStyle}`}>
        {title}
      </Text>
      <Text className="text-sm text-gray-100 font-pregular text-center">
        {subtitle}
      </Text>
    </View>
  );
};

export default InfoBox;
