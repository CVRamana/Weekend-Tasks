import React, { Component } from 'react';
import RNImageFilter from 'react-native-image-filter';
import { View, Text,Image } from 'react-native';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount(){
    RNImageFilter.getSourceImage({
          imageSource: "./src/BGImages.png",
          dataType: "path",
          filterType: 5
        }, (source) => {
                    this.setState( {imgBase64 : source.base64});
                    console.log("SOURCE", source);
                    // source returns the height, width and the Base64 string of the image.
        });
  }
  render() {
    return (
      <View style={{flex:1,backgroundColor:"pink",justifyContent:"center",alignItems:"center"}}>
        <Text> App </Text>
        <Image
        source={{uri:this.state.imgBase64}}
        style={{height:200,width:200,
          //backgroundColor:"red"
        }}
        />
      </View>
    );
  }
}

export default App;
