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

  render() {
    return (
      <View style={styles.loading}>
          <Image
            style={styles.loadingLogo}
            source={require('../thumbnails/animationLowResWhite.png')}
          />
      </View>
    )
  }

}
const styles = StyleSheet.create({
  loading: {
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
