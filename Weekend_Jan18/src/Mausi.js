import React, { Component } from 'react';
import { View, Text, Animated, Dimensions, Button } from 'react-native';

class Mausi extends Component {
    constructor(props) {
        super(props);
        this.state = {
            aniTop: new Animated.Value(-200),
            aniLeft: new Animated.Value(-300),
            aniRight: new Animated.Value(-100),
        };
    }
    //animating 
    animate = (val, val1, val2) => {
        Animated.sequence([
            //top
            Animated.timing(
                this.state.aniTop
                , {
                    toValue: val,
                    duration: 1000

                }
            ),

            //left
            Animated.timing(
                this.state.aniLeft
                , {
                    toValue: val1,
                    duration: 1000
                }
            ),
            //right
            Animated.timing(
                this.state.aniRight
                , {
                    toValue: val2,
                    duration: 1000
                }
            ),
        ]).start(() => {
            this.setState({
                aniTop: new Animated.Value(-200),
                aniLeft: new Animated.Value(-300),
                aniRight: new Animated.Value(-100),
            },()=>this.animate(0,0,150))
        })

    }

    render() {
        return (
            <View style={{ marginTop: 100, marginLeft: 165 }}>

                {/* //View 1 */}
                <Animated.View style={{
                    position: "absolute",
                    top: this.state.aniTop,
                    zIndex: 11,
                    height: 100, width: 100, borderRadius: 50, backgroundColor: "red"
                }}>

                </Animated.View>

                {/* view2 */}
                <Animated.View style={{
                    position: "absolute", zIndex: 11,
                    left: this.state.aniLeft,
                    height: 100, width: 100, borderRadius: 50, backgroundColor: "green"
                }}>

                </Animated.View>

                {/* view3 */}
                <Animated.View style={{
                    position: "absolute",
                    right: this.state.aniRight,
                    zIndex: 11,
                    height: 100,
                    width: 100,
                    borderRadius: 50,
                    backgroundColor: "yellow"
                }}>
                </Animated.View>
                <View style={{ position: "absolute", bottom: 0, zIndex: 500 }}>
                    <Button
                        title="Mausi"
                        onPress={() => this.animate(0, 0, 149)}
                    />
                </View>
            </View>
        );
    }
}

export default Mausi;
