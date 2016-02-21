'use strict';

var React = require('react-native');
const STORAGE_KEY = 'restaurantsKey';

var {
View,
Text,
Component,
AsyncStorage,
StyleSheet,
Image
} = React;

class Restaurant extends Component {

  constructor(props) {
    super(props)
    this.state = {
      restaurants: null,
      latitude: null,
      longitude: null
    }
  }



  render() {
    if (this.state.restaurants) {
      console.log(this.state.restaurants);
      var content = <Text>{this.state.restaurants[9].vicinity}</Text>;
    }
    return (
      <View style={styles.container} >
        <View >
          <Image
            style={styles.icon}
            source={{uri: 'http://barcodedc.com/wp-content/gallery/food/healthfitnessrevolution-com.jpg'}}
          />
          {content}
        </View>
      </View>
    )
  }

  fetchData({latitude, longitude}) {
    fetch('http://agile-sands-84514.heroku.com/restaurants.json?latitude=' + latitude + '&longitude=' + longitude)
      .then((response) => response.json())
      .then((responseData) => {
        var restaurants = JSON.stringify(responseData);
        console.log(restaurants); // DEBUGGING
        AsyncStorage.setItem(STORAGE_KEY, restaurants);
        this.setState({restaurants: restaurants })
    }).done();
  }



  componentDidMount() {
    AsyncStorage.getItem(STORAGE_KEY).then((value) => {
      this.setState({restaurants: JSON.parse(value)})
    })
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.fetchData(position.coords);
      }
    );
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
  icon: {
    width: 400,
    height: 300,
    justifyContent: 'center'
  }
})

module.exports = Restaurant;
