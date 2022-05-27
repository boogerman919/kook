import React from 'react';
import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const window = Dimensions.get('window');

EStyleSheet.build({$rem: window.width / 390});

const Button = ({position, icon, action}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={[styles.btn, position]}
      onPress={() => {
        action();
      }}>
      <Text style={styles.btnText}>≡</Text>
    </TouchableOpacity>
  );
};

const styles = EStyleSheet.create({
  btn: {
    backgroundColor: '#FFFFFF',
    height: '42rem',
    width: '42rem',
    borderRadius: '21rem',
    shadowOffset: {width: 0, height: '-1rem'},
    shadowOpacity: 0.12,
    shadowRadius: '15rem',
  },
  btnText: {
    color: '#595959',
    paddingTop: '4rem',
    fontSize: '26rem',
    fontFamily: 'Montserrat-SemiBold',
    textAlign: 'center',
  },
});

export default Button;
