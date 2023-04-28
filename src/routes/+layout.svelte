<script>
    import '@picocss/pico'
    import '../app.css'
	// import { getAnalytics, logEvent } from 'firebase/analytics';
	// import { onMount } from 'svelte';
	// import { app } from '../firebase';

    // onMount(() => {
	// 	const analytics = getAnalytics(app);
	// 	logEvent(analytics, 'page_title');
	// });
</script>

<nav>
    <a href="/">Home</a>
    <a href="/about">About</a>
    <a href="/settings">Settings</a>
    <a href="/blog/hello-world">Blog</a>
    <a href="/add">Add</a>
</nav>

<slot></slot>
