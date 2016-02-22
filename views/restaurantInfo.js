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
          <Text style={styles.content}>{restaurant.name}</Text>
          <Text style={styles.content}>Latitude: {restaurant.lat}</Text>
          <Text style={styles.content}>Longitude: {restaurant.lng}</Text>
          <Text style={styles.content}>{restaurant.website}</Text>
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
    backgroundColor: '#300030',
  },
  content: {
    color: 'white',
    fontFamily: 'Hiragino Kaku Gothic ProN'
  }
})

module.exports = RestaurantInfo;
