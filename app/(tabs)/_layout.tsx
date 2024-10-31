import { icons } from "@/constants";
import { Tabs } from "expo-router";
import React from "react";
import { Image, Text, View } from "react-native";

const TabIcon = ({
  icon,
  focused,
  color,
  name,
}: {
  icon: any;
  focused: boolean;
  color: string;
  name: string;
}) => {
  return (
    <View className=" items-center justify-center gap-2">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
      />
      <Text
        className={` ${focused ? "font-psemibold" : "font-pregular"} text-xs `}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#FFA001",
          tabBarInactiveTintColor: "#CDCDE0",
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "#161622",
            borderTopWidth: 1,
            borderTopColor: "#232533",
            height: 84,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ focused, color }) => {
              return (
                <View>
                  <TabIcon
                    icon={icons.home}
                    color={color}
                    name={"Home"}
                    focused={focused}
                  />
                </View>
              );
            },
          }}
        />

        <Tabs.Screen
          name="bookmark"
          options={{
            title: "Bookmark",
            headerShown: false,
            tabBarIcon: ({ focused, color }) => {
              return (
                <View>
                  <TabIcon
                    icon={icons.bookmark}
                    color={color}
                    name={"Bookmark"}
                    focused={focused}
                  />
                </View>
              );
            },
          }}
        />
        <Tabs.Screen
          name="create"
          options={{
            title: "Create",
            headerShown: false,
            tabBarIcon: ({ focused, color }) => {
              return (
                <View>
                  <TabIcon
                    icon={icons.plus}
                    color={color}
                    name={"Create"}
                    focused={focused}
                  />
                </View>
              );
            },
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ focused, color }) => {
              return (
                <View>
                  <TabIcon
                    icon={icons.profile}
                    color={color}
                    name={"Profile"}
                    focused={focused}
                  />
                </View>
              );
            },
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;
