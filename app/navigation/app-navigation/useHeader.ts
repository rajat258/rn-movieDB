import {ParamListBase, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useState} from 'react';
import {Routes} from '../../constants';

export interface HeaderHookReturnType {
  handleGoBack: () => void;
  handleSearch: () => void;
  navigation: StackNavigationProp<ParamListBase>;
}

const useHeader = (): HeaderHookReturnType => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const [isSearch, setIsSearch] = useState<boolean>(false);

  const handleSearch = (): void => {
    navigation.navigate(Routes.search);
    setIsSearch(!isSearch);
  };

  const handleGoBack = (): void => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return {
    navigation,
    handleGoBack,
    handleSearch,
  };
};

export default useHeader;
