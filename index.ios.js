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
  TouchableHighlight,
  NavigatorIOS,
} from 'react-native';

var Login = require('./views/login');

 var locatn = navigator.geolocation.getCurrentPosition(
  (position) => {
    console.log(position);
    }
  );

class EasyNoms extends Component {
  render() {
    return (
    <NavigatorIOS
      initialRoute={{
        title: 'Nom Noms',
        component: Login,
      }}
    />
    );
  }
}


AppRegistry.registerComponent('EasyNoms', () => EasyNoms);
