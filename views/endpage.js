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
        <Image
            style={styles.logo}
            source={require('../thumbnails/logohighreswhite_720.png')}
          />
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
  },
  logo: {
    height: 300,
    width: 350
  }
});

module.exports = EndPage;
