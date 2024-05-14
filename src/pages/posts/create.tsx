import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { createPost } from '../../app/services/api';


const CreatePostPage = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        await createPost({ title, body, userId: 1 });
        router.push('/posts');
    };

    return (
        <div style={styles.formContainer}>
            <form onSubmit={handleSubmit} style={styles.form}>
                <label style={styles.label}>Título:</label>
                <input
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    style={styles.input}
                />
                <label style={styles.label}>Conteúdo:</label>
                <textarea
                    value={body}
                    onChange={e => setBody(e.target.value)}
                    style={styles.textarea}
                />
                <button type="submit" style={styles.button}>Enviar</button>
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
        width: '100%',
        maxWidth: '600px',
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

export default CreatePostPage;
