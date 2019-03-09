import React, { Component } from 'react';
import { Table, Input, Button, Icon } from 'antd';
import Highlighter from 'react-highlight-words';

class DataTable extends Component {
  state = {
    searchText: '',
  };

  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys, selectedKeys, confirm, clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => { this.searchInput = node; }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: (text) => (
      <Highlighter
        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text.toString()}
      />
    )
  })

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  }

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: '' });
  }
  

  

  render() {
      const columns = this.props.selectedColumns.map((col) => {
        const obj = {
          title: col,
          dataIndex: col,
          ...this.getColumnSearchProps(col),
          defaultSortOrder: 'ascend',
          sortDirections: ['descend', 'ascend'],
        }
        if (col === 'sr_ranking' || col === 'pp_ranking') {
          obj.sorter = (a, b) => {
              return a[col] - b[col]
          }
        }
        return obj;
      })

      const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
          this.props.getSelect(selectedRows);
        },
        getCheckboxProps: record => ({
          disabled: record.name === 'Disabled User', // Column configuration not to be checked
          name: record.name,
        }),
      };
      return (
      // <div className="DataTable">
      //     <table >
      //       <tr>
      //         {this.props.selectedColumns.map(selectedColumn => (
      //             <th>{selectedColumn}</th>
      //         ))}
      //       </tr>
      //       {this.props.data.map(row => (
      //       <tr>
      //            {this.props.selectedColumns.map(selectedColumn => (
      //             <td>{row[selectedColumn]}</td>
      //             ))}
      //       </tr>
      //       ))}
      //     </table>
      //     </div>
      <Table rowSelection={rowSelection} bordered={true} columns={columns} dataSource={this.props.data} pagination={{ pageSize: 20 }} />
      );
    }
  }

export default DataTable;