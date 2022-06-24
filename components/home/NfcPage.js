import React from 'react';
import {View, Text, Dimensions, Animated, Image} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const window = Dimensions.get('window');

EStyleSheet.build({$rem: window.width / 390});

const NfcPage = ({showNfcPage}) => {

  return (
    <Animated.View
      style={[styles.container, {display: showNfcPage == 1 ? 'flex' : 'none'}]}>
      <View key="title container" style={styles.titleContainer}>
        <Text key="title" style={styles.title}>
          Ready to Scan
        </Text>
      </View>
      <Image style={styles.nfcIcon} source={require('./img/nfcIcon.png')} />
    </Animated.View>
  );
};

const styles = EStyleSheet.create({
  container: {
    order: 2,
    alignItems: 'center',
  },
  titleContainer: {
    marginTop: '110rem',
  },
  textContainer: {
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  title: {
    color: 'grey',
    fontSize: '25rem',
    fontFamily: 'Montserrat-Bold',
  },
  text: {
    color: 'black',
    fontSize: '20rem',
    fontFamily: 'Montserrat-Medium',
  },
  nfcIcon: {
    marginTop: '50rem',
    width: '250rem',
    height: '250rem',
    alignSelf: 'center',
  },
});

export default NfcPage;
