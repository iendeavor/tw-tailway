import { connect } from 'react-redux'

import Date_ from '../components/Date'
import TYPES from '../constants/actionTypes'
import KEYS from '../constants/keys'
import CREATORS from '../constants/actionCreators'
import store from '../store'


const removeTime = date => date.toISOString().slice(0, 10)

const mapStateToProps = state => {
    return {
        selectedDate: removeTime(state.date[KEYS.departureDate]),
        isToday: removeTime(state.date[KEYS.departureDate]) === removeTime(state.date[KEYS.today]),
        isTomorrow: removeTime(state.date[KEYS.departureDate]) === removeTime(state.date[KEYS.tomorrow]),
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onChangeDate: event => {
            CREATORS.handleChangeDate(event.target.value)
        },
        onSetToday: event => {
            CREATORS.handleChangeDate(store.getState().date[KEYS.today])
        },
        onSetTomorrow: event => {
            CREATORS.handleChangeDate(store.getState().date[KEYS.tomorrow])
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Date_)

