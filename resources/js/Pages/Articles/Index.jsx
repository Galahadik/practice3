import React from 'react';
import { useForm, usePage } from '@inertiajs/react';

export default function Index({ articles }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        content: '',
        is_published: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('articles.store'), { onSuccess: () => reset() });
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Керування статтями</h1>
            
            {/* Форма створення */}
            <form onSubmit={submit} className="bg-white p-6 rounded shadow mb-8">
                <div className="mb-4">
                    <label className="block mb-1">Заголовок</label>
                    <input 
                        type="text" 
                        value={data.title}
                        onChange={e => setData('title', e.target.value)}
                        className="w-full border rounded p-2"
                    />
                    {errors.title && <div className="text-red-500 text-sm">{errors.title}</div>}
                </div>
                
                <div className="mb-4">
                    <label className="block mb-1">Контент</label>
                    <textarea 
                        value={data.content}
                        onChange={e => setData('content', e.target.value)}
                        className="w-full border rounded p-2"
                    ></textarea>
                    {errors.content && <div className="text-red-500 text-sm">{errors.content}</div>}
                </div>

                <button 
                    disabled={processing}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Зберегти статтю
                </button>
            </form>

            {/* Таблиця статей */}
            <table className="w-full bg-white rounded shadow">
                <thead>
                    <tr className="border-b">
                        <th className="p-3 text-left">ID</th>
                        <th className="p-3 text-left">Заголовок</th>
                        <th className="p-3 text-left">Статус</th>
                    </tr>
                </thead>
                <tbody>
                    {articles.map(article => (
                        <tr key={article.id} className="border-b">
                            <td className="p-3">{article.id}</td>
                            <td className="p-3">{article.title}</td>
                            <td className="p-3">{article.is_published ? '✅' : '⏳'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}