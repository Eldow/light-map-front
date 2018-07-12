import React, { Component } from 'react';
import StatisticsClient from './api/statistics.api';
import ReactTable from 'react-table';
import { Bar } from 'react-chartjs-2';

import 'react-table/react-table.css';
import './App.css';

const labels = {
  1: 'Moins de 700 Kwh/m²/an',
  2: 'De 700 à 800 Kwh/m²/an',
  3: 'De 800 à 900 Kwh/m²/an',
  4: 'De 900 à 1000 Kwh/m²/an',
  5: 'Plus de 1000 Kwh/m²/an',
}

class App extends Component {

  state = {
    statistics: []
  };

  componentDidMount() {
    StatisticsClient.getStatistics().then(response =>
      this.setState({ statistics: response.data.statistics })
    );
  }

  getTableColumns = () => [{
    Header: 'Category',
    accessor: 'label'
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
      labels: Object.values(labels),
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

  statsWithLabels = () => {
    const { statistics } = this.state;

    return statistics
      .map(stat => ({ ...stat, label: labels[stat.category] }))
  }


  render() {
    return (
      <div className="grid-container">
        {
          <React.Fragment>
            <div className="grid-item">
              <ReactTable
                data={this.statsWithLabels()}
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
