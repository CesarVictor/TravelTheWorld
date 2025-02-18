import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import DiscoverScreen from "@/components/DiscoverScreen";
import DosScreen from "@/components/DosScreen";
import DonesScreen from "@/components/DonesScreen";
import ProfileScreen from "@/components/ProfilesScreen";
import CustomBottomTab from "@/components/BottomTab";

const Tab = createBottomTabNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator tabBar={(props) => <CustomBottomTab {...props} />}>
        <Tab.Screen name="Discover" component={DiscoverScreen} />
        <Tab.Screen name="Dos" component={DosScreen} />
        <Tab.Screen name="Dones" component={DonesScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
