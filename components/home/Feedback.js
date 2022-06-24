import React from 'react';
import {View, Text, Dimensions, Animated, TextInput} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import MultilineTextInput from '../common/MultilineTextInput';
import {countChar} from '../common/Subs';

const window = Dimensions.get('window');

EStyleSheet.build({$rem: window.width / 390});

const Feedback = ({
  showFeedback,
  surfboardFeedback,
  onChangeSurfboardFeedback,
  appFeedback,
  onChangeAppFeedback,
  appFeedbackBorder,
  surfboardFeedbackBorder,
}) => {
  const onChangeSurfboard = text => {
    if (countChar(text, '\n') >= 4) {
      return;
    }
    onChangeSurfboardFeedback(text);
  };

  const onChangeApp = text => {
    if (countChar(text, '\n') >= 4) {
      return;
    }
    onChangeAppFeedback(text);
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {display: showFeedback == 1 ? 'flex' : 'none'},
      ]}>
      <View key="title container" style={styles.titleContainer}>
        <Text key="title" style={styles.title}>
          Thanks for using Kook!
        </Text>
        <Text key="text" style={styles.text}>
          Let us know what we can improve on!
        </Text>
        <Text style={styles.feedbackTitle} />
        <MultilineTextInput
          style={[styles.feedbackInput, {borderColor: surfboardFeedbackBorder}]}
          value={surfboardFeedback}
          onChangeText={text => onChangeSurfboard(text)}
        />
        <Text style={styles.feedbackTitle}>30 words minimum</Text>
      </View>
    </Animated.View>
  );
};

const styles = EStyleSheet.create({
  container: {
    background: 'black',
    opacity: 1,
    position: 'absolute',
    top: 0,
  },
  titleContainer: {
    marginBottom: '10rem',
  },
  date: {
    color: 'black',
    fontSize: '14rem',
    fontFamily: 'Montserrat-Medium',
  },
  title: {
    color: 'black',
    fontSize: '25rem',
    fontFamily: 'Montserrat-Bold',
    textAlign: 'center',
    marginBottom: '3rem',
    marginTop: '20rem',
  },
  text: {
    color: 'black',
    fontSize: '15rem',
    fontFamily: 'Montserrat-Medium',
    textAlign: 'center',
  },
  totalText: {
    color: 'black',
    fontSize: '23rem',
    fontFamily: 'Montserrat-SemiBold',
  },
  feedbackInput: {
    color: 'black',
    fontSize: '18rem',
    fontFamily: 'Montserrat-Medium',
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 5,
    padding: 10,
    textAlign: 'left',
    textAlignVertical: 'top',
    marginBottom: '3rem',
  },
  feedbackTitle: {
    color: '#9c9c9c',
    fontSize: '14rem',
    fontFamily: 'Montserrat-SemiBold',
    paddingBottom: '4rem',
  },
  spacer: {
    color: '#9c9c9c',
    fontSize: '14rem',
    fontFamily: 'Montserrat-SemiBold',
  },
});

export default Feedback;
