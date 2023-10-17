import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
  if (params.slug === 'portfolio') {
    return {
      title: 'Hello world!',
      content: 'Welcome to my first project. Lorem ipsum dolor sit amet...'
    };
  }

  throw error(404, 'Not found');
}