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
      <View style={[styles.width100, styles.header]}>
        <Text style={styles.title}>FAQs</Text>
        <Text style={styles.subText} />
      </View>
      <ScrollView
        style={[styles.faqScroll]}
        contentContainerStyle={{flexGrow: 1}}
        removeClippedSubviews={true}>
        <View style={styles.card}>
          <Text style={styles.question}>When will I get charged?</Text>
          <Text style={styles.answer}>
            For now, the app is still in its alpha stage, and you won't be
            charged :)
          </Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.question}>
            What is the mission of this startup?
          </Text>
          <Text style={styles.answer}>To make surfing simple and easy. :D</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.question}>What is your startup's timeline</Text>
          <Text style={styles.answer}>
            There will be a lot of legal work to put our surfboard on more
            beaches. We want to give easy surfboard access to everyone. {'\n\n'}
            We look to put our first permanent rental stand in mid-2023.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = EStyleSheet.create({
  width100: {
    width: '100%',
  },
  container: {
    backgroundColor: '#F8F8F8',
    width: '100%',
    height: '100%',
    position: 'relative',
    //top: '-61rem',
    marginLeft: '-61rem',
    flexGrow: 3,
  },
  faqScroll: {
    paddingLeft: '18rem',
    paddingRight: '18rem',
    paddingTop: '19rem',
    width: '100%',
    height: window.height - 63 * rem,
  },
  title: {
    fontSize: '28rem',
    color: 'black',
    width: '100%',
    textAlign: 'right',
    fontFamily: 'Montserrat-SemiBold',
  },
  header: {
    backgroundColor: '#07f2bd', // i made it darker just because, it might be a bad idea
    paddingLeft: '18rem',
    paddingRight: '18rem',
    paddingTop: '23rem',
    borderBottomWidth: 2,
    borderColor: 'grey',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  question: {
    color: 'black',
    fontSize: '22rem',
    fontFamily: 'Montserrat-Medium',
  },
  answer: {
    color: 'black',
    fontSize: '17rem',
    fontFamily: 'Montserrat-Medium',
    paddingTop: '4rem',
    paddingLeft: '20rem',
  },
  card: {
    paddingBottom: '18rem',
    paddingTop: '10rem',
    borderBottomWidth: 0.5,
    borderColor: 'grey',
  },
});

export default Faq;
