import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Post } from '../../app/types/types';
import { fetchPostById } from '../../app/services/api';


const PostDetails = () => {
    const [post, setPost] = useState<Post | null>(null);
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        const fetchPost = async () => {
            if (id && typeof id === 'string') {
                try {
                    const response = await fetchPostById(parseInt(id));
                    setPost(response.data);
                } catch (error) {
                    console.error("Error fetching post", error);
                }
            }
        };

        fetchPost();
    }, [id]);

    if (!post) return <div style={styles.loading}>Carregando ...</div>;

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>{post.title}</h1>
            <p style={styles.body}>{post.body}</p>
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        maxWidth: '800px',
        margin: '20px auto',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
    },
    title: {
        fontSize: '24px',
        color: '#333',
        marginBottom: '10px'
    },
    body: {
        fontSize: '16px',
        color: '#666',
        lineHeight: '1.6'
    },
    loading: {
        fontSize: '18px',
        textAlign: 'center',
        marginTop: '50px'
    }
};

export default PostDetails;
