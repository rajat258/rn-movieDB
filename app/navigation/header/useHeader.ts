import {ParamListBase, useNavigation} from '@react-navigation/native';
import {
  StackNavigationOptions,
  StackNavigationProp,
} from '@react-navigation/stack';
import {useState} from 'react';
import {Routes} from '../../constants';

export interface HeaderHookReturnType {
  handleSearch: () => void;
  navigation: StackNavigationProp<ParamListBase>;
  authOptions?: StackNavigationOptions;
  profile?: boolean;
  childScreen?: boolean;
}

const useHeader = (): HeaderHookReturnType => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const [isSearch, setIsSearch] = useState<boolean>(false);

  const handleSearch = (): void => {
    navigation.navigate(Routes.search);
    setIsSearch(!isSearch);
  };

  const authOptions: StackNavigationOptions = {
    headerShown: false,
  };

  return {
    authOptions,
    navigation,
    handleSearch,
  };
};

export default useHeader;
