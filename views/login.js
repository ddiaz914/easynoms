'use strict';

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
} from 'react-native';

const styles = require('../stylesheets/loginStyle');

class Login extends Component {
  render() {
    console.log('HEIUHAIOSHDAOIHS')
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to Easy Noms!
        </Text>
        <Text style={styles.instructions}>
          Latitude:
        </Text>
        <Text style={styles.instructions}>
          Longitude:
        </Text>
        <TouchableHighlight>
          <Text style={styles.button}>Get Location</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

module.exports = Login
