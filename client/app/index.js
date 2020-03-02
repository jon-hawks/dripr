import React, {Component} from 'react';
import {
    FlatList,
    Platform,
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
} from 'react-native/Libraries/NewAppScreen';

class App extends Component {
    constructor() {
        super();

        /* Connect to meteor server. */
        let ip = 'dripr.cenari.us';
        if(__DEV__){
            ip = '127.0.0.1';
            if(Platform.OS === 'android') ip = '10.0.2.2';
        }
        Meteor.connect('ws://' + ip + ':3000/websocket');
    }

    addStock() {
        const name = Math.floor(Math.random() * 10);
        Meteor.call('Stocks.addOne', { name }, (err, res) => {
            console.log('Stocks.addOne', err, res);
        });
    }

    render() {
        console.log(this.props.stocks);
        return (
            <>
                <StatusBar barStyle="light-content" />
                <SafeAreaView style={styles.body}>
                    <Text style={styles.text}>
                        Welcome to React Native + Meteor!
                    </Text>
                    <Text style={styles.text}>
                        Stock Count: {this.props.stocks.length}
                    </Text>
                    <TouchableOpacity style={styles.listItem} onPress={this.addStock}>
                        <Text style={styles.text}>Add Stock</Text>
                    </TouchableOpacity>
                    <FlatList
                        data={this.props.stocks}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={styles.listItem} onPress={this.viewStock}>
                                <Text style={styles.text}>{item._id}</Text>
                            </TouchableOpacity>
                        )}
                        keyExtractor={item => item._id}
                    />
                </SafeAreaView>
            </>
        );
    }
};

const styles = StyleSheet.create({
    body: {
        backgroundColor: '#111',
    },
    text: {
        color: '#ccc',
    },
});

export default createContainer(() => {
    Meteor.subscribe('stocks');
    return {
        stocks: Meteor.collection('stocks').find(),
    };
}, App);
