import { combineReducers, createStore, applyMiddleware } from 'redux'
// import {  } from 'react-redux'
import user from './state/user'
import { createEpicMiddleware, combineEpics } from 'redux-observable';

const epicMiddleware = createEpicMiddleware();

const logger = store => next => action => {
    console.log('dispatching', action)
    let result = next(action)
    console.log('next state', store.getState())
    return result
}


const store = createStore(
    combineReducers({
        user : user.reducer
    }),
    applyMiddleware(logger, epicMiddleware)
)

epicMiddleware.run(combineEpics(
    user.epics
))

export default store;