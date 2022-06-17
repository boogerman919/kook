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
import {ScrollView} from 'react-native-gesture-handler';

const window = Dimensions.get('window');

var rem = window.width / 390;
EStyleSheet.build({$rem: rem});

const ContactUs = ({display}) => {
  return (
    <ScrollView style={[styles.faqScroll]} display={display}>
      <View>
        <Text style={styles.title}>Contact Us</Text>
        <Text style={styles.question} />
        <Text style={styles.answer}>This is Aldrin</Text>
      </View>
    </ScrollView>
  );
};

const styles = EStyleSheet.create({
  faqScroll: {
    backgroundColor: 'grey',
    width: '100%',
    height: '100%',
    overflowX: 'hidden',
    overflowY: 'scroll',
    paddingLeft: '18rem',
    paddingRight: '18rem',
    paddingTop: '19rem',
    position: 'relative',
    //top: '-61rem',
    marginLeft: '-61rem',
    flexGrow: 3,
  },
  title: {
    fontSize: '28rem',
    color: 'black',
    width: '100%',
    textAlign: 'center',
  },
  question: {

  },
  answer: {

  },
});

export default ContactUs;
