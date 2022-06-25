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

const Wallet = ({display}) => {
  return (
    <View style={[styles.container]} display={display}>
      <Text style={styles.title}>Wallet</Text>
      <Text style={styles.listTitle}>PAYMENT METHODS</Text>
      <TouchableOpacity style={styles.cardBtn}>
        <Text style={styles.text}>Add card</Text>
      </TouchableOpacity>
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
  title: {
    fontSize: '22rem',
    color: 'black',
    width: '100%',
    textAlign: 'center',
    paddingBottom: '40rem',
    fontFamily: 'Montserrat-SemiBold',
  },
  listTitle: {
    color: 'black',
    fontSize: '14rem',
    width: '100%',
    textAlign: 'left',
    marginLeft: '70rem',
    fontFamily: 'Montserrat-SemiBold',
    opacity: 0.5,
  },
  cardBtn: {
    width: '100%',
    height: '55rem',
    backgroundColor: 'white',
    borderColor: '#C5C5C5',
    borderTopWidth: '0.5rem',
    borderBottomWidth: '0.5rem',
    marginTop: '10rem',
    justifyContent: 'center',
  },
  text: {
    color: 'black',
    fontSize: '15rem',
    width: '100%',
    textAlign: 'left',
    marginLeft: '70rem',
    fontFamily: 'Montserrat-Medium',
  },
});

export default Wallet;
