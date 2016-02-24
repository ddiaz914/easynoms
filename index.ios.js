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
  Navigator,
  AsyncStorage,
  TouchableOpacity,
  Image
} from 'react-native';

var Restaurant = require('./views/restaurants');
var RestaurantInfo = require('./views/restaurantInfo');
var EndPage = require('./views/endpage');
var LoadingScreen = require('./views/loadingScreen');
var ImageModal = require('./views/imageModal');

class EasyNoms extends Component {

  constructor(props) {
    super(props);
    this.state = {
      restaurants: null,
    }
  }

  renderRestaurant(route, navigator) {
    if(route.index >= this.state.restaurants.length) {
      return <EndPage/>
    };
    return(
      <Restaurant
        restaurant={this.state.restaurants[route.index]}
        index={route.index}
        navigator={navigator}
      />
    );
  }

  renderScene(route, navigator){

    switch(route.component) {
      case Restaurant:
        return this.renderRestaurant(route, navigator);
      case ImageModal:
        return <ImageModal navigator={navigator} uri={route.url}/>
      case RestaurantInfo:
        return(
          <RestaurantInfo
            restaurant={route.passProps.restaurant}
            navigator={navigator}
          /> );
      default:
        return <EndPage/>
    }
  }

  render() {
    console.log(this.state.restaurants)
    if(!this.state.restaurants) {
      return <LoadingScreen />;
    }

    return(
      <View style={styles.wrapper}>
        <Navigator
          style={styles.wrapper}
          initialRoute={{
            title: 'Easy Noms',
            component: Restaurant,
            index: 0
          }}
          renderScene={this.renderScene.bind(this)}
          configureScene={this.configScene.bind(this)}
        />
      </View>
    );
  }

  configScene(route, routeStack) {
    console.log(Navigator.SceneConfigs)
    switch(route.component) {
      case ImageModal:
        return Navigator.SceneConfigs.FloatFromBottom;
      default:
        return Navigator.SceneConfigs.FloatFromRight;
    }
  }

  getRestaurant(index) {
    if(this.state.restaurants) {
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
    var promise = fetch('http://floating-hamlet-80631.heroku.com/restaurants.json?latitude=' + latitude + '&longitude=' + longitude);
    promise.then((response) => response.json()).then((restaurants) => {
        // AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(restaurants));
        this.setState({restaurants: restaurants });
    })
    .catch( (error) => console.log(error) )
    .done();
  }
}

var styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },

});

AppRegistry.registerComponent('EasyNoms', () => EasyNoms);
