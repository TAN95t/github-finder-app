import { createContext, useReducer } from 'react'
import githubReducer from './GithubReducer'

const GithubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN

export const GithubProvider = ({ children }) => {
    const initialState = {
        users: [],
        loading: true
    }

    const [state, dispatch] = useReducer(githubReducer, initialState)

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

    const setLoading = () => {
        dispatch({ type: "SET_LOADING" })
    }

    return (
        <GithubContext.Provider
            value={{
                users: state.users,
                loading: state.loading,
                fetchUsers,
            }}
        >
            {children}
        </GithubContext.Provider>
    )
}

export default GithubContext