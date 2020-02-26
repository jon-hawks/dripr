import React, { Component } from 'react';
import {
  List,
  ListItem,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Meteor, { createContainer } from 'react-native-meteor';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

class App extends Component {
  constructor() {
    super();
    Meteor.connect('ws://localhost:3000/websocket');
  }

  handleAddStock() {
    const name = Math.floor(Math.random() * 10);
    Meteor.call('Stocks.addOne', { name }, (err, res) => {
      console.log('Stocks.addOne', err, res);
    });
  }

  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <View style={styles.body}>
              <View style={styles.container}>
                <Text style={styles.welcome}>
                  Welcome to React Native + Meteor!
                </Text>
                <Text style={styles.instructions}>
                  Stock Count: {this.props.count}
                </Text>
                <TouchableOpacity style={styles.button} onPress={this.handleAddStock}>
                  <Text>Add Stock</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  button: {
    padding: 10,
    backgroundColor: '#c5c5c5',
  },
});

export default createContainer(() => {
  Meteor.subscribe('stocks');
  return {
    count: Meteor.collection('stocks').find().length,
  };
}, App);
