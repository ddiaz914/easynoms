/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  TextInput,
  NavigatorIOS,
} from 'react-native';

var Restaurant = require('./views/restaurants');

class EasyNoms extends Component {

  render() {
    return (
    <NavigatorIOS
      style={styles.wrapper}
      initialRoute={{
        title: 'Nom Noms',
        component: Restaurant,
      }}
    />
    );
  }
}



var styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  }
});

AppRegistry.registerComponent('EasyNoms', () => EasyNoms);
