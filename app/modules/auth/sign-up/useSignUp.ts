import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {FormikErrors, FormikTouched, useFormik} from 'formik';
import {RefObject, useRef, useState} from 'react';
import {Alert, TextInput} from 'react-native';
import {
  Routes,
  Strings,
  errorConstant,
  firestoreConstant,
} from '../../../constants';
import {setUser} from '../../../services';
import {validationSchema} from '../../../utils';

interface SignUpType {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export interface SignUpHookReturnType {
  isLoading: boolean;
  checkCredential: () => void;
  jumpToLogin: () => void;
  handleChange: {
    (e: React.ChangeEvent<string>): void;
    <T = string | React.ChangeEvent<string>>(
      field: T,
    ): T extends React.ChangeEvent<string>
      ? void
      : (e: string | React.ChangeEvent<string>) => void;
  };
  setFieldTouched: (
    field: string,
    touched?: boolean,
    shouldValidate?: boolean,
  ) =>
    | Promise<void>
    | Promise<
        FormikErrors<{
          email: string;
          password: string;
        }>
      >;
  errors: FormikErrors<SignUpType>;
  touched: FormikTouched<SignUpType>;
  values: SignUpType;
  passwordRef: RefObject<TextInput>;
  emailRef: RefObject<TextInput>;
  phoneRef: RefObject<TextInput>;
  confirmPasswordRef: RefObject<TextInput>;
}

const useSignUp = (): SignUpHookReturnType => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const initialValues = {
    name: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const {
    handleChange,
    handleSubmit,
    errors,
    isValid,
    setFieldTouched,
    touched,
    values,
  } = useFormik({
    onSubmit: () => {},
    validationSchema: validationSchema.signup,
    enableReinitialize: true,
    initialValues: initialValues,
  });

  const checkCredential = async (): Promise<void> => {
    setIsLoading(true);
    handleSubmit();
    setTimeout(() => {
      if (isValid && values.name.trim()) {
        auth()
          .createUserWithEmailAndPassword(
            values.email.trim(),
            values.password.trim(),
          )
          .then(async instance => {
            const user = {
              name: values.name.trim(),
              phone: values.phone.trim(),
              email: values.email.trim(),
              id: instance.user.uid,
            };
            await firestore()
              .collection(firestoreConstant.users)
              .doc(instance.user.uid)
              .set(user);
            await setUser(user);
            navigation.replace(Routes.tab);
            setIsLoading(false);
          })
          .catch(error => {
            if (error.code === errorConstant.authEmailExist) {
              Alert.alert(Strings.error, Strings.userExist);
            } else if (error.code === errorConstant.authInvalidEmail) {
              Alert.alert(Strings.error, Strings.notEmail);
            }
            setIsLoading(false);
          });
      } else {
        setIsLoading(false);
      }
    }, 1000);
  };

  const jumpToLogin = (): void => navigation.replace(Routes.login);

  return {
    isLoading,
    emailRef,
    phoneRef,
    passwordRef,
    confirmPasswordRef,
    jumpToLogin,
    checkCredential,
    handleChange,
    errors,
    setFieldTouched,
    touched,
    values,
  };
};

export default useSignUp;
