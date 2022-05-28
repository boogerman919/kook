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
import { ScrollView } from 'react-native-gesture-handler';

const window = Dimensions.get('window');

var rem = window.width / 390;
EStyleSheet.build({$rem: rem});

const Faq = ({display}) => {
  return (
    <ScrollView
      style={[styles.faqScroll]}
      display={display}
      contentContainerStyle={{flexGrow: 1}}>
      <View style={{flex: 1}} contentContainerStyle={{flexGrow: 1}}>
        <Text style={{color: 'black'}}>FAQs</Text>
        <Text style={{color: 'black'}}>
          Hello!
          {
            '\nasdf\nasdf\n\nasdf\n\n\n\n\n\nasdf\n\n\n\n\n\n\n\n\n\n\n\n\n\nasdf\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n'
          }
          asdf
        </Text>
        <Text style={{color: 'black'}}>
          This is Aldrin
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = EStyleSheet.create({
  faqScroll: {
    backgroundColor: 'grey',
    width: '100%',
    height: window.height + 61 * rem,
    overflowX: 'hidden',
    overflowY: 'scroll',
    paddingLeft: '18rem',
    paddingTop: '19rem',
    position: 'relative',
    top: '-61rem',
    flexGrow: 3,
  },
});

export default Faq;
