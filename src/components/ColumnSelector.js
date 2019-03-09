import React, { Component } from 'react';
import { Checkbox } from 'antd';
const CheckboxGroup = Checkbox.Group;


class ColumnSelector extends Component {

handleToggleColumn = columns => {
    // if (this.props.selectedColumns.indexOf(column) === -1) {
    //     this.props.addColumn(column)
    // } else {
    //     this.props.removeColumn(column)
    // }
    this.props.setColumns(columns);
}

render() {
    const plainOptions = this.props.allColumns.map(col => {
        return { 
            label: col,
            value: col }
    })
    return (
        <div className="ColumnSelector">
                <CheckboxGroup options={plainOptions} defaultValue={['base_id']} onChange={this.handleToggleColumn} />
                {this.props.children}
         {/* {this.props.allColumns.map(column => (
            <div className="Selector">
                <input type="checkbox" onClick={() => this.handleToggleColumn(column)} checked={this.props.selectedColumns.indexOf(column) != -1}/>{column}
            </div>
            ))} */}
        </div>
    );
  }
}

export default ColumnSelector;