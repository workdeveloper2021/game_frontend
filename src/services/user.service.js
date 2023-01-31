// import axios from 'axios';
import authHeader from './auth-header';
import http from "../http-common";

class UserService {
  getPublicContent() {
    return http.get('test/all');
  }

}

export default new UserService();
