import React from 'react'
import PropTypes from 'prop-types'
import { InputLabel, Grid, Button } from '@material-ui/core'

import KEYS from '../constants/keys'
import {
    LABEL,
} from '../constants/sortTypes'


const Sort = ({selectedSort, onSetSort}) => {
    const sortOptions = [
        {value: KEYS.departure, label: LABEL.tw[KEYS.departure]},
        {value: KEYS.arrival, label: LABEL.tw[KEYS.arrival]},
        {value: KEYS.duration, label: LABEL.tw[KEYS.duration]},
        {value: KEYS.fare, label: LABEL.tw[KEYS.fare]},
    ]

    return (
        <React.Fragment>
            <InputLabel shrink>
                Primary
            </InputLabel>

            <Grid
              container
              justify='space-between'
            >
            {
                sortOptions.map((option, i) => (
                    <Grid
                      key={i}
                      item
                      xs={3}
                    >
                        <Button
                          key={ option.value }
                          size='small'
                          variant={ selectedSort === option.value ? 'contained' : 'text' }
                          color='primary'
                          onClick={ _ => {
                              onSetSort(option.value)
                          }}
                          style={ {width: '100%'} }
                        >
                            { option.label }
                        </Button>
                    </Grid>
                ))
            }
            </Grid>
        </React.Fragment>
    )
}

Sort.propTypes = {
    selectedSort: PropTypes.oneOf([KEYS.duration, KEYS.arrival, KEYS.departure, KEYS.cheapCost, KEYS.smallTransfer]).isRequired,
    onSetSort: PropTypes.func.isRequired,
}

export default Sort

