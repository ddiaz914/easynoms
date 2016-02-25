'use strict';

var React = require('react-native');
const STORAGE_KEY = 'restaurantsKey';
import clamp from 'clamp';
var RestaurantInfo = require('./restaurantInfo');
var ImageModal = require('./imageModal');

var {
View,
Text,
Component,
AsyncStorage,
StyleSheet,
Image,
PanResponder,
Animated,
TouchableOpacity
} = React;

var SWIPE_THRESHOLD = 120;

class Restaurant extends Component {

  constructor(props) {
    super(props)
    this.state = {
      latitude: null,
      longitude: null,
      pan: new Animated.ValueXY(),
      enter: new Animated.Value(0.5)
    }
  }



  _goToNextRestaurant() {
    var restaurant = this.props.restaurant;
    this.props.navigator.replace({
      title: restaurant.name,
      component: Restaurant,
      index: this.props.index + 1
    });
  }

  openModal(index) {
    this.props.navigator.push({
      component: ImageModal,
      getImage: this.getImageSrc.bind(this),
      index: index
    });
  }

  render() {
    let { pan, enter, } = this.state;

    let [translateX, translateY] = [pan.x, pan.y];

    let rotate = pan.x.interpolate({inputRange: [-200, 0, 200], outputRange: ["-30deg", "0deg", "30deg"]});
    let opacity = pan.x.interpolate({inputRange: [-200, 0 , 200], outputRange: [0.5, 1, 0.5]});
    let scale = enter;

    let animatedCardStyles = {transform: [{translateX}, {translateY}, {rotate}, {scale}], opacity};

    let yupOpacity = pan.x.interpolate({inputRange: [0, 150], outputRange: [0, 1]});
    let yupScale = pan.x.interpolate({inputRange: [0, 150], outputRange: [0.5, 1], extrapolate: 'clamp'});
    let animatedYupStyles = {transform: [{scale: yupScale}], opacity: yupOpacity}

    let nopeOpacity = pan.x.interpolate({inputRange: [-150, 0], outputRange: [1, 0]});
    let nopeScale = pan.x.interpolate({inputRange: [-150, 0], outputRange: [1, 0.5], extrapolate: 'clamp'});
    let animatedNopeStyles = {transform: [{scale: nopeScale}], opacity: nopeOpacity}
    if(this.props.index === 0){
      var leftArrow =     <Image style={styles.leftArrow} source={require('../thumbnails/leftArrow.png')}/>;
      var leftText =      <Text style={styles.leftText}>Remove restaurant</Text>;
      var logo =          <Image style={styles.logoTutorial} source={require('../thumbnails/logohighreswhite_720.png')}/>;
      var rightText =     <Text style={styles.rightText}>Go to restaurant</Text>;
      var rightArrow =    <Image style={styles.rightArrow} source={require('../thumbnails/rightArrow.png')}/>;
     } else{
       var logo = <Image style={styles.logo} source={require('../thumbnails/logohighreswhite_720.png')}/>;
     }


    var currentRestaurant = this.props.restaurant;
    if (currentRestaurant) {
      var [url1, url2, url3, url4, url5] = currentRestaurant.photos;
    } else {
      SWIPE_THRESHOLD=1000;
    }


    return (
      <View style={styles.container} >
        <View style={styles.logoContainer}>
          {leftArrow}
          {leftText}
          {logo}
          {rightText}
          {rightArrow}
        </View>
        <View style={styles.headerMargins}>
        <Animated.View style={styles.card, animatedCardStyles} {...this._panResponder.panHandlers}>
            {url1 ?
              <TouchableOpacity onPress={this.openModal.bind(this, 0)}>
                <Image style={styles.iconhor} source={{uri: url1}} />
              </TouchableOpacity>
            : null}
          <Animated.View style={styles.card, animatedCardStyles, styles.squareView} {...this._panResponder.panHandlers}>
            {currentRestaurant.photos.length > 2 ?
              <TouchableOpacity onPress={this.openModal.bind(this, 1)}>
                <Image style={styles.iconver} source={{uri: url2}} />
              </TouchableOpacity> : <TouchableOpacity onPress={this.openModal.bind(this, url2)}>
                <Image style={styles.iconhor} source={{uri: url2}} />
              </TouchableOpacity>
            }
            {url3 ?
              <TouchableOpacity onPress={this.openModal.bind(this, 2)}>
                <Image style={styles.iconver} source={{uri: url3}} />
              </TouchableOpacity>
            : null}
          </Animated.View>
            {url4 ?
              <TouchableOpacity onPress={this.openModal.bind(this, 3)}>
              <Image style={styles.iconhor} source={{uri: url4}} />
              </TouchableOpacity>
              : null}
        </Animated.View>
        <Animated.View style={[styles.nope, animatedNopeStyles]} >
          <Text style={styles.nopeText}>No No</Text>
        </Animated.View>
        <Animated.View style={[styles.yup, animatedYupStyles]}>
          <Text style={styles.yupText}>Nom Nom</Text>
        </Animated.View>
        </View>
      </View>
    )
  }

