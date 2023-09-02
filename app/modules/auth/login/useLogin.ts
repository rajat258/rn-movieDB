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
import {User} from '../../../type';
import {validationSchema} from '../../../utils';

interface LoginType {
  email: string;
  password: string;
}

export interface LoginHookReturnType {
  isLoading: boolean;
  checkCredential: () => void;
  jumpToSignUp: () => void;
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
  errors: FormikErrors<LoginType>;
  touched: FormikTouched<LoginType>;
  values: LoginType;
  passwordRef: RefObject<TextInput>;
}

const useLogin = (): LoginHookReturnType => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const passwordRef = useRef(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const initialValues = {email: '', password: ''};

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
    validationSchema: validationSchema.login,
    enableReinitialize: true,
    initialValues: initialValues,
  });

  const checkCredential = async (): Promise<void> => {
    handleSubmit();
    if (isValid && values.email.trim()) {
      setIsLoading(true);
      setTimeout(() => {
        auth()
          .signInWithEmailAndPassword(
            values.email.trim(),
            values.password.trim(),
          )
          .then(async user => {
            const localUser = (
              await firestore()
                .collection(firestoreConstant.users)
                .doc(user.user.uid)
                .get()
            ).data() as User;
            await setUser(localUser);
            navigation.replace(Routes.tab);
            setIsLoading(false);
          })
          .catch(error => {
            setIsLoading(false);
            if (error.code === errorConstant.authUserNotFound) {
              Alert.alert(Strings.error, Strings.userNotFound);
            } else if (error.code === errorConstant.authWrongPassword) {
              Alert.alert(Strings.error, Strings.inCorrectPassword);
            }
          });
      }, 1000);
    }
  };

  const jumpToSignUp = (): void => navigation.replace(Routes.signUp);

  return {
    isLoading,
    passwordRef,
    jumpToSignUp,
    checkCredential,
    handleChange,
    errors,
    setFieldTouched,
    touched,
    values,
  };
};

export default useLogin;
