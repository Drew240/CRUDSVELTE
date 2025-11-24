<script>
    let posts = [
        { id: 1, title: 'Post #4136767', body: '...' }
    ];

    let title = '';
    let body = '';
    let editingId = null;

    function createPost() {
        if (!title || !body) return;
        const newPost = {
            id: Date.now(),
            title,
            body
        };
        posts = [newPost, ...posts];
        title = '';
        body = '';
    }

    function deletePost(id) {
        posts = posts.filter(p => p.id !== id);
    }

    function startEdit(post) {
        editingId = post.id;
        title = post.title;
        body = post.body;
    }

    function updatePost() {
        if (!title || !body) return;
        posts = posts.map(p =>
            p.id === editingId ? { ...p, title, body } : p
        );
        editingId = null;
        title = '';
        body = '';
    }
</script>

<h1> CRUD </h1>

<form on:submit|preventDefault={editingId ? updatePost : createPost}>
    <input bind:value={title} placeholder="Título" required />
    <textarea bind:value={body} placeholder="Contenido" required></textarea>
    <button type="submit">{editingId ? 'Actualizar' : 'Crear'}</button>
    {#if editingId}
        <button type="button" on:click={() => { editingId = null; title = ''; body = ''; }}>Cancelar</button>
    {/if}
</form>

<hr />

{#each posts as post}
    <article>
        {#if editingId === post.id}
            <h2>Editando publicación #{post.id}</h2>
            <form on:submit|preventDefault={updatePost}>
                <input bind:value={title} placeholder="Título" required />
                <textarea bind:value={body} placeholder="Contenido" required></textarea>
                <button type="submit">Guardar</button>
                <button type="button" on:click={() => { editingId = null; title = ''; body = ''; }}>Cancelar</button>
            </form>
        {:else}
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <button on:click={() => startEdit(post)}>Editar</button>
            <button on:click={() => deletePost(post.id)}>Eliminar</button>
        {/if}
    </article>
{/each}

<style>
    :global(body) {
        font-family: sans-serif;
        background: #121212;
        color: #f0f0f0;
        padding: 2rem;
    }

    h1 {
        color: #ffffff;
        margin-bottom: 1rem;
    }

    form {
        background-color: #1e1e1e;
        border: 1px solid #333;
        border-radius: 8px;
        padding: 1rem;
        margin-bottom: 2rem;
        box-shadow: 0 0 10px rgba(0,0,0,0.3);
    }

    input, textarea {
        width: 100%;
        padding: 0.75rem;
        margin-bottom: 1rem;
        border: 1px solid #444;
        border-radius: 4px;
        background-color: #2a2a2a;
        color: #f0f0f0;
        font-size: 1rem;
    }

    input:focus, textarea:focus {
        outline: none;
        border-color: #0070f3;
        background-color: #333;
    }

    button {
        background-color: #0070f3;
        color: white;
        border: none;
        padding: 0.6rem 1.2rem;
        border-radius: 4px;
        cursor: pointer;
        font-size: 1rem;
        transition: background-color 0.2s ease;
        margin-right: 0.5rem;
    }

    button:hover {
        background-color: #005ec2;
    }

    article {
        background-color: #1a1a1a;
        border: 1px solid #333;
        border-radius: 8px;
        padding: 1rem;
        margin-bottom: 1.5rem;
        box-shadow: 0 0 6px rgba(0,0,0,0.2);
    }
</style>
