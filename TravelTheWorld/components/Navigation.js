import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import DiscoverScreen from "./screens/DiscoverScreen";
import DosScreen from "./screens/DosScreen";
import DonesScreen from "./screens/DonesScreen";
import ProfileScreen from "./screens/ProfileScreen";
import CustomBottomTab from "./components/CustomBottomTab";

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
