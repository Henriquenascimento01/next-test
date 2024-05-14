import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { deletePost, fetchPosts } from '../../app/services/api';
import { Post } from '../../app/types/types';


const PostsPage = () => {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        fetchPosts().then(response => setPosts(response.data));
    }, []);

    const handleDelete = async (id: number) => {
        if (window.confirm('Tem certeza que deseja excluir este post?')) {
            await deletePost(id);
            setPosts(posts.filter(post => post.id !== id));
        }
    };

    return (
        <div style={styles.container}>
            <h1>Posts</h1>
            <Link href="/posts/create" style={styles.createLink}>Cadastrar Post</Link>
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.header}>Título</th>
                        <th style={styles.header}>Ação</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map(post => (
                        <tr key={post.id}>
                            <td style={styles.cell}>
                                <Link href={`/posts/${post.id}`} style={styles.link}>{post.title}</Link>
                            </td>
                            <td style={styles.cell}>
                                <Link href={`/posts/edit/${post.id}`} style={styles.link}>Editar</Link>
                                {'  | '}
                                <button onClick={() => handleDelete(post.id)} style={styles.deleteButton}>
                                    Excluir
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        maxWidth: '800px',
        margin: '0 auto'
    },
    createLink: {
        backgroundColor: '#007BFF',
        color: '#ffffff',
        textDecoration: 'none',
        padding: '10px 15px',
        borderRadius: '5px',
        display: 'inline-block',
        marginBottom: '20px'
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse'
    },
    header: {
        backgroundColor: '#f4f4f4',
        padding: '10px',
        borderBottom: '2px solid #ccc'
    },
    cell: {
        padding: '10px',
        borderBottom: '1px solid #eee'
    },
    link: {
        color: '#065f46',
        textDecoration: 'none'
    },
    deleteButton: {
        color: 'red',
        border: 'none',
        backgroundColor: 'transparent',
        cursor: 'pointer',
        textDecoration: 'underline'
    }
};

export default PostsPage;
