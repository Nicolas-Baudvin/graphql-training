export const initialState = {
    isLoading: false,
    error: '',
    username: 'Falorun',
    password: '123456',
    userData: localStorage.getItem('udta') ? JSON.parse(localStorage.getItem('udta')) : '',
}

export const reducer = (state = initialState, action) => {
    switch (action.type)
    {
        case "CHANGE_VIEW": {
            return {
                ...state,
                view: action.payload
            }
        }
        case "LOADING": {
            return {
                ...state,
                isLoading: action.payload
            }
        }
        case "ERROR": {
            return {
                ...state,
                error: action.payload
            }
        }
        case "USERNAME": {
            return {
                ...state,
                username: action.username
            }
        }
        case "PASSWORD": {
            return {
                ...state,
                password: action.password
            }
        }
        case "CONNECTED": {
            localStorage.setItem('udta', JSON.stringify(action.payload));
            return {
                ...state,
                userData: action.payload
            }
        }
        default: {
            return state;
        }
    }
}