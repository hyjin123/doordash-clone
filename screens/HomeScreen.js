import {
  SafeAreaView,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useLayoutEffect, useState, useEffect } from "react";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import {
  UserIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  AdjustmentsVerticalIcon,
} from "react-native-heroicons/outline";
import Categories from "../components/Categories";
import FeaturedRow from "../components/FeaturedRow";
import client from "../sanity";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [featuredCategories, setFeaturedCategories] = useState([]);

  // can change setting of navigation such as not showing the header
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });

  useEffect(() => {
    client
      .fetch(
        `
    *[_type == "featured"] {
      ...,
      restaurants[]->{
        ...,
        dishes[]->,
    }
      }
    `
      )
      .then((data) => {
        setFeaturedCategories(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <SafeAreaView style={tw`flex-1 bg-white pt-5`}>
      {/* Header */}
      <View style={tw`flex-row pb-3 items-center mx-4`}>
        <Image
          source={{ uri: "https://links.papareact.com/wru" }}
          style={tw`h-7 w-7 bg-gray-300 p-4 rounded-full`}
        />
        <View style={tw`flex-1 pl-3`}>
          <Text style={tw`font-bold text-gray-400 text-xs`}>Deliver Now!</Text>
          <Text style={tw`font-bold text-xl`}>
            Current Location
            <ChevronDownIcon size={20} color="#FF3008" />
          </Text>
        </View>
        <UserIcon size={35} color="#FF3008" />
      </View>
      {/* Search Box */}
      <View style={tw`flex-row items-center pb-2 mx-4`}>
        <View style={tw`flex-row flex-1 mr-4 bg-gray-200 p-3`}>
          <MagnifyingGlassIcon color="gray" size={20} />
          <TextInput
            placeholder="Restaurants and Cuisines"
            keyboardType="default"
          />
        </View>
        <AdjustmentsVerticalIcon color="#FF3008" />
      </View>

      {/* Body */}
      <ScrollView style={tw`bg-gray-200`}>
        {/* Categories */}
        <Categories />

        {/* Featured - such as offers, featured, discounts, etc */}

        {featuredCategories?.map((category) => (
          <FeaturedRow
            key={category._id}
            id={category._id}
            title={category.name}
            description={category.short_description}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
