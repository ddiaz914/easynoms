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
    var restaurant = this.props.restaurant(0);
    if(restaurant) {
      var content = restaurant.name;
    } else {
      var content = 'NONTHING';
    }

    return (<View style={styles.container}>
          <Text>{content}</Text>
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
