import { TextField, InputLabel, Select, MenuItem } from '@material-ui/core'
import React from 'react'

export function Filters({ isFiltered, onSetNameFilter, onFilterDone }) {
    return (
        <div className="filter-container">
            <div className="filter-toggles">
                <div className="search-container">
                    <TextField fullWidth id="standard-basic" label="Filter by name" onChange={(ev) => onSetNameFilter(ev.target.value)} />
                </div>
                <div>
                    <InputLabel  id="filter-done">Completed Status</InputLabel>
                    <Select
                        labelId="filter-done"
                        id="filter-done"
                        defaultValue="none"
                        onChange={(ev) => onFilterDone(ev.target.value)}
                    >
                        <MenuItem value={'none'}>All Tasks</MenuItem>
                        <MenuItem value={'done'}>Completed Tasks</MenuItem>
                        <MenuItem value={'undone'}>Uncompleted Tasks</MenuItem>
                    </Select>
                </div>
            </div>
            <div className="filter-warning">
                <small style={{ opacity: (isFiltered) ? 100 : 0 }}>You can't drag and drop tasks while in filtered view</small>
            </div>
        </div>
    )
}
