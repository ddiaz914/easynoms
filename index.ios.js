/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

const STORAGE_KEY = 'restaurantsKey';

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  TextInput,
  NavigatorIOS,
  AsyncStorage
} from 'react-native';

var Restaurant = require('./views/restaurants');
var RestaurantInfo = require('./views/restaurantInfo');

class EasyNoms extends Component {

  constructor(props) {
    super(props);
    this.state = {
      restaurants: null
    }
  }

  render() {
    console.log(this.state.restaurants)
    return (
    <NavigatorIOS
      style={styles.wrapper}
      initialRoute={{
        title: 'Nom Noms',
        component: Restaurant,
        passProps: { restaurant: this.getRestaurant.bind(this), index: 0 }
      }}
    ></NavigatorIOS>
    );
  }

  getRestaurant(index) {
    if(this.state.restaurants) {
      console.log(this.state.restaurants);
      return this.state.restaurants[index];
    };
    return null;
  }

  componentDidMount() {
    AsyncStorage.getItem(STORAGE_KEY).then((value) => {
      this.setState({restaurants: JSON.parse(value)})
    })
    // navigator.geolocation.getCurrentPosition(( position) => {this.fetchData(position.coords)});
  }

  fetchData({latitude, longitude}) {
    var promise = fetch('http://agile-sands-84514.heroku.com/restaurants.json?latitude=' + latitude + '&longitude=' + longitude);
    promise.then((response) => response.json()).then((responseData) => {
        var restaurants = JSON.stringify(responseData);
        AsyncStorage.setItem(STORAGE_KEY, restaurants);
        this.setState({restaurants: restaurants });
    }).done();
  }
}


var styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  }
});

AppRegistry.registerComponent('EasyNoms', () => EasyNoms);
