import { from, of } from 'rxjs'
import { map, mergeMap, catchError, filter } from 'rxjs/operators'
import { ofType, combineEpics } from 'redux-observable'
import { Auth } from 'aws-amplify';
import { useSelector } from 'react-redux'
import object from 'lodash/object'

const types = {
    SET_AUTHENTICATION_INFO : "SET_AUTHENTICATION_INFO",
    SET_AUTHORIZATION : "SET_AUTHORIZATION",
    CHECK_LOGIN : "CHECK_LOGIN",
    SIGN_OUT : "SIGN_OUT",
    NULL:"NULL"
}


const actions = {

    setAuthenticationInfo : () => ({
        type: types.SET_AUTHENTICATION_INFO
    }),

    setAuthorization : (idToken) => ({
        type: types.SET_AUTHORIZATION,
        idToken
    }),

    signOut : () => ({
        type: types.SIGN_OUT
    }),

    none : () => ({
        type: types.NULL
    })

}

const state = {

    /*
     * Returns {token, name, email}
     * If token is not null, then the user is logged in.
     */
    useUser: () => {
        return useSelector(state => state.user)
    },

}


const INITIAL_STATE = {
}

const epics = {
    setAuthInfoEpic: action$ => action$.pipe(
        ofType(types.SET_AUTHENTICATION_INFO),
        mergeMap(_ => 
            from(Auth.currentSession()).pipe(
                catchError(_ => of(actions.none()))
            )
        ),
        filter(a => a.type != types.NULL),
        map(s => s.idToken),
        map(actions.setAuthorization),
    ),

    signOut: action$ => action$.pipe(
        ofType(types.SIGN_OUT),
        mergeMap(_ => from(Auth.signOut())),
        map(actions.none),
    ),
}


const reducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case types.SET_AUTHORIZATION:
            const idToken = action.idToken
            state = {
                ...state,
                token: idToken.jwtToken,
                name: idToken.payload.name,
                email: idToken.payload.email,
            }
            break;

        case types.SIGN_OUT:
            state = INITIAL_STATE
            break;

        default:
            break;
    }

    return state
}


export default {
    reducer,
    actions,
    state,
    epics: combineEpics(...object.values(epics))
}