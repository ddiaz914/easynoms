var React = require('react-native');

var {
View,
Text,
Component,
AsyncStorage,
StyleSheet,
Image,
PanResponder,
Animated
} = React;

class RestaurantInfo extends Component {

  render() {
    var restaurant = this.props.restaurant;
    console.log(restaurant)
    if(restaurant) {
      var content = (<View style={styles.container}>
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
  }
})

module.exports = RestaurantInfo;
