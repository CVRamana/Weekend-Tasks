import React, { Component } from 'react';
import { View, Text, Animated, StyleSheet, Button, Easing, } from 'react-native';


class Animations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            animatedMargin: new Animated.Value((50)),
            animatedSpring: new Animated.Value(1),
            animateOpacity: new Animated.Value(1),
            animateWidth: new Animated.Value(100),
            animateHeight: new Animated.Value(100),
            animateRotate: new Animated.Value(0),
            animateBg:new Animated.Value(0),
            bh1: new Animated.Value(20),
            bw1: new Animated.Value(20),
            bh2: new Animated.Value(30),
            bw2: new Animated.Value(30),
            b1Opacity: new Animated.Value(1),
           
        };
    }
    animate = (val) => {
        Animated.timing(
            this.state.animatedMargin,
            {
                toValue: val,
                duration: 900,
                easing: Easing.linear,
            }
        ).start()
    }
    animateSpring = (val) => {
        Animated.spring(
            this.state.animatedMargin,
            {
                toValue: val,
                friction: 1,
            }
        ).start()
    }
    animateOpacity = (val) => {
        Animated.timing(
            this.state.animateOpacity,
            {
                toValue: val,
                duration: 3000,
                easing: Easing.linear
            }
        ).start()
    }
    animateRotate = (val3) => {
        Animated.timing(
            this.state.animateRotate,
            {
                toValue: 1,
                duration: 1000,
                easing: Easing.linear
            }
        ).start(()=>{
            this.setState({animateRotate:new Animated.Value(0)},()=>{
                this.animateRotate()
            })
        }  )
    }
    animateBg=()=>{
        Animated.timing(
            this.state.animateBg,
            {
                toValue:1,
                duration:2000,
                easing:Easing.linear
                        }
        ).start(()=>this.state.animateBg.setValue(0))
    }

    animateParallely = (val, val1, val2, val3) => {
        Animated.parallel(
            [
                Animated.timing(
                    this.state.animateHeight,
                    {
                        toValue: val1,
                        duration: 1000,
                        easing: Easing.linear

                    }
                ),
               
                Animated.timing(
                    this.state.animateWidth,
                    {
                        toValue: val2,
                        duration: 1000,
                        easing: Easing.linear
                    }
                ),

                // Animated.timing(
                //     this.state.animateOpacity,
                //     {
                //         toValue: val,
                //         duration: 1000,
                //         easing: Easing.linear
                //     }
                // ).start(),

                Animated.timing(
                    this.state.animateRotate,
                    {
                        toValue: 1,
                        duration: 1000,
                        easing: Easing.linear
                    }
                ),
                Animated.timing(
                    this.state.animateBg,
                    {
                        toValue: 1,
                        duration: 1000,
                        easing: Easing.linear
                    }
                )
            ]
        ).start(()=>{
            this.setState({
                animateOpacity: new Animated.Value(1),
                animateWidth: new Animated.Value(100),
                animateHeight: new Animated.Value(100),
                animateRotate: new Animated.Value(0),
                animateBg:new Animated.Value(0)
                
            },
         //   ()=>this.animateParallely(0, 200, 200, "360deg")
            )
        })
    }

    //tik TOK Animations
    animateBubble=(b1,b2)=>{
Animated.parallel([
    Animated.timing(
        this.state.bh1,
        {
            toValue: b1,
            duration: 1000,
            easing: Easing.linear
        }
    ),
    Animated.timing(
        this.state.bw1,
        {
            toValue: b1,
            duration: 1000,
            easing: Easing.linear
        }
    ),
    Animated.timing(
        this.state.bh2,
        {
            toValue: b2,
            duration: 1000,
            easing: Easing.linear
        }
    ),
    Animated.timing(
        this.state.bw2,
        {
            toValue: b2,
            duration: 1000,
            easing: Easing.linear
        }
    ),
]).start(()=>{
    // this.setState({   
    //      bh1: new Animated.Value(20),
    //      bw1: new Animated.Value(20),
    //      bh2: new Animated.Value(30),
    //      bw2: new Animated.Value(30),
    //     },
    //      ()=>this.animateBubble(30,20))
}
)
    }

//for second time
animateBubble2=(b21,b22)=>{
    Animated.parallel([
        Animated.timing(
            this.state.bh1,
            {
                toValue: b21,
                duration: 1000,
                easing: Easing.linear
            }
        ),
        Animated.timing(
            this.state.bw1,
            {
                toValue: b21,
                duration: 1000,
                easing: Easing.linear
            }
        ),
        Animated.timing(
            this.state.bh2,
            {
                toValue: b22,
                duration: 1000,
                easing: Easing.linear
            }
        ),
        Animated.timing(
            this.state.bw2,
            {
                toValue: b22,
                duration: 1000,
                easing: Easing.linear
            }
        ),
    ]).start(()=>{
        // this.setState({   
        //      bh1: new Animated.Value(30),
        //      bw1: new Animated.Value(30),
        //      bh2: new Animated.Value(20),
        //      bw2: new Animated.Value(20),
        //     },
        //      ()=>this.animateBubble(20,30))
    }
    )

}

