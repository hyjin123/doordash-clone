import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import CategoryCard from "./CategoryCard";
import tw from "twrnc";

const Categories = () => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 15, paddingTop: 10 }}
    >
      {/* Category Card */}
      <CategoryCard imgUrl="https://links.papareact.com/gn7" title="testing" />
      <CategoryCard imgUrl="https://links.papareact.com/gn7" title="testing" />
      <CategoryCard imgUrl="https://links.papareact.com/gn7" title="testing" />
    </ScrollView>
  );
};

export default Categories;

const styles = StyleSheet.create({});
