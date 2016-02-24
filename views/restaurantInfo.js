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
      if(restaurant.website){
        var website = <TouchableOpacity onPress={ () => { Linking.openURL(restaurant.website)}}><Text style={styles.websiteButton}>Go To Webpage</Text></TouchableOpacity>;
      }
      var splitAddress=restaurant.address.split(", ");
      var streetAddress = splitAddress[0];
      var city = splitAddress[1];
      var stateAndZip = splitAddress[2];
      var content = (
        <View style={styles.container}>
           <Image
            style={styles.logo}
            source={require('../thumbnails/logohighreswhite_720.png')}
          />
          <Text style={styles.title}>{restaurant.name}</Text>
          <MapView
            style={styles.map}
            showUserLocation={true}
            region={{
              latitude: Number(restaurant.lat),
              longitude: Number(restaurant.lng),
              latitudeDelta: DELTA,
              longitudeDelta: DELTA,
            }}
            onPress={ () => { Linking.openURL("http://maps.apple.com/?daddr=" + restaurant.lat + "," + restaurant.lng)}}
            annotations={[{
              animateDrop: true,
              latitude: Number(restaurant.lat),
              longitude: Number(restaurant.lng),
              title: restaurant.address,
            }]}
          />
          {website}
          <Text style={styles.directions} onPress={()=>{Linking.openURL("http://maps.apple.com/?daddr=" + restaurant.lat + "," + restaurant.lng)}}>Directions</Text>
          {<TouchableOpacity onPress={()=>{Linking.openURL("tel:" + restaurant.phone)}}>
            <Text style={styles.phoneNumber}>{restaurant.phone}</Text>
          </TouchableOpacity>}
          <Text style={styles.content}>{city}, {stateAndZip}</Text>
          {this.renderBackButton()}
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
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 10
  },
  content: {
    color: 'white',
    fontFamily: 'Hiragino Kaku Gothic ProN',
  },
  map: {
    width: 350,
    height: 310,
    marginBottom: 5,
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
  },
  websiteButton: {
    textAlign: 'center',
    color: 'white',
    marginBottom: 2,
    marginTop: 7,
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: '#300030',
    padding: 7,
    borderRadius: 5,
  },
  directions: {
    textAlign: 'center',
    color: 'white',
    marginBottom: 2,
    marginTop: 2,
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: '#300030',
    padding: 7,
    borderRadius: 5,
  },
  phoneNumber: {
    textDecorationLine: 'underline',
    color: 'white',
    paddingBottom: 4,
    marginTop: 4
  }
})

module.exports = RestaurantInfo;
