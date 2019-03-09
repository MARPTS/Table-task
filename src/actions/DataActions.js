export const ADD_FILTER = 'ADD_FILTER';
export const REMOVE_FILTER = 'REMOVE_FILTER';
export const ADD_COLUMN = 'ADD_COLUMN';
export const REMOVE_COLUMN = 'REMOVE_COLUMN';
export const SET_COLUMNS = 'SET_COLUMNS';

export function addColumn(column) {
    return {
        type: ADD_COLUMN,
        column: column
    }
}

export function removeColumn(column) {
    return {
        type: REMOVE_COLUMN,
        column: column
    }
}

export function setColumns(columns) {
    return {
        type: SET_COLUMNS,
        columns: columns
    }
}
