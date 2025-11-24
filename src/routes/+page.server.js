import { fail } from '@sveltejs/kit';

export async function load({ fetch, depends }) {
    depends('load:posts');
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    const posts = await res.json();
    return { posts: posts.map(({ id, title, body }) => ({ id, title, body })) };
}

export const actions = {
    crear: async ({ request, fetch }) => {
        const formData = await request.formData();
        const title = formData.get('title')?.trim();
        const body = formData.get('body')?.trim();
        if (!title || !body) return fail(400, { errors: { title, body } });

        const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify({ title, body, userId: 1 }),
            headers: { 'Content-Type': 'application/json' }
        });
        const post = await res.json();
        return { post };
    },

    actualizar: async ({ request, fetch }) => {
        const formData = await request.formData();
        const id = Number(formData.get('id'));
        const title = formData.get('title')?.trim();
        const body = formData.get('body')?.trim();
        if (!id || !title || !body) return fail(400, { errors: { id, title, body } });

        const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ id, title, body, userId: 1 }),
            headers: { 'Content-Type': 'application/json' }
        });
        const post = await res.json();
        return { post };
    },

    eliminar: async ({ request, fetch }) => {
        const formData = await request.formData();
        const id = Number(formData.get('id'));
        if (!id) return fail(400, { errors: { id } });

        await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, { method: 'DELETE' });
        return { id };
    }
};
