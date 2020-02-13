import React, { Component } from 'react';
import { View, Text, Button, Image } from 'react-native';

import vision from '@react-native-firebase/ml-vision';
import { firebase } from '@react-native-firebase/ml-vision';
import { utils } from '@react-native-firebase/app';
// import firebase from '@react-native-firebase/app';
// import firebase from '@react-native-firebase/storage';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-crop-picker';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileUrl: ''
    };
  }
  chooseImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      console.warn(image.path);
      this.setState({ devicePath: image.path })
      this.saveToCloud(image.path)
    });
  }

  processImage = () => {
    //Create a local file location in the documents directory of the device
    // const localFile = `${utils().FilePath.DOCUMENT_DIRECTORY}/landmark.jpg`;

    // const ref = await storage().ref('london-eye.jpg')
    // ref.putFile("jgd")
    //.writeToFile(localFile);

    vision().cloudLandmarkRecognizerProcessImage(this.state.devicePath).then((response) => {
      debugger
      console.log('Landmark: ', response.landmark);
    }).catch(e => {
      debugger
      console.log('ee-->>', e);
    });
    // processed.forEach((response) => {
    //   console.log('Landmark: ', response.landmark);
    //   console.log('Confidence: ', response.confidence);
    // });
  }

  //storage

  saveToCloud = async (path) => {
    //debugger
    const ref = await firebase.storage().ref("theImage").child("hfjg")
   // debugger
    const uploadtask = ref.putFile(path)
    uploadtask.then((snap) => {
      //debugger
      ref.getDownloadURL().then((data) => {
        debugger
        console.warn(" profile image url=>", data)

        this.setState({
          // ProfileImageStatus: false,
          profileUrl: data
        })

      })
    })

  }

  render() {
    return (
      <View style={{
        flex: 1,
        marginTop: 100,
        backgroundColor: "pink"
      }}>
        <Text> App </Text>
        <Button
          title="Landmark_ML"
          onPress={() => this.processImage()}
        />
        <Button
          title="Choose Image"
          onPress={() => this.chooseImage()}
        />
        <Image
          source={{ uri: this.state.profileUrl }}
          style={{ height: 100, width: 100 }}
        />
      </View>

    );
  }
}

export default App;
