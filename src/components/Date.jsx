import React from 'react'
import PropTypes from 'prop-types'
import { InputLabel, Grid, TextField, Button } from '@material-ui/core';


const Date_ = ({
    selectedDate,
    isToday,
    isTomorrow,
    onChangeDate,
    onSetToday,
    onSetTomorrow,
}) => {
    return(
        <Grid
          container
          alignItems="flex-end"
          justify='space-between'
        >
            <Grid
              item
              xs={5}
              sm={4}
            >
                <InputLabel shrink>
                    Depature date
                </InputLabel>

                <TextField
                  style={{width: '100%'}}
                  type="date"
                  value={ selectedDate }
                  onChange={ onChangeDate }
                />
            </Grid>

            <Grid
              item
              xs={7}
            >
                <Grid
                  container
                >
                    <Grid
                      item
                    >
                        <Button
                          variant={ isToday ? 'contained' : 'text' }
                          color='primary'
                          onClick={ onSetToday }
                          size='small'
                        >
                            Today
                        </Button>
                    </Grid>
                    <Grid
                      item
                    >
                        <Button
                          variant={ isTomorrow ? 'contained' : 'text' }
                          color='primary'
                          onClick={ onSetTomorrow }
                          size='small'
                        >
                            Tomorrow
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

Date_.propTypes = {
    selectedDate: PropTypes.string.isRequired,
    isToday: PropTypes.bool,
    isTomorrow: PropTypes.bool,
    onChangeDate: PropTypes.func.isRequired,
    onSetToday: PropTypes.func.isRequired,
    onSetTomorrow: PropTypes.func.isRequired,
}

export default Date_
