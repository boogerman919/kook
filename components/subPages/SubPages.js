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
  const rideHistoryStyle = () => {
    return subpageState === 'rideHistory' ? 'flex' : 'none';
  };
  const contactUsStyle = () => {
    return subpageState === 'contactUs' ? 'flex' : 'none';
  };
  const faqStyle = () => {
    return subpageState === 'faq' ? 'flex' : 'none';
  };
  const legalStyle = () => {
    return subpageState === 'legal' ? 'flex' : 'none';
  };
  const safetyStyle = () => {
    return subpageState === 'safety' ? 'flex' : 'none';
  };

  return (
    <Animated.View style={[styles.mainView, {right: rightOffset}]}>
      <TouchableOpacity
        onPress={() => {
          changeSubpage('none');
        }}
        style={styles.closeBtn}>
        <Text style={styles.closeText}>⇦</Text>
      </TouchableOpacity>
      {/* <Text>SubPages Page</Text> */}
      <RideHistory display={rideHistoryStyle()} />
      <ContactUs display={contactUsStyle()} changeSubpage={changeSubpage} />
      <Faq display={faqStyle()} />
      <Legal display={legalStyle()} />
      <Safety display={safetyStyle()} />

      {/* for when bug occures and none of the above pages are displayed */}
      <View style={styles.backgroundView} />
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
    flex: 1,
    flexWrap: 'wrap',
  },
  closeBtn: {
    //enlarged and transparent for easy clicking
    position: 'relative',
    marginLeft: '18rem',
    marginTop: '19rem',
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
