'use strict';
import React, {useState, useContext} from 'react';
import {
  View,
  Dimensions,
  Animated,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import {AuthContext} from './context';
import EStyleSheet from 'react-native-extended-stylesheet';
import {ScrollView} from 'react-native-gesture-handler';

const window = Dimensions.get('window');

var rem = window.width / 390;
EStyleSheet.build({$rem: rem});

const Safety = ({display}) => {
  return (
    <ScrollView style={[styles.faqScroll]} display={display}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>Safety</Text>
        <View style={styles.card}>
          <Text style={styles.text}>Duh! Be sure to know how to swim.</Text>
          <Image
            style={styles.swimImage}
            source={require('./img/swimSymbol.png')}
          />
        </View>
        <View style={styles.card}>
          <Text style={styles.text}>Sun protection.</Text>
          <Image
            style={styles.swimImage}
            source={require('./img/sunscreen.png')}
          />
        </View>
        <View style={styles.card}>
          <Text style={styles.text}>
            Be sure to also stretch before AND after surfing.
          </Text>
          <Image
            style={styles.stretchImage}
            source={require('./img/stretch.png')}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = EStyleSheet.create({
  faqScroll: {
    backgroundColor: '#08cfa1',
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
    paddingTop: '50rem',
    paddingBottom: '20rem',
    textAlign: 'center',
    fontFamily: 'Montserrat-SemiBold',
  },
  card: {
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    padding: '20rem',
    borderRadius: 12 * rem,
    marginBottom: 24 * rem,
  },
  text: {
    color: 'black',
    fontFamily: 'Montserrat-Medium',
    textAlign: 'center',
    fontSize: '18rem',
    paddingBottom: '5rem',
  },
  swimImage: {
    width: '250rem',
    height: '250rem',
    alignSelf: 'center',
  },
  stretchImage: {
    width: '100rem',
    height: '250rem',
    alignSelf: 'center',
  },
  wrapper: {
    paddingBottom: 30 * rem,
  }
});

export default Safety;
