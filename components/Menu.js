import React from 'react';
import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import Modal from 'react-native-modal';
import EStyleSheet from 'react-native-extended-stylesheet';
import {AuthContext} from './login/context';

const window = Dimensions.get('window');

EStyleSheet.build({$rem: window.width / 390});

const Menu = ({showMenu, toggleMenu, changeSubpage}) => {
  const {signOut} = React.useContext(AuthContext);

  return (
    <Modal
      style={styles.modal}
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
        <TouchableOpacity
          onPress={() => {
            toggleMenu();
          }}
          style={styles.closeBtn}>
          <Text style={styles.closeText}>✕</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            changeSubpage('');
          }}
          style={styles.accNameBtn}>
          <Text style={styles.accNameText}>Account Name</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            changeSubpage('');
          }}
          style={styles.accNameBtn}>
          <Text style={styles.itemText}>Wallet</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            changeSubpage('rideHistory');
          }}
          style={styles.accNameBtn}>
          <Text style={styles.itemText}>Ride History</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            changeSubpage('safety');
          }}
          style={styles.accNameBtn}>
          <Text style={styles.itemText}>Safety</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            changeSubpage('faq');
          }}
          style={styles.accNameBtn}>
          <Text style={styles.itemText}>FAQs</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            changeSubpage('contactUs');
          }}
          style={styles.accNameBtn}>
          <Text style={styles.itemText}>Contact Us</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            changeSubpage('legal');
          }}
          style={styles.accNameBtn}>
          <Text style={styles.itemText}>Terms & Conditions</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logOutBtn}>
          <Text
            onPress={() => {
              toggleMenu();
              signOut();
            }}
            style={styles.logOutText}>
            Log out
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = EStyleSheet.create({
  modal: {
    margin: 0,
  },
  container: {
    height: window.height - 13,
    width: '275rem',
    left: 0,
    backgroundColor: '#F8F8F8',
    shadowOffset: {width: '4rem', height: 0},
    shadowOpacity: 0.15,
    shadowRadius: '10rem',
    paddingLeft: '25rem',
    paddingTop: '26rem',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  closeBtn: {
    //enlarged and transparent for easy clicking
    marginBottom: '63rem',
    width: '42rem',
    height: '42rem',
  },
  closeText: {
    color: '#595959',
    paddingTop: '4rem',
    paddingLeft: '1rem',
    fontSize: '26rem',
    fontFamily: 'Montserrat-SemiBold',
  },
  accNameBtn: {
    marginBottom: '50rem',
  },
  accNameText: {
    color: 'black',
    fontSize: '23rem',
    fontFamily: 'Montserrat-SemiBold',
  },
  itemBtn: {
    marginBottom: '25rem',
  },
  itemText: {
    color: 'black',
    fontSize: '20rem',
    fontFamily: 'Montserrat-Medium',
  },
  logOutBtn: {
    marginTop: '40rem',
    marginBottom: '50rem',
  },
  logOutText: {
    color: '#6A6A6A',
    fontSize: '18rem',
    fontFamily: 'Montserrat-Medium',
  },
});

export default Menu;
