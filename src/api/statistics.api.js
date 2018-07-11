import axios from 'axios';

class StatisticsClient {
  getStatistics() {
    return axios.get('http://localhost:4200/api/statistics');
  }
}

export default new StatisticsClient();
