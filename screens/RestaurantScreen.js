import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useLayoutEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { urlFor } from "../sanity";
import {
  ArrowLeftIcon,
  StarIcon,
  MapPinIcon,
  ChevronRightIcon,
  QuestionMarkCircleIcon,
} from "react-native-heroicons/solid";
import tw from "twrnc";
import DishRow from "../components/DishRow";
import BasketIcon from "../components/BasketIcon";

const RestaurantScreen = () => {
  // how to pull the data sent through navigation
  const {
    params: {
      id,
      imgUrl,
      title,
      rating,
      genre,
      address,
      short_description,
      dishes,
      long,
      lat,
    },
  } = useRoute();

  const navigation = useNavigation();

  // when the component "paints", hide the navigation
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });

  return (
    <>
      <BasketIcon />
      <ScrollView>
        {/* Top Image section */}
        <View style={tw`relative`}>
          <Image
            source={{ uri: urlFor(imgUrl).url() }}
            style={tw`w-full h-56 bg-gray-300 p-4`}
          />
          <TouchableOpacity
            onPress={navigation.goBack}
            style={tw`absolute top-14 left-5 p-2 bg-gray-100 rounded-full`}
          >
            <ArrowLeftIcon size={20} color="#FF3008" />
          </TouchableOpacity>
        </View>

        {/* Restaurant Information section */}
        <View style={tw`bg-white`}>
          <View style={tw`px-4 pt-4`}>
            {/*  */}
            <Text style={tw`text-3xl font-bold`}>{title}</Text>

            <View style={tw`flex-row my-1`}>
              <View style={tw`flex-row items-center`}>
                <StarIcon color="red" opacity={0.5} size={22} />
                <Text style={tw`text-xs text-gray-500 pl-1`}>
                  <Text style={tw`text-red-500`}>{rating}</Text> • {genre}
                </Text>
              </View>
              <View style={tw`flex-row items-center ml-2`}>
                <MapPinIcon color="gray" opacity={0.4} size={22} />
                <Text style={tw`text-xs text-gray-500`}>
                  {" "}
                  Nearby • {address}
                </Text>
              </View>
            </View>

            <Text style={tw`text-gray-500 mt-2 pb-4`}>{short_description}</Text>
            {/*  */}
          </View>

          <TouchableOpacity
            style={tw`flex-row items-center p-3 border border-gray-100`}
          >
            <QuestionMarkCircleIcon color="gray" opacity={0.6} siz={20} />
            <Text style={tw`pl-4 flex-1 text-md font-bold`}>
              Have a food allergy?
            </Text>
            <ChevronRightIcon color="#FF3008" />
          </TouchableOpacity>
        </View>

        {/* Menu section */}
        <View style={tw`pb-26`}>
          <Text style={tw`px-4 pt-6 mb-3 font-bold text-xl`}>Menu</Text>

          {dishes.map((dish) => (
            <DishRow
              key={dish._id}
              id={dish._id}
              name={dish.name}
              description={dish.short_description}
              price={dish.price}
              image={dish.image}
            />
          ))}
        </View>
      </ScrollView>
    </>
  );
};

export default RestaurantScreen;

const styles = StyleSheet.create({});
