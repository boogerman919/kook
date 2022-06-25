import React from 'react';
import {TextInput} from 'react-native';

const MultilineTextInput = props => {
  const numberOfLines = 13;

  return (
    <TextInput
      multiline
      numberOfLines={Platform.OS === 'ios' ? null : numberOfLines}
      minHeight={
        Platform.OS === 'ios' && numberOfLines ? 20 * numberOfLines : null
      }
      editable
      {...props}
    />
  );
};

export default MultilineTextInput;
