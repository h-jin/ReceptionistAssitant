import defaultState from "store/defaultStates"

export default (state = defaultState, action) => {
    switch (action.type) {
        case "FETCH_NAMES":
            return { ...state, emergency: action.payload };
        case "UPDATE_MENU":
            const { menus } = state;
            return { ...state, menus: { ...menus, picked: action.payload } };
        case "ADD_EMPTY_RECORD":
            const { emergency } = state;
            const updatedEmergency = [...emergency, action.payload];
            return { ...state, emergency: updatedEmergency };
        default:
            return state;
    }
};