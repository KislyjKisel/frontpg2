import { authenticatedRequest } from './auth';


const requestUser = () => authenticatedRequest('user');

export default requestUser;
