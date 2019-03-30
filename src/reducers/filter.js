import {
    ADD_FILTER,
    REMOVE_FILTER,
} from '../constants/actionTypes'
import {
    WHEEL_CHAIR,
    BIKE_SPACE,
    NURSING_ROOM,
    LABEL,
} from '../constants/filter'


const defaultState = {
    selectedValues: new Set(),
}

export default (state=defaultState, action) => {
    const next = {...state}

    switch (action.type) {
        case ADD_FILTER:
            next.selectedValues.add(action.payload.value)
            break
        case REMOVE_FILTER:
            next.selectedValues.delete(action.payload.value)
            break
        default:
            break
    }

    return next
}
