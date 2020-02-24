import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { TapGestureHandler,PanGestureHandler,PanResponder } from 'react-native-gesture-handler';


class Gestures extends Component {
  constructor(props) {
    super(props);

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (event, gesture) => {
           console.log(gesture);
        }
     });
    this.state = {
        panResponder
    };
  }

  render() {
    return (
      <View>
        <Text> Gestures </Text>
      
            <View style={{
                height:100,
                width:100,
                borderRadius:50,
                backgroundColor:"red"}}
                {...this.state.panResponder.panHandlers}>

                </View>
         
      </View>
    );
  }
}

export default Gestures;
