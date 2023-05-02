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
    <ul>
        <li>
            <a href="/">Home</a>
            <a href="/about">About</a>
            <a href="/projects/hello-world">Projects</a>
            <a href="/add">Add</a>
        </li>
    </ul>
</nav>

<slot />
