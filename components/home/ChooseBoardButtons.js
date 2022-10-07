import React from 'react';
import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const window = Dimensions.get('window');

var rem = window.width / 390;
EStyleSheet.build({$rem: rem});

const ChooseBoardButtons = ({showBtns, action}) => {
  return (
    <View
      style={[styles.container, {display: showBtns == 1 ? 'flex' : 'none'}]}>
      <TouchableOpacity
        activeOpacity={0.6}
        style={[styles.btn, {marginRight: 5 * rem}]}
        onPress={() => {
          action('left');
        }}>
        <Text style={styles.btnText}>Left</Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.6}
        style={[styles.btn, {marginLeft: 5 * rem}]}
        onPress={() => {
          action('right');
        }}>
        <Text style={styles.btnText}>Right</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = EStyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    aspectRatio: 5,
    marginTop: '37rem',
  },
  btn: {
    flex: 1,
    backgroundColor: '#00EBB6',
    shadowOffset: {width: 0, height: '-2rem'},
    shadowOpacity: 0.15,
    shadowRadius: '10rem',
    borderRadius: '8rem',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    color: '#FFFFFF',
    fontSize: '28rem',
    fontFamily: 'Montserrat-SemiBold',
  },
});

export default ChooseBoardButtons;
