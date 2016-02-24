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
  height: deviceHeight,
  width: deviceWidth
} = Dimensions.get('window');

class ImageModal extends Component {
  render() {
    return(
      <View style={styles.modal}>
        <TouchableOpacity style={styles.close} onPress={() => this.close.call(this) }>
          <Image style={styles.modalImage} source={{uri: this.props.uri}}/>
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
  },
  close: {
    alignSelf: 'center',
    backgroundColor: 'white',
    height: 40
  },
  modalImage: {
    width: deviceWidth,
    height: deviceHeight
  }
});

module.exports = ImageModal;
