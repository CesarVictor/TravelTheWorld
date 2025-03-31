import React from "react";
import { View } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const CategoryFilterSkeleton = () => (
  <SkeletonPlaceholder borderRadius={16}>
    <View style={{ flexDirection: "row", marginBottom: 20, paddingHorizontal: 16 }}>
      {[...Array(3)].map((_, index) => (
        <View key={index} style={{ width: 80, height: 32, marginRight: 10 }} />
      ))}
    </View>
  </SkeletonPlaceholder>
);

export default CategoryFilterSkeleton;
