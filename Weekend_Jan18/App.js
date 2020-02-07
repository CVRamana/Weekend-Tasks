import React, { Component } from "react";
import {
  Button,
  StyleSheet,
  UIManager,
  LayoutAnimation,
  Image,
  View,
  TextInput
} from "react-native";
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LayoutExample from "./src/LayoutExample";
import IntroSlider from "./src/IntroSlider";
import ScrollExample from "./src/ScrollExample";
import Modal1 from "./src/Modal1";
import Shapes from "./src/Shapes";
import RNModal from "./src/RNModal";
import Twitter_anim from "./src/Twitter_anim";
import Animations from "./src/Animations";
import Mausi from "./src/Mausi";
import MainApp from "./src/MainApp";
import Drawer from "./src/Drawer";

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: "flex-start",
      height1: 50,
      height2: 50
    };
  }

  changePosition = position => {
    LayoutAnimation.easeInEaseOut();
    this.setState({
      position
    });
  };

  changeTextInput = (action) => {
    if (action.field === 't1') {
      LayoutAnimation.easeInEaseOut();
      this.setState({
        height1: action.height
      });
    } else {
      LayoutAnimation.easeInEaseOut();
      this.setState({
        height2: action.height
      });
    }
  }

  render() {
    return (
      <View style={[styles.container, { justifyContent: this.state.position }]}>
        <Image source={require('./src/assets/Image3.png')}
          style={{ height: 50, width: 50 }} />
        <TextInput
          style={[styles.input, { height: this.state.height1 }]}
          onFocus={() => this.changeTextInput({ height: 100, field: "t1" })}
          onBlur={() => this.changeTextInput({ height: 50, field: "t1" })}
        />
        <TextInput
          style={[styles.input, { height: this.state.height2 }]}
          onFocus={() => this.changeTextInput({ height: 100, field: "t2" })}
          onSubmitEditing={() => this.changeTextInput({ height: 50, field: "t2" })}
          // onBlur={() => this.changeTextInput(50)}
          placeholder={"hjgjhsdgjh"}
        />
        <Button
          style={styles.button}
          title="Example1"
          onPress={() => this.props.navigation.navigate('LayoutExample')}
        />
        <Button
          style={styles.button}
          title="Example_Modal"
          onPress={() => this.props.navigation.navigate('Modal1')}
        />
         <Button
          style={styles.button}
          title="Twitter Animations"
          onPress={() => this.props.navigation.navigate('Twitter_anim')}
        />

<Button
          style={styles.button}
          title="RNModal"
          onPress={() => this.props.navigation.navigate('RNModal')}
        />

        <Button
          style={styles.button}
          title="Example2"
          onPress={() => this.props.navigation.navigate('IntroSlider')}
        />
        <Button
          style={styles.button}
          title="ScrollView"
          onPress={() => this.props.navigation.navigate('ScrollExample')}
        />
         <Button
          style={styles.button}
          title="Animations"
          onPress={() => this.props.navigation.navigate('Animations')}
        />
        <Button
          style={styles.button}
          title="Shapes"
          onPress={() => this.props.navigation.navigate('Shapes')}
        />
        <Button
          style={styles.button}
          title="DrawerNavigation"
          onPress={() => this.props.navigation.navigate('Drawer')}
        />

        <View style={styles.buttonsContainer}>
          <Button
            style={styles.button}
            title="Top"
            onPress={() => this.changePosition("flex-start")}
          />
          <Button
            style={styles.button}
            title="Middle"
            onPress={() => this.changePosition("center")}
          />
          <Button
            style={styles.button}
            title="Bottom"
            onPress={() => this.changePosition("flex-end")}
          />
            <Button
            style={styles.button}
            title="circle Anim"
            onPress={() => this.props.navigation.navigate('Mausi')}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    paddingTop: 64,
    paddingBottom: 32
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    position: "absolute",
    bottom: 16,
    width: "100%"
  },
  button: {
    width: 100
  },
  input: {
    backgroundColor: "red",
    height: 50,
    width: 300,
    marginBottom: 20,
  }
});
const AppNavigator = createStackNavigator({
  App: { screen: App },
  LayoutExample: { screen: LayoutExample },
  IntroSlider: { screen: IntroSlider },
  ScrollExample: { screen: ScrollExample },
  Modal1: { screen: Modal1 },
  Shapes:{screen:Shapes},
  RNModal:{screen:RNModal},
  Twitter_anim:{screen:Twitter_anim},
  Animations:{screen:Animations},
  Mausi:{screen:Mausi},
  Drawer:{screen:Drawer}
},
  {
    initialRouteName: 'App',
  });

export default createAppContainer(AppNavigator);