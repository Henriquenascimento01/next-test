import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { fetchPostById, updatePost } from '../../../app/services/api';
import { Post } from '../../../app/types/types';


const EditPostPage = () => {
    const [post, setPost] = useState<Post | null>(null);
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        const loadPost = async () => {
            if (typeof id === 'string') {
                const fetchedId = parseInt(id);
                const response = await fetchPostById(fetchedId);
                setPost(response.data);
            }
        };
        loadPost();
    }, [id]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (post) {
            await updatePost(post.id, { title: post.title, body: post.body, userId: post.userId });
            router.push('/posts');
        }
    };

    if (!post) return <div>Carregando...</div>;

    return (
        <div style={styles.formContainer}>
            <form onSubmit={handleSubmit} style={styles.form}>
                <label style={styles.label}>Título:</label>
                <input
                    type="text"
                    value={post?.title}
                    onChange={e => setPost({...post, title: e.target.value})}
                    style={styles.input}
                />
                <label style={styles.label}>Conteúdo:</label>
                <textarea
                    value={post?.body}
                    onChange={e => setPost({...post, body: e.target.value})}
                    style={styles.textarea}
                />
                <button type="submit" style={styles.button}>Atualizar</button>
            </form>
        </div>
    );
};

const styles = {
    formContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        padding: '20px'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%', // Responsivo até um certo ponto
        maxWidth: '500px', // Limita a largura do formulário
        backgroundColor: '#f7f7f7',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    },
    label: {
        marginBottom: '5px',
        fontWeight: 'bold'
    },
    input: {
        marginBottom: '20px',
        padding: '10px',
        fontSize: '16px',
        borderRadius: '4px',
        border: '1px solid #ccc'
    },
    textarea: {
        minHeight: '150px',
        padding: '10px',
        fontSize: '16px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        marginBottom: '20px'
    },
    button: {
        padding: '10px 20px',
        fontSize: '16px',
        color: 'white',
        backgroundColor: '#007BFF',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
    }
};

export default EditPostPage;
