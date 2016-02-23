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
MapView,
TouchableOpacity,
Linking
} = React;

const DELTA = 0.003021;

class RestaurantInfo extends Component {

  renderBackButton() {
    return (
      <TouchableOpacity
        onPress={this.goBack.bind(this)}
      >
        <Text style={styles.backButton}> {'< Back'} </Text>
      </TouchableOpacity>)
  }

  goBack() {
    this.props.navigator.pop();
  }

  render() {
    var restaurant = this.props.restaurant;
    console.log(restaurant)
    if(restaurant) {

      var content = (
        <View style={styles.container}>
          {this.renderBackButton()}
           <Image
            style={styles.logo}
            source={require('../thumbnails/logoLowResWhite.png')}
          />
          <Text style={styles.title}>{restaurant.name}</Text>
          <MapView style={styles.map}
            showUserLocation={true}
            region={{
              latitude: Number(restaurant.lat),
              longitude: Number(restaurant.lng),
              latitudeDelta: DELTA,
              longitudeDelta: DELTA,
            }}
          />
          <TouchableOpacity
            onPress={ () => { Linking.openURL(restaurant.website)}}
          >
            <Text style={styles.content}>Go To Webpage</Text>
          </TouchableOpacity>
        </View>);
    } else {
      var content = 'NOTHING';
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
  title: {
    color: 'white',
    fontFamily: 'Hiragino Kaku Gothic ProN',
    marginBottom: 10,
    marginTop: 10
  },
  content: {
    color: 'white',
    fontFamily: 'Hiragino Kaku Gothic ProN',
    marginBottom: 80
  },
  map: {
    width: 350,
    height: 350,
    marginBottom: 10
  },
  logo: {
    // marginTop: 10,
    marginBottom: 10,
    height: 100,
    width: 150
  },
  backButton: {
    color: 'white',
    marginRight: 310,
    fontWeight: 'bold',
  }
})

module.exports = RestaurantInfo;
