import { API_ERROR } from '../constants';

const setErrorState = (_, { payload }) => ({
  errorCode: payload,
});

export default {
  [API_ERROR]: setErrorState,
};
