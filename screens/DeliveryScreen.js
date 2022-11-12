import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/core";
import { useSelector } from "react-redux";
import { selectRestaurant } from "../features/restaurantSlice";
import tw from "twrnc";
import { XMarkIcon } from "react-native-heroicons/solid";
import * as Progress from "react-native-progress";
import MapView, { Marker } from "react-native-maps";

const DeliveryScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);

  return (
    <View style={tw`bg-[#FF3008] flex-1`}>
      {/* Text part of the delivery screen */}
      <SafeAreaView style={tw`z-50`}>
        <View style={tw`flex-row justify-between items-center p-5`}>
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <XMarkIcon color="white" size={30} />
          </TouchableOpacity>
          <Text style={tw`font-light text-white text-lg`}>Order Help</Text>
        </View>

        <View style={tw`bg-white mx-5 my-2 rounded-md p-6 z-50 shadow-md`}>
          <View style={tw` flex-row justify-between`}>
            <View>
              <Text style={tw`text-lg text-gray-400`}>Estimated Arrival</Text>
              <Text style={tw`text-4xl font-bold`}>45-55 Minutes</Text>
            </View>
            <Image
              source={{ uri: "https://links.papareact.com/fls" }}
              style={tw`h-20 w-20`}
            />
          </View>
          <Progress.Bar size={30} color="#FF3008" indeterminate={true} />
          <Text style={tw`mt-3 text-gray-500`}>
            Your order at {restaurant.title} is being prepared!
          </Text>
        </View>
      </SafeAreaView>

      {/* Map part of the delivery screen */}
      <MapView
        initialRegion={{
          latitude: restaurant.lat,
          longitude: restaurant.long,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        style={tw`flex-1 -mt-10 z-0`}
        mapType="mutedStandard"
      >
        <Marker
          coordinate={{ latitude: restaurant.lat, longitude: restaurant.long }}
          title={restaurant.title}
          description={restaurant.short_description}
          identifier="origin"
          pinColor="#FF3008"
        />
      </MapView>

      <SafeAreaView style={tw`bg-white flex-row items-center h-28`}>
        <Image
          source={{ uri: "https://links.papareact.com/wru" }}
          style={tw`h-12 w-12 bg-gray-300 p-4 rounded-full ml-5`}
        />
        <View style={tw`flex-1 ml-4`}>
          <Text style={tw`text-lg`}>Sean Jin</Text>
          <Text style={tw`text-gray-400`}>Your Rider</Text>
        </View>
        <Text style={tw`text-[#FF3008] text-lg mr-5`}>Call</Text>
      </SafeAreaView>
    </View>
  );
};

export default DeliveryScreen;
