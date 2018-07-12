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
  
  statisticsWithLabel = () => {
    const { statistics } = this.state;
    
    return statistics.map(stat => ({ ...stat, label: statisticsConfig[stat._id.key] }));
  };
  
  getTableColumns = () => [{
    Header: 'Category',
    accessor: 'label',
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
          data: Object.keys(statisticsConfig).map((categoryKey) => {
            const stat = statistics.find(stat => stat._id.key === categoryKey);
            return stat && stat[key];
          })
        }
      ]
    };
  };
  
  render() {
    const options = {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    };
    
    return (
      <div className="grid-container">
        {
          <React.Fragment>
            <div className="grid-item">
              <div className="title">
                Tableau récapitulatif
              </div>
              <ReactTable
                data={this.statisticsWithLabel()}
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
                options={options}
              />
            </div>
            <div className="grid-item">
              <div className="title">
                Moyennes par catégorie
              </div>
              <Bar
                data={this.displayData('avg')}
                options={options}
              />
            </div>
            <div className="grid-item">
              <div className="title">
                Nombres par catégorie
              </div>
              <Bar
                data={this.displayData('count')}
                options={options}
              />
            </div>
          </React.Fragment>
        }
      </div>
    );
  }
}

export default Statistics;
