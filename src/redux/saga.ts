import authSagas from './auth/saga';
import weatherSagas from './weather/saga';
import todoSagas from './todo/saga';

import { all } from 'redux-saga/effects';

export default function* rootSaga() {
    yield all([authSagas(), weatherSagas(), todoSagas()]);
}
