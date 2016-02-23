'use strict';

var React = require('react-native');

var {
  View,
  Text,
  StyleSheet,
  Component,
  Image
} = React;

class EndPage extends Component {
  render(){
    return (
      <View style={styles.container}>
        <Image source={require('../thumbnails/logoLowResWhite.png')} />
        <Text style={styles.content}>Are you serious?</Text>
        <Text style={styles.content}>Well thats it bro.</Text>
        <Text style={styles.content}>Thats all I got.</Text>
      </View>
    );
  };
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#300030'
  },
  content: {
    color: 'white',
    fontSize: 25,
    fontFamily: 'Hiragino Kaku Gothic ProN'
  }
});

module.exports = EndPage;
