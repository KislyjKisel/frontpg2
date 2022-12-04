import { authenticatedRequest } from './auth';


const requestUser = (login) => authenticatedRequest(login ? `user/${login}` : 'user');

export default requestUser;
