var React = require('react-native');

import clamp from 'clamp';

var {
  View,
  Text,
  Image,
  Component,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  PanResponder,
  Animated,
} = React;

const SWIPE_THRESHOLD = 120;

var {
  height: deviceHeight,
  width: deviceWidth
} = Dimensions.get('window');

class ImageModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pan: new Animated.ValueXY(),
      enter: new Animated.Value(1)
    }
  }

  image() {
    return( this.props.getImage(this.props.index) );
  }

  render() {
    return(
      <View style={styles.modal} >
        <Animated.View style={this._getAnimationStyle()} {...this._panResponder.panHandlers}>
          <TouchableOpacity style={styles.close} onPress={() => this.close.call(this) }>
            <Image style={styles.modalImage} source={{uri: this.image()}}/>
          </TouchableOpacity>
        </Animated.View>
      </View>
    )
  }

  close() {
    this.props.navigator.pop();
  }

  _nextPhoto() {
    this.props.navigator.replace({
      component: ImageModal,
      getImage: this.props.getImage,
      index: this.props.index + 1
    });
    this._resetState();
  }

  _getAnimationStyle() {
    let { pan } = this.state;
    let [translateX, translateY] = [pan.x, 0];
    return{transform: [{translateX}, {translateY}]};
  }

  _resetState() {
    this.state.pan.setValue({x: 0, y: 0});
  }

  _prevPhoto() {
    this.props.navigator.replace({
      component: ImageModal,
      getImage: this.props.getImage,
      index: this.props.index - 1
    });
    this._resetState();
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
            this._nextPhoto.bind(this) :
            this._prevPhoto.bind(this);

          Animated.decay(this.state.pan, {
            velocity: {x: velocity*2, y: vy*2},
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
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'rgba(0,0,0,.8)',
    justifyContent: 'center'
  },
  close: {
    alignSelf: 'center',
  },
  modalImage: {
    width: deviceWidth,
    height: deviceHeight,
    resizeMode: Image.resizeMode.contain
  }
});

module.exports = ImageModal;
