import React, { Component } from 'react';
import { Modal, Text, TouchableHighlight, TouchableOpacity, StyleSheet, View, Alert } from 'react-native';

export default class RNModal extends Component {
  state = {
    modalVisible: false,
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          position: "absolute",
          top: 0,
          zIndex: 200
        }}

        onStartShouldSetResponder={() => console.warn("jhgd")
        }
      >
        <Text> jghejhgerhj</Text>
        <TouchableHighlight
          onPress={() => {
            this.setModalVisible(true);
          }}>
          <Text>Show Modal</Text>
        </TouchableHighlight>
        <Modal

          presentationStyle="overFullScreen"
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}

        >
          {/* for detecting the touch outside the modal */}

          <View
            style={styles.v1}>
            <View>
              <Text>Hello World!</Text>

              <TouchableOpacity
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text>Hide Modal</Text>
              </TouchableOpacity>
            </View>
          </View>

        </Modal>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  v1: {
    position: "absolute",
    bottom: 0,
    height: 300,
    width: "100%",
    zIndex: 300,
    backgroundColor: "pink"
  }
})