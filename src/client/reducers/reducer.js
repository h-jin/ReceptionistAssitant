import defaultState from "store/defaultStates"

export default (state = defaultState, action) => {
    switch (action.type) {
        case "FETCH_NAMES":
            return { ...state, list: action.payload };
        case "UPDATE_MENU":
            const { menus } = state;
            return { ...state, menus: { ...menus, picked: action.payload } };
        case "UPDATE_LOCAL_RECORD":
            const { list: patientList } = state;
            const notSelectedRecord = (patientList || []).filter(({ id }) => id !== action.payload.id);
            const updatedPatientList = [...notSelectedRecord, action.payload];
            return { ...state, list: updatedPatientList };
        case "ADD_EMPTY_RECORD":
            const { list } = state;
            const updatedList = [...list, action.payload];
            return { ...state, list: updatedList };
        default:
            return state;
    }
};