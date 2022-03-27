import { createContext, useReducer } from 'react'
import githubReducer from './GithubReducer'

const GithubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN

export const GithubProvider = ({ children }) => {

    // function to dispatch loading true
    const setLoading = () => {
        dispatch({ type: "SET_LOADING" })
    }

    // set initial state for reducer
    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false
    }

    const [state, dispatch] = useReducer(githubReducer, initialState)

    // get initial users for testing
    const fetchUsers = async () => {

        setLoading()

        const response = await fetch(`${GITHUB_URL}/users`, {
            headers: {
                Authorization: `token ${ACCESS_TOKEN}`,
            },
        })

        const data = await response.json()

        dispatch({
            type: 'GET_USERS',
            payload: data,

        })
    }


    // search users and updating the state
    const searchUsers = async (text) => {
        setLoading()

        const params = new URLSearchParams({
            q: text
        })

        const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
            headers: {
                Authorization: `token ${ACCESS_TOKEN}`,
            },
        })

        const { items } = await response.json()

        dispatch({
            type: 'GET_USERS',
            payload: items,

        })
    }


    // get a single  user and updating the state
    const getUser = async (login) => {
        setLoading()


        const response = await fetch(`${GITHUB_URL}/users/${login}`, {
            headers: {
                Authorization: `token ${ACCESS_TOKEN}`,
            },
        })

        if (response.status === 404) {
            window.location = '/notfound'
        } else {
            const data = await response.json()

            dispatch({
                type: 'GET_USER',
                payload: data,

            })
        }


    }



    // clear users from user state
    const clearUsers = () => {
        dispatch({
            type: 'CLEAR_USERS'
        })
    }

    return (
        <GithubContext.Provider
            value={{
                users: state.users,
                loading: state.loading,
                user: state.user,
                searchUsers,
                clearUsers,
                getUser
            }}
        >
            {children}
        </GithubContext.Provider>
    )
}

export default GithubContext