import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

class Shapes extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <ScrollView>
                <View style={{justifyContent:"center",alignItems:"center"}}>
                    <View style={styles.oval}>
                      
                    </View>
                    <View style={styles.traingle}>
                      
                    </View>
                    <View style={[styles.traingle,{transform:[{rotate:'180deg'}]}]}>
                      
                      </View>
                      {/* mainview */}
<View>
                      <View style={styles.container}>
                      
                      </View>
                      <View style={styles.progressLayer}>
                          </View>
                          <View style={styles.progressLayer2}>
                          </View>

                          </View>
                </View>
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    container:{
        width: 200,
        height: 200,
        borderWidth: 20,
        borderRadius: 100,
        borderColor: 'grey'  
      },
        progressLayer: {
            width: 200,
            height: 200,
            position: 'absolute',
            zIndex:100,
            justifyContent:"center",
            alignItems:"center",
           // backgroundColor: 'blue',
           borderLeftColor: 'transparent',
           borderBottomColor: 'transparent',
           borderRightColor: '#3498db',
           borderTopColor: '#3498db',  
           borderRadius:100,
           transform:[{rotateZ:'-45deg'}],
            borderWidth:20
          },
          progressLayer2: {
            width: 200,
            height: 200,
            position: 'absolute',
            zIndex:200,
            justifyContent:"center",
            alignItems:"center",
           // backgroundColor: 'grey',
           borderLeftColor: 'transparent',
           borderBottomColor: 'transparent',
           borderRightColor: '#3498db',
           borderTopColor: "grey",  
           borderRadius:100,
           transform:[{rotateZ:'-45deg'}],
            borderWidth:20
          },

    oval: {
        height: 100,
        width: 100,
        borderRadius:50,
        backgroundColor: 'red',
        transform: [
            { scaleX: 2 }
        ]

    },
    traingle:{
    //width: 0,
    //height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 50,
    borderRightWidth: 50,
    borderBottomWidth: 100,
    marginBottom:10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'red'
    }
})

export default Shapes;
