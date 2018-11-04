import defaultState from "store/defaultStates"

export default (state = defaultState, action) => {
    switch (action.type) {
        case "FETCH_NAMES":
            return { ...state, emergency: action.payload };
        case "UPDATE_MENU":
            const { menus } = state;
            return { ...state, menus: { ...menus, picked: action.payload } };
        case "UPDATE_LOCAL_RECORD":
            const { emergency: emergencyList } = state;
            const notSelectedRecord = (emergencyList || []).filter(({ id }) => id !== action.payload.id);
            const updatedEmergencyList = [...notSelectedRecord, action.payload];
            return { ...state, emergency: updatedEmergencyList };
        case "ADD_EMPTY_RECORD":
            const { emergency } = state;
            const updatedEmergency = [...emergency, action.payload];
            return { ...state, emergency: updatedEmergency };
        default:
            return state;
    }
};