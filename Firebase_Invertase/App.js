import React, { Component } from 'react';
import { View, Text, NativeModules, Button, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

import vision from '@react-native-firebase/ml-vision';
import { firebase } from '@react-native-firebase/ml-vision';
import { utils } from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-crop-picker';
const { FaceDetection } = NativeModules
import FaceDetectorAndroid from "./src/FaceDetectionAndroid";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileUrl: '',
      devicePath: "",
      croppedImg: [],
      androidUrls:[],
      calls: ["Detect Text", "Detect Face", "Label Image", "DetectnTrack", "Scan", "Delete Folder"]
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
    vision().cloudLandmarkRecognizerProcessImage(this.state.devicePath).then((response) => {
      debugger
      //  console.log('Landmark: ', response.landmark);
    }).catch(e => {
      debugger
      // console.log('ee-->>', e);
    });
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
        //   console.warn(" profile image url=>", data)

        this.setState({
          // ProfileImageStatus: false,
          profileUrl: data
        })

      })
    })
  }

  //call Android method
  callAndroid = () => {
    FaceDetectorAndroid.detectFace(this.state.devicePath, (res) => {
      console.warn("res from the android: ", res[0], res[1], res[3]);
      this.setState({ AndroidUrls: res })
    }, (err) => {
      console.warn(err);
    })
  }
  //delete file in android
  deleteAndroidFiles = () => {
    FaceDetectorAndroid.deleteFile((res) => {
      console.warn(res);
    }, () => { })
  }

  deleteIt = () => {
    FaceDetection.deleteFolder((res) => {
      console.warn(res);
      //filter the array
      this.setState({ croppedImg: [] })
    })
  }

  //native ios methods
  detectFace = () => {
    if (this.state.devicePath === "") {
      alert("empty image ")
      return
    }
    FaceDetection.fun_withArg(this.state.devicePath, 2, (res) => {
      console.warn(" callback from the ios: ", res)
      this.setState({ croppedImg: res })
    })
  }
  //handle the call method
  handleCall = ({ item, index }) => {
    //let n={}
    let num = Number(index) + 1
    return (
      <TouchableOpacity
        onPress={() => {
          if (this.state.devicePath === "") {
            console.warn("empty image ydg", num)
            return
          }
          if (num != 6) {
            FaceDetection.getMlKit(this.state.devicePath, num, (res) => {
              console.warn(" callback from the ios: ", res)
              this.setState({ croppedImg: res })
            })
          } else {
            FaceDetection.deleteFolder((res) => {
              console.warn(res);
              //filter the array
              this.setState({ croppedImg: [] })
            })
          }
        }
        }
        style={styles.btn}>
        <Text>{item}{num}</Text>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View style={{
        flex: 1,
        //paddingTop: 100,
        alignItems: "center",
        // justifyContent:"center",
        flexDirection: "column",
        backgroundColor: "pink"
      }}>
        <Text> App </Text>
        {/* <Button
          title="Landmark_ML"
          onPress={() => this.processImage()}
        /> */}
        <Button
          title="Choose Image"
          onPress={() => this.chooseImage()}
        />
        <Button
          title="Detect_Face"
          onPress={() => this.detectFace()}
        />
        <Button
          title="Delete Folder"
          onPress={() => this.deleteIt()
          }
        />
        <Button
          title="Call ANdroid"
          onPress={() => this.callAndroid()
          }
        />
        {/* <Button
          title="DeleteAndroidFiles"
          onPress={() => this.deleteAndroidFiles()
          }
        /> */}
        <View style={{ flexDirection: "row" }}>
          <Image
            source={{ uri: this.state.profileUrl }}
            style={{ height: 100, width: 100, backgroundColor: "grey" }}
            resizeMethod={"resize"}
            resizeMode={"stretch"}
          />
          <Image
            resizeMethod={"resize"}
            resizeMode={"contain"}
            source={{ uri: this.state.AndroidUrl }}
            style={{ height: 200, width: 200, backgroundColor: "lightGrey" }}
            resizeMethod={"resize"}
            resizeMode="cover"
          />
        </View>
        <View style={{ backgroundColor: "green", height: 100, width: "100%" }}>
          <FlatList
            data={this.state.croppedImg}
            horizontal={true}
            renderItem={({ item }) => {
              return (
                <View style={{ margin: 10 }}>
                  <Image
                    source={{ uri: item }}
                    style={{ height: 100, width: 100, backgroundColor: "red" }}
                    resizeMethod={"resize"}
                    resizeMode="cover"
                  />
                </View>
              )
            }}
          />
        </View>

        <View
          style={{ backgroundColor: "red", height: 50, width: "100%" }}>
          <FlatList
            data={this.state.calls}
            horizontal={true}
            renderItem={({ item, index }) => this.handleCall({ item, index })}
          />
        </View>

        <View
          style={styles.androidFilter }
        >
          <FlatList
            data={this.state.calls}
            horizontal={true}
            renderItem={({ item, index }) => this.handleCall({ item, index })}
          />
        </View>

      </View>

    );
  }
}

const styles = StyleSheet.create({

  btn: {
    backgroundColor: "grey",
    marginLeft: 10,
    height: 50,
    width: 120,
    justifyContent: "center",
    alignItems: "center"
  },

 androidFilter: {
    backgroundColor: "yellow",
    marginTop:20,
    height: 100,
    width: 400
  }

})
export default App;
