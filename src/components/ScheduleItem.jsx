import React from 'react'
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { Card, Icon, Grid, Button } from '@material-ui/core'
import KEYS from '../constants/keys'


const ScheduleItem = ({
    departureDate,
    number,
    train_type_name,
    duration,
    step,
    type,
    fare,
    has_nursing_room,
    is_bike_allowed,
    has_wheel_chair,
    isDaily,
    note,
    index,
    onAddingFilter,
    t,
}) => {
    const ICON_STYLE = {
        width: '30px',
    }
    const BIKE_SPACE_STYLE = {
        ...ICON_STYLE,
        color: 'green',
    }
    const NURSING_ROOM_STYLE = {
        ...ICON_STYLE,
        color: 'red',
    }
    const WHEEL_CHAIR_STYLE = {
        ...ICON_STYLE,
        color: 'blue',
    }

    const renderHeader = () => (
        <Grid
          item
          xs={12}
        >
            <Grid
              container
              justify='space-between'
            >
                <Grid
                  item
                >
                    { departureDate }
                </Grid>
                <Grid
                  item
                >
                    $ { fare } NTD
                </Grid>
            </Grid>
        </Grid>
    )

    const renderFooter = () => {
        if (has_nursing_room || is_bike_allowed || has_wheel_chair || note) {
            return (
                <React.Fragment>
                    <hr
                      style={ {'backgroundColor': '#555', width: '100%', height: '0.05rem', border: 'none'} }
                    />
                    <Grid
                      item
                      xs={12}
                    >
                        {has_nursing_room && (
                            <Button
                              style={{minWidth: '30px'}}
                              onClick={ () => onAddingFilter(KEYS.nursingRoom) }
                            >
                                <Icon style={ NURSING_ROOM_STYLE } className={ clsx('fas fa-baby') } />
                            </Button>
                        )}
                        {is_bike_allowed && (
                            <Button
                              style={{minWidth: '30px'}}
                              onClick={ () => onAddingFilter(KEYS.bikeSpace) }
                            >
                                <Icon style={ BIKE_SPACE_STYLE } className={ clsx('fas fa-bicycle') } />
                            </Button>
                        )}
                        {has_wheel_chair && (
                            <Button
                              style={{minWidth: '30px'}}
                              onClick={ () => onAddingFilter(KEYS.wheelChair) }
                            >
                                <Icon style={ WHEEL_CHAIR_STYLE } className={ clsx('fas fa-wheelchair') } />
                            </Button>
                        )}
                        <br />
                        <span style={ {fontSize: '.8rem'} }>{ note }</span>
                    </Grid>
                </React.Fragment>
            )
        }
    }

    const renderStopHeader = (duration, number) => (
        <Grid
          key={number}
          item
          xs={12}
        >
            <Grid
              container
              justify='space-between'
            >
                <Grid
                  item
                  xs={3}
                >
                    <Button
                      style={{width: '100%', color: '#000'}}
                      disabled
                    >
                        <Icon className={ clsx('fas fa-hourglass-start') } />
                        { duration }
                    </Button>
                </Grid>
                <Grid
                  item
                  xs={9}
                >
                    <Button
                      style={{width: '100%', color: '#000'}}
                      disabled
                    >
                        No. { number }
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    )

    const renderStop = (time, name) => (
        <Grid
          key={time}
          item
          xs={12}
        >
            <Grid
              container
              justify='space-between'
            >
                <Grid
                  item
                  xs={3}
                >
                    <Button
                      style={{width: '100%', color: '#000'}}
                      disabled
                    >
                        { time }
                    </Button>
                </Grid>
                <Grid
                  item
                  xs={9}
                >
                    <Button
                      style={{width: '100%', color: '#000'}}
                      disabled
                    >
                        { name }
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    )
    
    const renderStops = stops => (
        stops.map(stop => renderStop(stop.time, stop.name))
    )

    return (
        <Card
          style={{
              margin: '1rem 0 0 0',
              padding: '.3rem',
              boxShadow: '0 2px 10px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.1)',
          }}
        >
            <Grid
              container
              justify='center'
              alignItems='center'
              key={ index }
            >
                { renderHeader() }

                { renderStopHeader(duration, number) }

                {  step.map(s => renderStops([
                    {time: s.departure, name: t(s.from.toLowerCase())},
                    {time: s.arrival, name: t(s.to.toLowerCase())}],
                ))}

                { renderFooter() }
            </Grid>
        </Card>
    )
}

ScheduleItem.propTypes = {
    departureDate: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    train_type: PropTypes.oneOf([KEYS.tzeTrain, KEYS.chuTrain, KEYS.fuTrain, KEYS.ordTrain]).isRequired,
    fare: PropTypes.number,
    duration: PropTypes.string.isRequired,
    step: PropTypes.arrayOf(PropTypes.shape({
        from: PropTypes.string.isRequired,
        to: PropTypes.string.isRequired,
        departure: PropTypes.string.isRequired,
        arrival: PropTypes.string.isRequired,
    })),
    departure: PropTypes.string.isRequired,
    arrival: PropTypes.string.isRequired,
    has_wheel_chair: PropTypes.bool,
    has_nursing_room: PropTypes.bool,
    is_bike_allowed: PropTypes.bool,
    is_daily: PropTypes.bool,
    note: PropTypes.string,

    onAddingFilter: PropTypes.func.isRequired,
}

export default withTranslation()(ScheduleItem)

