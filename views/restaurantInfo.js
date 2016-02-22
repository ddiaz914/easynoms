var React = require('react-native');

var {
View,
Text,
Component,
AsyncStorage,
StyleSheet,
Image,
PanResponder,
Animated,
MapView
} = React;

const DELTA = 0.003021;

class RestaurantInfo extends Component {

  render() {
    var restaurant = this.props.restaurant;
    console.log(restaurant)
    if(restaurant) {
      var content = (
        <View style={styles.container}>
          <MapView style={styles.map}
            showUserLocation='true'
            region={{
              latitude: restaurant.lat,
              longitude: restaurant.lng,
              latitudeDelta: DELTA,
              longitudeDelta: DELTA,
            }}
          />
        <Text>{restaurant.name}</Text>
          <Text>Latitude: {restaurant.lat}</Text>
          <Text>Longitude: {restaurant.lng}</Text>
          <Text>{restaurant.website}</Text>
        </View>);
    } else {
      var content = 'NONTHING';
    }

    return (<View style={styles.container}>
          {content}
        </View>)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  map: {
    width: 300,
    height: 150
  }
})

module.exports = RestaurantInfo;
