import React from 'react';
import { StyleSheet ,View,Text,Image,Button} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

const slides = [
  {
    key: 'somethun',
    title: 'Title 1',
    text: 'Description.\nSay something cool',
    image: require('./assets/BGImages.png'),
    backgroundColor: '#59b2ab',
  },
  {
    key: 'somethun-dos',
    title: 'Title 2',
    text: 'Other cool stuff',
    image: require('./assets/gift.jpg'),
    backgroundColor: '#febe29',
  },
  {
    key: 'somethun1',
    title: 'Rocket guy',
    text: 'I\'m already out of descriptions\n\nLorem ipsum bla bla bla',
    image: require('./assets/Image3.png'),
    backgroundColor: '#22bcb5',
  }
];

export default class IntroSlider extends React.Component {
 constructor(props) {
   super(props)
 
   this.state = {
    showRealApp: false
   };
 };
 
 _renderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Ionicons
          name="md-checkmark"
          color="rgba(255, 255, 255, .9)"
          size={24}
          style={{ backgroundColor: 'transparent' }}
        />
      </View>
    );
  };
  _renderItem = ({ item }) => {
    return (
      <View style={styles.slide}>
           <Text style={styles.title}>{item.title}</Text>
        <Image 
        source={item.image} />
         <Text style={styles.text}>{item.text}</Text>       
         <Text style={styles.text}>efjhgerjh</Text>     
      </View>
    );
  }
  _onDone = () => {
    
    this.setState({ showRealApp: true });
  }
  render() {
    if (this.state.showRealApp) {
      return <IntroSlider />;
    } else {
      return(
          <View style={{flex:1}}>
          <View style={{flex: .8,}}>
<AppIntroSlider renderItem={this._renderItem} slides={slides} onDone={this._onDone}/>
</View>
<View style={{flex:.2,
backgroundColor:"grey"
}}>
     <Button
          style={styles.button}
          title="Example2"
          onPress={() => this.props.navigation.navigate('IntroSlider')}
        />
    </View>
</View>
      ) 
    }
  }
}
const styles=StyleSheet.create({
    slide:{
        height:500,
    },
    title:{
color:"white"
    },
text:{
    color:"white"
},
button: {
    width: 100
  },
})