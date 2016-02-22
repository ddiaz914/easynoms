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
    if(!this.state.restaurants) {
      return this.renderLoadingScreen();
    }
    return (
    <NavigatorIOS
      style={styles.wrapper}
      initialRoute={{
        title: 'Easy Noms',
        component: Restaurant,
        passProps: { restaurant: this.getRestaurant.bind(this), index: 0 }
      }}
    ></NavigatorIOS>
    );
  }

  getRestaurant(index) {
    if(this.state.restaurants) {
      // console.log(this.state.restaurants);
      return this.state.restaurants[index];
    };
    return null;
  }

  componentDidMount() {
    // Leave for potential caching / debuggin purposes
    AsyncStorage.getItem(STORAGE_KEY).then((value) => {
      this.setState({restaurants: JSON.parse(value)})
    })
    // Gets data based on geo coordinates
    // navigator.geolocation.getCurrentPosition(( position) => {this.fetchData(position.coords)});
  }

  fetchData({latitude, longitude}) {
    console.log(latitude);
    var promise = fetch('http://agile-sands-84514.heroku.com/restaurants.json?latitude=' + latitude + '&longitude=' + longitude);
    promise.then((response) => response.json()).then((restaurants) => {
        AsyncStorage.setItem(STORAGE_KEY, restaurants);
        this.setState({restaurants: restaurants });
    })
    .catch( (error) => console.log(error) )
    .done();
  }

  renderLoadingScreen() {
    return (
      <View style={styles.loading}>
        <Text>Loading</Text>
      </View>
    )
  }
}


var styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#300030'
  }
});

AppRegistry.registerComponent('EasyNoms', () => EasyNoms);