  getImageSrc(index) {
    var index = Math.abs( index % this.props.restaurant.photos.length);
    return(this.props.restaurant.photos[index]);
  }

  componentDidMount(){
    this._animateEntrance();
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      onPanResponderGrant: (e, gestureState) => {
        this.state.pan.setOffset({x: this.state.pan.x._value, y: this.state.pan.y._value});
        this.state.pan.setValue({x: 0, y: 0});
      },

      onPanResponderMove: Animated.event([
        null, {dx: this.state.pan.x, dy: this.state.pan.y},
      ]),

      onPanResponderRelease: (e, {vx, vy}) => {
        this.state.pan.flattenOffset();
        var velocity;

        if (vx >= 0) {
          velocity = clamp(vx, 3, 5);
        } else if (vx < 0) {
          velocity = clamp(vx * -1, 3, 5) * -1;
        }

        if (Math.abs(this.state.pan.x._value) > SWIPE_THRESHOLD) {
          var swipeFunction = this.state.pan.x._value > SWIPE_THRESHOLD ?
            this._swipeRight.bind(this) :
            this._resetState.bind(this);

          Animated.decay(this.state.pan, {
            velocity: {x: velocity, y: vy},
            deceleration: 0.98
          }).start(swipeFunction)
        } else {
          Animated.spring(this.state.pan, {
            toValue: {x: 0, y: 0},
            friction: 4
          }).start()
        }
      }
    })
  }

  _resetState() {
    this.state.pan.setValue({x: 0, y: 0});
    this.state.enter.setValue(0);
    this._goToNextRestaurant();
    this._animateEntrance();

  }

  _swipeRight() {
    var restaurant = this.props.restaurant;
    this.state.pan.setValue({x: 0, y: 0});
    this.state.enter.setValue(1);
    this._goToInfo(restaurant);
  }

  _goToInfo(restaurant) {
    this.props.navigator.push({
      title: restaurant.name,
      component: RestaurantInfo,
      passProps: {restaurant: restaurant}
    });
  }

  _animateEntrance() {
    Animated.spring(
      this.state.enter,
      { toValue: 1, friction: 8 }
    ).start();
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop:20,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#300030',
  },
  content: {
    flex: 1,
    color: 'white',
    fontSize: 25,
    fontFamily: 'Hiragino Kaku Gothic ProN'
  },
  iconhor: {
    width: 400,
    height: 185,
    margin: 2,
    justifyContent: 'center',
  },
  iconver: {
    width: 200,
    height: 150,
    margin: 2,
    justifyContent: 'center',
  },
  squareView:{
    flexDirection: 'row'
  },
  card: {
    flex: 1,
    width: 200,
    height: 200,
    backgroundColor: 'red'
  },
  yup: {
    borderColor: 'white',
    borderWidth: 2,
    position: 'absolute',
    padding: 20,
    bottom: 20,
    borderRadius: 5,
    right: 20,
  },
  yupText: {
    fontSize: 20,
    color: 'white',
    fontFamily: 'Hiragino Kaku Gothic ProN',
    backgroundColor: 'transparent'
  },
  nope: {
    borderColor: 'white',
    borderWidth: 2,
    position: 'absolute',
    bottom: 20,
    padding: 20,
    borderRadius: 5,
    left: 20
  },
  nopeText: {
    fontSize: 20,
    color: 'white',
    fontFamily: 'Hiragino Kaku Gothic ProN',
    backgroundColor: 'transparent'
  },
  logo: {
    marginLeft: 133,
    marginTop: 20,
    height: 80,
    width: 120,
  },
  logoTutorial: {
    marginLeft: 7,
    marginRight: 7,
    marginTop: 20,
    height: 80,
    width: 120,
  },
  logoContainer: {
    flex: 1,
    flexDirection: 'column',
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerMargins: {
    marginTop: 115,
  },
  leftArrow: {
    height: 19.125,
    width: 23,
    margin: 6,
  },
  leftText: {
    color: 'white',
    fontSize: 10,
  },
  rightArrow: {
    height: 19.125,
    width: 23,
    margin: 6,
  },
  rightText: {
    color: 'white',
    fontSize: 10,
  }
})



module.exports = Restaurant;
