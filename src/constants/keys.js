import uuid from 'uuid/v4'

const OPTIONS        = uuid() + '-OPTIONS'

const SORT_BY        = uuid() + '-SORT_BY'
const ORDER_BY       = uuid() + '-ORDER_BY'

const COUNTRIES      = uuid() + '-COUNTRIES'
const FROM_STATIONS  = uuid() + '-FROM_STATIONS'
const TO_STATIONS    = uuid() + '-TO_STATIONS'
const FROM_COUNTRY   = uuid() + '-FROM_COUNTRY'
const FROM_STATION   = uuid() + '-FROM_STATION'
const TO_COUNTRY     = uuid() + '-TO_COUNTRY'
const TO_STATION     = uuid() + '-TO_STATION'

const ARRIVAL         = uuid() + '-ARRIVAL'
const DEPARTURE       = uuid() + '-DEPARTURE'
const SMALL_TRANSFER  = uuid() + '-SMALL_TRANSFER'
const DURATION        = uuid() + '-DURATION'
const FARE            = uuid() + '-FARE'
const FIRST           = uuid() + '-FIRST'
const LAST            = uuid() + '-LAST'

const DEPARTURE_DATE  = uuid() + '-DEPARTURE_DATE'
const TODAY           = uuid() + '-TODAY'
const TOMORROW        = uuid() + '-TOMORROW'
const DEPARTURE_TIME  = uuid() + '-DEPARTURE_TIME'
const ARRIVAL_TIME    = uuid() + '-ARRIVAL_TIME'

const ORIGINAL_SCHEDULES = uuid() + '-ORIGINAL_SCHEDULES'
const SCHEDULES          = uuid() + '-SCHEDULES'

const FARES              = uuid() + '-FARES'

const SELECTED_FILTERS = uuid() + '-SELECTED_FILTERS'
const SELECTED_FILTER  = uuid() + '-SELECTED_FILTER'
const WHEEL_CHAIR      = uuid() + '-WHEEL_CHAIR'
const BIKE_SPACE       = uuid() + '-BIKE_SPACE'
const NURSING_ROOM     = uuid() + '-NURSING_ROOM'

const TRAIN_TYPE      = uuid() + '-TRAIN_TYPE'
const LIMITED_EXPRESS = uuid() + '-LIMITED_EXPRESS'
const EXPRESS         = uuid() + '-EXPRESS'
const SEMI_EXPRESS    = uuid() + '-SEMI_EXPRESS'

const MESSAGE         = uuid() + '-MESSAGE'

const KEYS = Object.freeze({
    options       : OPTIONS,

    sortBy        : SORT_BY,
    orderBy       : ORDER_BY,

    countries     : COUNTRIES,
    fromStations  : FROM_STATIONS,
    toStations    : TO_STATIONS,
    fromCountry   : FROM_COUNTRY,
    fromStation   : FROM_STATION,
    toCountry     : TO_COUNTRY,
    toStation     : TO_STATION,

    departure     : DEPARTURE,
    arrival       : ARRIVAL,
    fare          : FARE,
    smallTransfer : SMALL_TRANSFER,
    duration      : DURATION,
    first         : FIRST,
    last          : LAST,

    departureDate : DEPARTURE_DATE,
    today         : TODAY,
    tomorrow      : TOMORROW,
    departureTime : DEPARTURE_TIME,
    arrivalTime   : ARRIVAL_TIME,

    originalSchedules : ORIGINAL_SCHEDULES,
    schedules         : SCHEDULES,

    fares           : FARES,

    selectedFilters : SELECTED_FILTERS,
    selectedFilter  : SELECTED_FILTER,
    wheelChair      : WHEEL_CHAIR,
    bikeSpace       : BIKE_SPACE,
    nursingRoom     : NURSING_ROOM,

    trainType      : TRAIN_TYPE,
    limitedExpress : LIMITED_EXPRESS,
    express        : EXPRESS,
    semiExpress    : SEMI_EXPRESS,

    message        : MESSAGE,
})

export default KEYS

