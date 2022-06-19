import React from 'react';
import {TextInput} from 'react-native';

const MultilineTextInput = props => {
  return <TextInput multiline numberOfLines={4} editable {...props} />;
};

export default MultilineTextInput;
