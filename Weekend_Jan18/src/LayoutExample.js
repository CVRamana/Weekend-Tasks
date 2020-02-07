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


UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

export default class LayoutExample extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      position: "flex-start",
      height1:50,
      height2:50
    };
  }

  changePosition = position => {
    LayoutAnimation.easeInEaseOut();
    this.setState({
      position
    });
  };
  changeTextInput=(action)=>{
   // console.warn(v);
    
    if(action.field==='t1'){
    LayoutAnimation.easeInEaseOut();
    this.setState({
      height1:action.height
    });
  }else{
    LayoutAnimation.easeInEaseOut();
    this.setState({
      height2:action.height
    });
  }
  }

  render() {
    return (
      <View style={[styles.container, { justifyContent: this.state.position }]}>
     
        <TextInput
        style={[styles.input,{height:this.state.height1}]}
        onFocus={()=>this.changeTextInput({height:100,field:"t1"})}
        onBlur={()=>this.changeTextInput({height:50,field:"t1"})}
        />
        <TextInput
        style={[styles.input,{height:this.state.height2}]}
        onFocus={()=>this.changeTextInput({height:100,field:"t2"})}
        onSubmitEditing={ ()=>this.changeTextInput({height:60,field:"t2"})}
       // onBlur={()=>this.changeTextInput(60)}
        />
      
        <View style={styles.buttonsContainer}>
        
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
  input:{
    backgroundColor:"red",
    height:50,
    width:300,
    marginBottom:20,
  }
});