import React, { Component } from 'react';
import StatisticsClient from '../api/statistics.api';
import ReactTable from 'react-table';
import { Bar, defaults } from 'react-chartjs-2';

import { statisticsConfig } from './constants';
import 'react-table/react-table.css';
import './Statistics.css';

defaults.global.defaultFontFamily = 'Raleway';

class Statistics extends Component {
  
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
  }];
  
  displayData = key => {
    const { statistics } = this.state;
    return {
      labels: Object.values(statisticsConfig),
      datasets: [
        {
          label: key,
          backgroundColor: '#71b280',
          hoverBackgroundColor: '#134e5e',
          data: Object.keys(statisticsConfig).map(key => statistics.find(stat => stat._id.key === key))
        }
      ]
    };
  };
  
  render() {
    const { statistics } = this.state;
    
    return (
      <div className="grid-container">
        {
          <React.Fragment>
            <div className="grid-item">
              <div className="title">
                Tableau récapitulatif
              </div>
              <ReactTable
                data={statistics}
                columns={this.getTableColumns()}
                defaultPageSize={5}
              />
            </div>
            <div className="grid-item">
              <div className="title">
                Sommes par catégorie
              </div>
              <Bar
                data={this.displayData('sum')}
              />
            </div>
            <div className="grid-item">
              <div className="title">
                Moyennes par catégorie
              </div>
              <Bar
                data={this.displayData('avg')}
              />
            </div>
            <div className="grid-item">
              <div className="title">
                Nombres par catégorie
              </div>
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

export default Statistics;