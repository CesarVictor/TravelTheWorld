import React from "react";
import { View } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const SectionSkeleton = () => (
  <SkeletonPlaceholder borderRadius={12}>
    <View style={{ flexDirection: "row", paddingHorizontal: 16, marginTop: 20 }}>
      <View style={{ width: 140, height: 120, marginRight: 10 }} />
      <View style={{ width: 140, height: 120 }} />
    </View>
  </SkeletonPlaceholder>
);

export default SectionSkeleton;
