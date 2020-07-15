import { handleActions } from 'redux-actions';
import { toggleModal } from '../actions';

const initState = {
  isOpenModalWindow: false,
};

export const reducerUtils = handleActions(
  {
    [toggleModal]: (state, { payload: { isOpenModalWindow } }) => {
      return { ...state, isOpenModalWindow };
    },
  },
  initState
);
