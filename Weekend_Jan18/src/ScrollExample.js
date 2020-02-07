import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, FlatList } from 'react-native';

class ScrollExample extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View>
                <ScrollView
                    style={styles.scrollView}
                    nestedScrollEnabled={true}
                    >

                    <View style={{ height: 50, backgroundColor: "grey" }}>
                        <ScrollView>
                            <Text> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                          aliquip ex ea commodo consequat.
                </Text>
                        </ScrollView>
                    </View>

                    <View style={{ height: 50, marginTop: 20, backgroundColor: "white" }}>
                        <ScrollView>
                            <Text> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                          aliquip ex ea commodo consequat. Duis aute irure dolor in
                          reprehenderit in voluptate ve
                </Text>
                        </ScrollView>
                    </View>

                    <View style={{ height: 50, marginTop: 20, backgroundColor: "red" }}>
                        <ScrollView>
                            <Text> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                          aliquip ex ea commodo consequat. Duis aute irure dolor in
                          reprehenderit in voluptate ve
                </Text>
                        </ScrollView>
                    </View>

                    <View style={{ height: 50, marginTop: 20, backgroundColor: "green" }}>
                        <ScrollView 
                         nestedScrollEnabled={true}>
                            <Text> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                          aliquip ex ea commodo consequat. Duis aute irure dolor in
                          reprehenderit in voluptate ve
                </Text>
                        </ScrollView>
                    </View>


                    {/* flatList */}
                    <View style={{ height: 100, marginTop: 20, backgroundColor: "grey" }}>
                        <FlatList
                            data={[{}, {}, {}, {}, {}, {}, {}, {}, {}]}
                            keyExtractor={(item) => item.index}
                            nestedScrollEnabled={true}
                            renderItem={({ item }) => {
                                return (
                                    <View style={{ marginTop: 20, backgroundColor: "yellow" }}>
                                        <Text style={{ marginTop: 20, fontSize: 20 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                               minim veniam, quis nostrud exercitation </Text>
                                    </View>
                                )

                            }}
                        />
                    </View>

                    {/* flatList horizontal */}
                    <View style={{ height: 100, marginTop: 20, backgroundColor: "grey" }}>
                        <FlatList
                            data={[{}, {}, {}, {}, {}, {}, {}, {}, {}]}
                            keyExtractor={(item) => item.id}
                            horizontal={true}
                            renderItem={({ item }) => {
                                return (
                                    <View style={{ marginLeft: 20, backgroundColor: "yellow", height: 50, width: 100 }}>
                                        <ScrollView>
                                            <Text style={{ fontSize: 20 }}>Lorem agna aliqua. Ut enim ad
                               minim veniam, quis nostrud exercitation </Text>
                                        </ScrollView>
                                    </View>
                                )

                            }}
                        />
                    </View>

                     {/* flatList horizontal */}
                     <View style={{ height: 100, marginTop: 20, backgroundColor: "grey" }}>
                        <FlatList
                            data={[{}, {}, {}, {}, {}, {}, {}, {}, {}]}
                            keyExtractor={(item) => item.id}
                            horizontal={true}
                            renderItem={({ item }) => {
                                return (
                                    <View style={{ marginLeft: 20, backgroundColor: "yellow", height: 50, width: 100 }}>
                                        <ScrollView>
                                            <Text style={{ fontSize: 20 }}>Lorem agna aliqua. Ut enim ad
                               minim veniam, quis nostrud exercitation </Text>
                                        </ScrollView>
                                    </View>
                                )

                            }}
                        />
                    </View>

                     {/* flatList horizontal */}
                     <View style={{ height: 100, marginTop: 20, backgroundColor: "grey" }}>
                        <FlatList
                            data={[{}, {}, {}, {}, {}, {}, {}, {}, {}]}
                            keyExtractor={(item) => item.id}
                            nestedScrollEnabled={true}
                            horizontal={true}
                            renderItem={({ item }) => {
                                return (
                                    <View style={{ marginLeft: 20, backgroundColor: "yellow", height: 50, width: 100 }}>
                                        <ScrollView
                                         nestedScrollEnabled={true}
                                        >
                                            <Text style={{ fontSize: 20 }}>Lorem agna aliqua. Ut enim ad
                               minim veniam, quis nostrud exercitation </Text>
                                        </ScrollView>
                                    </View>
                                )

                            }}
                        />
                    </View>

                </ScrollView>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: 'pink',
        marginHorizontal: 20,
        paddingHorizontal: 20,
        // flex: 1,
    },
    text: {
        fontSize: 42,
    },

})

export default ScrollExample;
