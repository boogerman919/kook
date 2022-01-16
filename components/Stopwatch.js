import React from 'react';
import {Text, Animated, Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const window = Dimensions.get('window');

EStyleSheet.build({$rem: window.width / 390});

const Stopwatch = ({time, stopwatchOpacity}) => {
  return (
    <Animated.Text style={[styles.stopwatch, {opacity: stopwatchOpacity}]}>
      {time}
    </Animated.Text>
  );
};

const styles = EStyleSheet.create({
  stopwatch: {
    position: 'absolute',
    bottom: '120rem',
    color: 'black',
    fontSize: '34rem',
    fontFamily: 'Montserrat-SemiBold',
    letterSpacing: '0.5rem',
  },
});

export default Stopwatch;
