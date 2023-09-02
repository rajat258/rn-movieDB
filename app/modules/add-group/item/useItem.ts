import {useState} from 'react';
import type {ItemProps} from './Item';
import {User} from '../../../type';

export interface ItemHookReturnType {
  isSelected: boolean;
  handleSelected: () => void;
}

const useItem = ({
  item,
  selectData,
  deSelectData,
}: ItemProps): ItemHookReturnType => {
  const [isSelected, setIsSelected] = useState<boolean>(false);

  const handleSelected = (): void => {
    if (isSelected) {
      deSelectData(item as User);
    } else {
      selectData(item as User);
    }
    setIsSelected(!isSelected);
  };

  return {
    isSelected,
    handleSelected,
  };
};

export default useItem;
