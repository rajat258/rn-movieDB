import {ForwardedRef} from 'react';
import {
  NativeSyntheticEvent,
  TextInputFocusEventData,
  TextInputProps,
} from 'react-native';

interface CustomInputProp extends TextInputProps {
  touched?: boolean;
  errors?: string;
  onBlur: (e?: NativeSyntheticEvent<TextInputFocusEventData>) => void;
}

export interface CustomFocusMethod {
  focus: () => void;
}

export interface InputTypes {
  (props: CustomInputProp, ref: ForwardedRef<CustomFocusMethod>): JSX.Element;
}
