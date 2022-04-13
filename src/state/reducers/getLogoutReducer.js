const getLogoutReducer = (state = null, action) => {
    switch(action.type){
        case "logout":
            return action.payload
        default:
            return state
    }
}

export default getLogoutReducer

 
