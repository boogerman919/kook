import React from 'react';
import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import Modal from 'react-native-modal';
import EStyleSheet from 'react-native-extended-stylesheet';

const window = Dimensions.get('window');

EStyleSheet.build({$rem: window.width / 390});

const Menu = ({showMenu, toggleMenu}) => {
  return (
    <Modal
      style={{margin: 0}}
      animationIn="slideInLeft"
      animationInTiming={250}
      animationOut="slideOutLeft"
      animationOutTiming={250}
      isVisible={showMenu}
      backdropOpacity={0.5}
      backdropTransitionInTiming={250}
      backdropTransitionOutTiming={250}
      onBackdropPress={() => toggleMenu()}
      onBackButtonPress={() => toggleMenu()}
      swipeDirection="left"
      swipeThreshold={100}
      onSwipeComplete={() => toggleMenu()}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.accNameBtn}>
          <Text style={styles.accNameText}>Account Name</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemBtn}>
          <Text style={styles.itemText}>Wallet</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemBtn}>
          <Text style={styles.itemText}>Ride History</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemBtn}>
          <Text style={styles.itemText}>Safety</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemBtn}>
          <Text style={styles.itemText}>FAQs</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemBtn}>
          <Text style={styles.itemText}>Contact Us</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemBtn}>
          <Text style={styles.itemText}>Legal</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = EStyleSheet.create({
  container: {
    height: window.height,
    width: '275rem',
    left: 0,
    backgroundColor: '#F8F8F8',
    shadowOffset: {width: '4rem', height: 0},
    shadowOpacity: 0.15,
    shadowRadius: '10rem',
    paddingLeft: '25rem',
    paddingTop: '88rem',
    alignItems: 'flex-start',
  },
  accNameBtn: {
    marginBottom: '40rem',
  },
  accNameText: {
    color: 'black',
    fontSize: '23rem',
    fontFamily: 'Montserrat-SemiBold',
  },
  itemBtn: {
    marginBottom: '22rem',
  },
  itemText: {
    color: 'black',
    fontSize: '20rem',
    fontFamily: 'Montserrat-Medium',
  },
});

export default Menu;
