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
    console.log(this.props.uri)
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
