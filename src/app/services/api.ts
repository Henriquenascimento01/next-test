import axios from 'axios';

const api = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
});

export const fetchPosts = async () => {
    return api.get('/posts');
};

export const fetchPostById = async (id: number) => {
    return api.get(`/posts/${id}`);
};

export const createPost = async (postData: { title: string; body: string; userId: number }) => {
    return api.post('/posts', postData);
};

export const updatePost = async (id: number, postData: { title: string; body: string; userId: number }) => {
    return api.put(`/posts/${id}`, postData);
};

export const deletePost = async (id: number) => {
    return api.delete(`/posts/${id}`);
};
