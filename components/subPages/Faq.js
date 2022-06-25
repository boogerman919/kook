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

const Faq = ({display}) => {
  return (
    <View style={styles.container} display={display}>
      {/* <ScrollView
        style={[styles.faqScroll]}
        contentContainerStyle={{flexGrow: 1}}
        removeClippedSubviews={true}>
      </ScrollView> */}
      <Text style={styles.header}>FAQs</Text>
      <View style={styles.bar} />
      <Text style={styles.title}>How will I be charged?</Text>
      <Text style={styles.text}>
        A small deposit will be temporarily placed on hold when you start
        renting. You will be charged according to the duration and the deposit
        will be refunded.{' '}
      </Text>
      <View style={styles.bar} />
      <Text style={styles.title}>What if I break the surfboards?</Text>
      <Text style={styles.text}>
        You should report the incident via Contact Us immediately. You will not
        be charged for any damage.{' '}
      </Text>
      <View style={styles.bar} />
      <Text style={styles.title}>Where do I return the surfboards?</Text>
      <Text style={styles.text}>
        You will need to return the surfboards back to the exact same slot in
        the station, otherwise you cannot end the session.{' '}
      </Text>
      <View style={styles.bar} />
      <Text style={styles.title}>What if my phone is not NFC compatible?</Text>
      <Text style={styles.text}>
        Unfortunately we only offer our service through NFC unlocking at this
        stage.{' '}
      </Text>
      <View style={styles.bar} />
    </View>
  );
};

const styles = EStyleSheet.create({
  container: {
    backgroundColor: '#F8F8F8',
    width: '100%',
    height: '100%',
    marginTop: '50rem',
    marginLeft: '-61rem',
    alignItems: 'center',
  },
  faqScroll: {
    paddingLeft: '18rem',
    paddingRight: '18rem',
    paddingTop: '19rem',
    width: '100%',
    height: window.height - 63 * rem,
  },
  header: {
    fontSize: '22rem',
    color: 'black',
    width: '100%',
    textAlign: 'center',
    paddingBottom: '20rem',
    fontFamily: 'Montserrat-SemiBold',
  },
  bar: {
    backgroundColor: 'black',
    width: '85%',
    borderWidth: '0.5rem',
    marginTop: '20rem',
    marginBottom: '20rem',
  },

  title: {
    color: 'black',
    fontSize: '16rem',
    width: '90%',
    textAlign: 'left',
    fontFamily: 'Montserrat-SemiBold',
    marginBottom: '5rem',
    opacity: 0.7,
  },
  text: {
    color: 'black',
    fontSize: '12rem',
    width: '90%',
    textAlign: 'left',
    fontFamily: 'Montserrat-SemiBold',
    opacity: 0.6,
    lineHeight: 20,
  },
});

export default Faq;
