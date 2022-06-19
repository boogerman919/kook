'use strict';
import React, {useState, useContext} from 'react';
import {
  View,
  Dimensions,
  Animated,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {AuthContext} from './context';
import {Linking} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {ScrollView} from 'react-native-gesture-handler';

const window = Dimensions.get('window');

var rem = window.width / 390;
EStyleSheet.build({$rem: rem});

const Legal = ({display}) => {
  return (
    <View style={[styles.container]} display={display}>
      <Text style={styles.title}>Legal</Text>
      <Text style={styles.text}>
        Follow to our{'\n'}
        <Text
          style={styles.link}
          onPress={() => Linking.openURL('http://google.com')}>
          website
        </Text>{' '}
        to check out {'\n'} our legal terms
      </Text>
    </View>
  );
};

const styles = EStyleSheet.create({
  container: {
    backgroundColor: '#10e6b5',
    width: '100%',
    height: '100%',
    position: 'relative',
    // top: '-61rem',
    marginLeft: '-61rem',
    flexGrow: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: '28rem',
    color: 'white',
    width: '100%',
    textAlign: 'center',
    paddingBottom: '10rem',
    fontFamily: 'Montserrat-SemiBold',
  },
  text: {
    color: 'white',
    fontSize: '19rem',
    width: '190rem',
    textAlign: 'center',
    fontFamily: 'Montserrat',
    paddingBottom: '40rem',
  },
  width100: {
    width: '100%',
  },
  link: {
    color: '#1283b0',
    textDecorationLine: 'underline',
  },
});

export default Legal;
