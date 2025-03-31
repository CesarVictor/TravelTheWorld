import React from "react";
import { View } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const TopCardSkeleton = () => (
  <SkeletonPlaceholder borderRadius={16}>
    <View style={{ paddingHorizontal: 16 }}>
      <View style={{ width: "100%", height: 200 }} />
      <View style={{ width: 160, height: 20, marginTop: 12 }} />
    </View>
  </SkeletonPlaceholder>
);

export default TopCardSkeleton;
