import axios from 'axios';

class StatisticsClient {
  getStatistics() {
    return axios.get('https://light-map-back.herokuapp.com/api/statistics');
  }
}

export default new StatisticsClient();
