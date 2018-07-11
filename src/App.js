import React, { Component } from 'react';
import StatisticsClient from './api/statistics.api';
import ReactTable from 'react-table';
import { Bar } from 'react-chartjs-2';

import 'react-table/react-table.css';
import './App.css';

class App extends Component {

  state = {
    statistics: []
  };

  componentDidMount() {
    StatisticsClient.getStatistics().then(response => this.setState({ statistics: response.data.statistics }));
  }

  getTableColumns = () => [{
    Header: 'Category',
    accessor: '_id'
  }, {
    Header: 'Sum',
    accessor: 'sum',
  }, {
    Header: 'Average',
    accessor: 'avg'
  }, {
    Header: 'Count',
    accessor: 'count'
  }]

  displayData = key => {
    const { statistics } = this.state;
    return {
      labels: statistics.map(stat => stat[key]),
      datasets: [
        {
          label: key,
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: statistics.map(stat => stat[key])
        }
      ]
    };
  }

  render() {
    const { statistics } = this.state;

    return (
      <div className="grid-container">
        {
          <React.Fragment>
            <div className="grid-item">
              <ReactTable
                data={statistics}
                columns={this.getTableColumns()}
                defaultPageSize={5}
              />
            </div>
            <div className="grid-item">
              <Bar
                data={this.displayData('sum')}
              />
            </div>
            <div className="grid-item">
              <Bar
                data={this.displayData('avg')}
              />
            </div>
            <div className="grid-item">
              <Bar
                data={this.displayData('count')}
              />
            </div>
          </React.Fragment>
        }
      </div>
    );
  }
}

export default App;
