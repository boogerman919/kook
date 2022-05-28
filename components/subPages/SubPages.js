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
import EStyleSheet from 'react-native-extended-stylesheet';

import RideHistory from './RideHistory';
import ContactUs from './ContactUs';
import Faq from './Faq';
import Legal from './Legal';
import Safety from './Safety';

const window = Dimensions.get('window');

var rem = window.width / 390;
EStyleSheet.build({$rem: rem});

const SubPages = ({subpageState, rightOffset, changeSubpage}) => {
  return (
    <Animated.View style={[styles.mainView, {right: rightOffset}]}>
      <TouchableOpacity
        onPress={() => {
          changeSubpage('none');
        }}
        style={styles.closeBtn}>
        <Text style={styles.closeText}>⇦</Text>
      </TouchableOpacity>
      <Text>SubPages Page</Text>
      <RideHistory />
      <ContactUs />
      <Faq />
      <Legal />
      <Safety />
    </Animated.View>
  );
};

const styles = EStyleSheet.create({
  mainView: {
    width: window.width,
    height: window.height,
    position: 'absolute',
    zIndex: 2,
    right: window.width,
    backgroundColor: '#F8F8F8',
    shadowOffset: {width: '4rem', height: 0},
    shadowOpacity: 0.15,
    shadowRadius: '10rem',
    paddingLeft: '18rem',
    paddingTop: '19rem',
  },
  closeBtn: {
    //enlarged and transparent for easy clicking
    position: 'relative',
    marginBottom: '63rem',
    zIndex: 99,
    backgroundColor: '#dbdbdb',
    height: '42rem',
    width: '42rem',
    borderRadius: '21rem',
    shadowOffset: {width: 0, height: '-1rem'},
    shadowOpacity: 0.12,
    shadowRadius: '15rem',
  },
  closeText: {
    color: '#595959',
    paddingTop: '4rem',
    paddingLeft: '-1rem',
    fontSize: '26rem',
    fontFamily: 'Montserrat-SemiBold',
    textAlign: 'center',
  },
});

export default SubPages;
