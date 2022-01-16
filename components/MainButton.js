import React from 'react';
import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const window = Dimensions.get('window');

EStyleSheet.build({$rem: window.width / 390});

const Button = ({
  buttonReaction,
  currentStage,
  text,
  buttonColor,
  buttonOpacity,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={buttonOpacity}
      style={[styles.btn, {backgroundColor: buttonColor}]}
      onPress={() => {
        buttonReaction(currentStage);
      }}>
      <Text style={styles.btnText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = EStyleSheet.create({
  btn: {
    position: 'absolute',
    width: '78%',
    aspectRatio: 5,
    bottom: '5%',
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

export default Button;
