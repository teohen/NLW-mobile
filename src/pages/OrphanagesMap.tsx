import React, { useState } from "react";
import { View, Text, TouchableOpacity, Dimensions, StyleSheet } from "react-native";
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps";

import { Feather } from "@expo/vector-icons";

import mapMarker from "./../images/map-marker.png";

import { useNavigation } from "@react-navigation/native";
import { RectButton } from "react-native-gesture-handler";
import { useEffect } from "react";
import api from "../services/api";
import { or } from "react-native-reanimated";


interface Orphanage {
  id: number,
  name: string,
  latitude: number,
  longitude: number
}

export default function OrphanagesMap() {

  const [orphanages, setOrphanages] = useState<Orphanage[]>([])

  useEffect(() => {
    api.get("orphanages").then(response => {
      setOrphanages(response.data)
    })
  })

    const navigation = useNavigation();

    function handleNavigateToOrphanageDetails(){
        navigation.navigate("OrphanageDetails")
    }

    function handleNavigateToCreateOrphanage(){
        navigation.navigate("SelectMapPosition")
    }

    return (
<View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude:-2.531089, 
          longitude: -44.2384228,
          latitudeDelta: 0.018,
          longitudeDelta: 0.018
        }}
      >

        {orphanages.map((orphanage) => {
          return (
            <Marker
              key={orphanage.id}
              icon={mapMarker}
              coordinate={
                {latitude:orphanage.latitude, 
                longitude: orphanage.longitude}
              }
              calloutAnchor={{
                x: 2.4,
                y: 0.8
              }}
              >
                <Callout tooltip 
                onPress={handleNavigateToOrphanageDetails}>
                  <View
                  style={styles.calloutContainer}>
                    <Text style={styles.calloutText}>{orphanage.name}</Text>
                  </View>
                </Callout>
              </Marker>
          )
        })}

        
      </MapView>
      <View
      style={styles.footer}>
        <Text style={styles.footerText}>
          2 orfanatos encontrados
        </Text>
        <RectButton style={styles.createOrphanageButton} onPress={handleNavigateToCreateOrphanage}>
          <Feather name="plus" size={20} color="#FFF"></Feather>
        </RectButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  calloutContainer: {
    width: 160,
    height: 46,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
    justifyContent:"center",
    alignItems: "center"
  },
  calloutText: {
    color: "#0089a5",
    fontFamily: "Nunito_700Bold"
  },
  footer: {
    position: "absolute",
    left: 24,
    right: 24,
    bottom: 32,

    backgroundColor: "#FFF",
    borderRadius: 20,
    height: 56,
    paddingLeft: 24,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    elevation: 3
  },
  footerText: {
    color: "#8fa7b3",
    fontFamily: "Nunito_700Bold"
  },
  createOrphanageButton: {
    width: 56,
    height: 56,
    backgroundColor: "#15c3d6",
    borderRadius: 20,

    justifyContent: "center",
    alignItems: "center"
  }
})
