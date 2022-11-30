import request from './common';
import { authenticatedRequest } from './auth';

function create({ title, text }) {
    return authenticatedRequest('post/create', {
        method: 'POST',
        data: { title, text }
    });
}

function view(id) {
    return request.get(`post/view?id=${id}`);
}

export default {
    create,
    view,
}
