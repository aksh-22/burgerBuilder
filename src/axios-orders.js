import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://burger-web-app-aksh22.firebaseio.com/',
});

export default instance;
