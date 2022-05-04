import axios from 'axios';
import { environment } from '../../../config/app-config';

export default axios.create({
    baseURL: environment.baseUrl,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        from: "proxy API"
    }
});