import axios from 'axios';

class LocationDataService {
  static getLocation() {
    return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/booking`);
  }
}

const locationDataService = new LocationDataService();
export default locationDataService;