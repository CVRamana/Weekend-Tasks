import React, { Component } from 'react';
import { View, Text, StyleSheet, Animated, Image, ImageBackground, ScrollView } from 'react-native';
import { color } from 'react-native-reanimated';

Header_Max_Height = 220
Header_Min_Height = 70
Profile_Min_Height = 70
Profile_Max_Height = 100
class Twitter_anim extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scrollY: new Animated.Value(0)
        };
    }

    render() {

        const HeaderHeight = this.state.scrollY.interpolate({
            inputRange: [0, Header_Max_Height - Header_Min_Height],
            outputRange: [Header_Max_Height, Header_Min_Height],
            extrapolate: 'clamp',
           // useNativeDriver: true
        })
        const ProfileHeight = this.state.scrollY.interpolate({
            inputRange: [0, Header_Max_Height - Header_Min_Height],
            outputRange: [Profile_Max_Height, Profile_Min_Height],
            extrapolate: 'clamp',
          //  useNativeDriver: true
        })

        const ProfileImageMargin = this.state.scrollY.interpolate({
            inputRange: [0, Header_Max_Height - Header_Min_Height],
            outputRange: [Header_Max_Height - (Profile_Max_Height/2),Header_Max_Height+5],
            extrapolate: 'clamp',
          //  useNativeDriver: true
        })

        const HeaderZindex = this.state.scrollY.interpolate({
            inputRange: [0, Header_Max_Height - Header_Min_Height],
            outputRange: [0,1],
            extrapolate: 'clamp',
          //  useNativeDriver: true
        })

        const HeaderTitleBottom = this.state.scrollY.interpolate({
            inputRange: [0, Header_Max_Height - Header_Min_Height,(Header_Max_Height - Header_Min_Height+5+Profile_Min_Height),(Header_Max_Height - Header_Min_Height+5+Profile_Min_Height+25)],
            outputRange: [-20,-20,-20,0],
            extrapolate: 'clamp',
          //  useNativeDriver: true
        })


        return (
            <View style={{ flex: 1, }}>
                <Animated.View
                    style={[styles.bag, { 
                        height: HeaderHeight,
                        zIndex:HeaderZindex,
                     }]}>
                    <Image
                        style={{ flex: 1, width: null, height: null }}
                        source={require('./assets/BGImages.png')}
                    />
                    <Animated.View style={{position:"absolute",
                    bottom:HeaderTitleBottom
                    ,marginLeft: 180,}}>
                        <Text style={{color:"white"}}>Varun Dhawan</Text>
                        </Animated.View>

                </Animated.View>

                <ScrollView
                    scrollEventThrottle={18} // if flickering change the value of scrollEventThrottle
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }]
                    )}
                >

                    <Animated.View style={
                        
                             {
                                overflow: "hidden",
                        width: ProfileHeight,
                        height: ProfileHeight,
                        borderRadius: Profile_Max_Height/2,
                        marginTop: ProfileImageMargin,
                      
                    }}>

                        <Image
                            style={ { flex: 1, width: null, height: null } }
                            source={require('./assets/gift.jpg')}
                        />

                    </Animated.View>
                    <Text> Raman Verma </Text>
                    <View style={{height:1200,width:'100%'}}>
                        </View>
                </ScrollView>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    bag: {
        position: "absolute",
        top: 0,
        width: '100%'
    },
    img: {
   
    }

})
export default Twitter_anim;
