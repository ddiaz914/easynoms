'use strict';

var React = require('react-native');

var {
  View,
  Text,
  StyleSheet,
  Component,
  Image,
  TouchableHighlight
} = React;

class EndPage extends Component {
  render(){
    return (
      <View style={styles.container}>
        <Image
            style={styles.logo}
            source={require('../thumbnails/logohighreswhite_720.png')}
          />
        <TouchableHighlight style={styles.refreshButton} underlayColor={'rgba(255,255,255,.8)'}
          onPress={this.resend.bind(this)}>
          <Text style={styles.buttonText}>Try again with current location</Text>
        </TouchableHighlight>
      </View>
    );
  };

  resend() {
    this.props.navigator.replace({
      reset: true
    });
  }
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
  },
  refreshButton: {
    borderColor: 'white',
    marginBottom: 7,
    marginTop: 7,
    borderWidth: 1,
    backgroundColor: '#300030',
    padding: 7,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white'
  }
});

module.exports = EndPage;
