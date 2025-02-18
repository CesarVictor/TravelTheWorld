import FlatListCities from "@/components/FlatList";
import Section from "@/components/Section";
import { View } from "react-native";

export default function CityScreen() {
  return (
    <View>
      <FlatListCities />
      <Section places={[]} category="" />
    </View>
  );
}