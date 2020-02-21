import React from 'react';
import { Text, View, NativeEventEmitter, NativeModules, TouchableOpacity, Button, Image } from 'react-native';
import RNImageFilter from 'react-native-image-filter';
import ImagePicker from 'react-native-image-crop-picker';
import ToastExample from './src/ToastExample';
//calling from the Android nativly 

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      img: '',
      img1: '',
      img2:''
    };
  };
  componentDidMount() {

  }
  selectImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      console.warn("image from the react : ", image.path);
      this.setState({ img: image.path })
    });

  }
  applyfilter = () => {
    RNImageFilter.getSourceImage({
      imageSource: this.state.img,
      dataType: "Path",
      filterType: 1
    }, (source) => {
      this.setState({ imgBase64: source.base64 });
      console.log("SOURCE", source);
      // source returns the height, width and the Base64 string of the image.
    });
  }

  

  takePhoto = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      this.setState({img2:image.path})
      console.warn("from camara : ",image.path);
    });
  }

  onDoThis() {
    Foo.doThis();
    let fileUrl = "myFile.jpg";
    Foo.download(fileUrl, (result) => {
      alert([result]);
    });
  }

  handle = () => {
    NativeModules.Counter.increment()
    NativeModules.Counter.getCount((first, ...others) => {
      console.warn("count is " + first)
      console.warn("count is " + others)
    })
  }

  //decrementing with the promise resolve and Reject 
  handleDec = () => {
    NativeModules.Counter.decrement()
      .then(res => console.log(res))
      .catch(e => console.log(e.message, e.code))
  }

  handleFilter = () => {
    NativeModules.ImgFilter.myFun()
  }

  handleArgFun = () => {
    NativeModules.ImgFilter.fun_withArg(this.state.img, (res) => {
      this.setState({ img1: res }, () => alert(res))

    })

  }
  callAndroid=()=>{
    ToastExample.show('Ghanta...', ToastExample.SHORT);
    ToastExample.measureLayout(786, 9 ,(res,a,b,c)=>{
alert("success from android"+res + " "+a+" "+b+" "+c )

    },(err)=>{
      alert("error from androis",err)
    })
  }

  //decrementing the counter with the async await and promise resolve and reject

  // handleDec = async () => {
  //   try {
  //     const res = await Counter.decrement()
  //     console.warn(res);
  //   }
  //   catch (e) {
  //     console.warn(e.message, e.code);
  //   }
  // }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "pink", justifyContent: "center", alignItems: "center" }}>
        <Text>App</Text>
        <Button
          title="increment"
          onPress={() => this.handle()}
        />
        <Button
          title="Decrement"
          onPress={() => this.handleDec()}
        />
        <Button
          title="ImgFilter"
          onPress={() => this.handleFilter()}
        />

        <Button
          title="FunwithArgument"
          onPress={() => this.handleArgFun()}
        />

        <Button
          title="Take Photo"
          onPress={() => this.takePhoto()}
        />
         <Button
          title="Android Toast"
          onPress={() => this.callAndroid()}
        />
<Button
          title="Apply filter"
          onPress={() => this.applyfilter()}
        />
        <TouchableOpacity
          onPress={() => this.selectImage()}
        >
          <Image
            source={{ uri: this.state.img }}
            style={{ height: 100, width: 100, backgroundColor: "green" }}
          />

        </TouchableOpacity>
        <Image
          source={{ uri: this.state.img1 }}
          style={{ height: 100, width: 100 }}
        />

        <Image
          source={{ uri: this.state.img2 }}
          style={{ height: 100, width: 100 }}
        />

         <Image
          source={{ uri: this.state.croppedPath }}
          style={{ height: 100, width: 100,backgroundColor:"red" }}
        />

      </View>
    );
  }
}
export default App;
