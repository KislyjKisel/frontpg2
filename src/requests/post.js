import request from './common';
import { authenticatedRequest } from './auth';


const requestPost = {
    create: ({ title, text }) => authenticatedRequest('post/create', {
        method: 'POST',
        data: { title, text }
    }),
    view: (id) => request.get(`post/view?id=${id}`),
};

export default requestPost;
