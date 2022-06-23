import React from 'react';
import {View, Animated, Dimensions, Text} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const window = Dimensions.get('window');

EStyleSheet.build({$rem: window.width / 390});

const Panel = ({panelHeight, contents}) => {
  return (
    <Animated.View style={[styles.panel, {height: panelHeight}]}>
      {contents}
    </Animated.View>
  );
};

const styles = EStyleSheet.create({
  panel: {
    alignSelf: 'stretch',
    position: 'absolute',
    width: window.width,
    bottom: 0,
    backgroundColor: '#F8F8F8',
    shadowOffset: {width: 0, height: '-5rem'},
    shadowOpacity: 0.2,
    shadowRadius: '10rem',
    borderTopLeftRadius: '20rem',
    borderTopRightRadius: '20rem',
    borderTopWidth: '25rem',
    borderLeftWidth: '43rem',
    borderRightWidth: '43rem',
    borderBottomWidth: '130rem',
    borderColor: '#F8F8F8',
    flexDirection: 'column',
    alignItems: 'center',
  },
});

export default Panel;
