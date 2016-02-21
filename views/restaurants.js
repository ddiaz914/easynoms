'use strict';

var React = require('react-native');
const STORAGE_KEY = 'restaurantsKey';
import clamp from 'clamp';

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

var SWIPE_THRESHOLD = 120;

class Restaurant extends Component {

  constructor(props) {
    super(props)
    this.state = {
      latitude: null,
      longitude: null,
      pan: new Animated.ValueXY(),
      enter: new Animated.Value(1)
    }
  }



  _goToNextRestaurant() {
    this.props.navigator.replace({
      title: 'nonosdfpos',
      component: Restaurant,
      passProps: { restaurant: this.props.restaurant, index: this.props.index + 1 }
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

    var currentRestaurant = this.props.restaurant(this.props.index);
    console.log(currentRestaurant);
    if (currentRestaurant) {
      // console.log(this.state.restaurants); // DEBUGGING
      var content = <Text>{currentRestaurant.vicinity}</Text>;
    } else {
      var content = <Text>Restaurant disappeared!</Text>
    }

    return (
      <View style={styles.container} >
          {content}

        <Animated.View style={styles.card, animatedCardStyles} {...this._panResponder.panHandlers}>
          <Image
            style={styles.icon}
            source={{uri: 'http://barcodedc.com/wp-content/gallery/food/healthfitnessrevolution-com.jpg'}}
          />
        </Animated.View>

        <Animated.View style={[styles.nope, animatedNopeStyles]} >
          <Text style={styles.nopeText}>Nope</Text>
        </Animated.View>
        <Animated.View style={[styles.yup, animatedYupStyles]}>
          <Text style={styles.yupText}>Yup</Text>
        </Animated.View>
      </View>
    )
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
          if(-this.state.pan.x._value > SWIPE_THRESHOLD) {
          }
          Animated.decay(this.state.pan, {
            velocity: {x: velocity, y: vy},
            deceleration: 0.98
          }).start(this._resetState.bind(this))
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
    console.log(this)
    this.state.pan.setValue({x: 0, y: 0});
    this.state.enter.setValue(0);
    this._goToNextRestaurant();
    this._animateEntrance();
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
  },
  card: {
    width: 200,
    height: 200,
    backgroundColor: 'red'
  },
  yup: {
    borderColor: 'green',
    borderWidth: 2,
    position: 'absolute',
    padding: 20,
    bottom: 20,
    borderRadius: 5,
    right: 20,
  },
  yupText: {
    fontSize: 16,
    color: 'green',
  },
  nope: {
    borderColor: 'red',
    borderWidth: 2,
    position: 'absolute',
    bottom: 20,
    padding: 20,
    borderRadius: 5,
    left: 20,
  },
  nopeText: {
    fontSize: 16,
    color: 'red',
  }
})



module.exports = Restaurant;
