
import React from "react";
import { View,Image,TouchableOpacity } from "react-native";

import styles from "./styles";


const CustomHeader = ({ navigation }) => (
  <View style={[styles.container]}>
    <TouchableOpacity
     onPress={()=>navigation.openDrawer()}>
    <Image
      style={{height:20,width:20,  }}
      source={require('../../assets/Image3.png')} 
     
    />
    </TouchableOpacity>
  </View>
);

export default CustomHeader;