// now overall Animations
tiktokAnim=()=>{
    Animated.sequence([
        Animated.parallel([
            Animated.timing(
                this.state.bh1,
                {
                    toValue: 30,
                    duration: 1000,
                    easing: Easing.linear
                }
            ),
            Animated.timing(
                this.state.bw1,
                {
                    toValue: 30,
                    duration: 1000,
                    easing: Easing.linear
                }
            ),
            Animated.timing(
                this.state.bh2,
                {
                    toValue: 20,
                    duration: 1000,
                    easing: Easing.linear
                }
            ),
            Animated.timing(
                this.state.bw2,
                {
                    toValue: 20,
                    duration: 1000,
                    easing: Easing.linear
                }
            ),
        ]),
        //.start(()=>{
            // this.setState({   
            //      bh1: new Animated.Value(20),
            //      bw1: new Animated.Value(20),
            //      bh2: new Animated.Value(30),
            //      bw2: new Animated.Value(30),
            //     },
            //      ()=>this.animateBubble(30,20))
        //}
      //  ),
        //second 
        Animated.parallel([
            Animated.timing(
                this.state.bh1,
                {
                    toValue: 20,
                    duration: 1000,
                    easing: Easing.linear
                }
            ),
            Animated.timing(
                this.state.bw1,
                {
                    toValue: 20,
                    duration: 1000,
                    easing: Easing.linear
                }
            ),
            Animated.timing(
                this.state.bh2,
                {
                    toValue: 30,
                    duration: 1000,
                    easing: Easing.linear
                }
            ),
            Animated.timing(
                this.state.bw2,
                {
                    toValue: 30,
                    duration: 1000,
                    easing: Easing.linear
                }
            ),
        ])
        //.start(()=>{
            // this.setState({   
            //      bh1: new Animated.Value(30),
            //      bw1: new Animated.Value(30),
            //      bh2: new Animated.Value(20),
            //      bw2: new Animated.Value(20),
            //     },
            //      ()=>this.animateBubble(20,30))
      //  }
     //   )
       
    ]).start(()=>this.tiktokAnim())

}

    render() {
        const spin = this.state.animateRotate.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
        })
        const Bg = this.state.animateBg.interpolate({
            inputRange: [0,0.25,0.50,0.75, 1],
            outputRange: ['red',"green","yellow","grey","pink"]
        })
        return (
            <View style={{ alignItems: "center" }}>
                <Text> Animations </Text>

                <Animated.View style={[styles.v1,
                {
                    transform: [{ rotate:spin }],
                    opacity: this.state.animateOpacity,
                    height: this.state.animateHeight,
                    width: this.state.animateWidth,
                    backgroundColor:Bg

                }]}>

                </Animated.View>
{/* //blinking dot */}
<View style={{flexDirection:"row",  marginTop:80,
width:70,
        marginBottom:80,alignItems:"center",justifyContent:"space-between"}}>
                <Animated.View style={[styles.v2,{
                    height:this.state.bh1,
                    width:this.state.bw1
                }
                ]}>

                </Animated.View>
                <Animated.View style={[styles.v3,{
                    height:this.state.bh2,
                    width:this.state.bw2
                }
                ]}>

                </Animated.View>
                </View>
                <Button
                    title="Pull"
                    onPress={() => this.animate(90)}
                />
                <Button
                    title="Push"
                    onPress={() => this.animate(0)}
                />
                <Button
                    title="PushSpring"
                    onPress={() => this.animateSpring(0)}
                />
                <Button
                    title="DISAPPEAR"
                    onPress={() => this.animateOpacity(0)}
                />
                <Button
                    title="APPEAR"
                    onPress={() => this.animateOpacity(1)}
                />
                <Button
                    title="Parallel Animations"
                    onPress={() => this.animateParallely(0, 200, 200, "360deg")}
                />
                <Button
                    title="Rotate"
                    onPress={() => this.animateRotate("360deg")}
                />
                <Button
                    title="ChangeColor"
                    onPress={() => this.animateBg("360deg")}
                />
                 <Button
                    title="Bubble"
                    onPress={() => this.tiktokAnim()}
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    v1: {
        height: 100,
        width: 100,
        backgroundColor: "red"
    },
    v2: {
        height: 20,
        width: 20,
        borderRadius:100,
        backgroundColor: "green",
      
    },v3:{
        height:30,
       // height: 20,
        width: 30,
        borderRadius:15,
        backgroundColor: "red",
    }
})
export default Animations;
