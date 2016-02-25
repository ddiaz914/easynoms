var React = require('react-native');

var {
View,
Text,
Component,
StyleSheet,
Image,
Animated,
} = React;

class LoadingScreen extends Component {

  componentWillMount() {
    this._animatedValue = new Animated.Value(0);
  }

  cycleAnimation() {
    Animated.timing(this._animatedValue, {
      toValue: 100,
      duration: 3000
    }).start(() => {
      this._animatedValue.setValue(0);
      this.cycleAnimation();
    });
  }

  componentDidMount() {
    this.cycleAnimation();
  }

  render() {
    var rotationSettings = this._animatedValue.interpolate({
      inputRange: [0, 100],
      outputRange: ['0deg', '360deg']
    });
    var transform = {
      transform: [{rotate: rotationSettings}]
    };

    return (
      <View style={styles.loading}>
          <Animated.Image
            style={[styles.loadingLogo, transform]}
            source={require('../thumbnails/animationLowResWhite.png')}
          />
      </View>
    )
  }

}
const styles = StyleSheet.create({
  loading: {
    marginTop:20,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#300030'
  },
  loadingLogo: {
    height: 200,
    width: 200
  }
});

module.exports = LoadingScreen;
