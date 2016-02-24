var React = require('react-native');

var {
  View,
  Text,
  Image,
  Component,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} = React;

var {
  height: deviceHeight
} = Dimensions.get('window');

class ImageModal extends Component {
  render() {
    return(
      <View style={styles.modal}>
        <TouchableOpacity style={styles.close} onPress={() => this.close.call(this) }>
          <Text>IMAGE MODAL</Text>
        </TouchableOpacity>
      </View>
    )
  }

  close() {
    this.props.navigator.pop();
  }
}

const styles = StyleSheet.create({
  modal: {
    height: deviceHeight,
    backgroundColor: 'rgba(0,0,0,0.8)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  close: {
    alignSelf: 'center',
    backgroundColor: 'white',
    height: 40
  }
});

module.exports = ImageModal;
