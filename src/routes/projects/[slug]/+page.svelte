<script>
	/** @type {import('./$types').PageData} */
	export let data;
</script>

<main class="flex flex-col flex-1 px-6">
	<!-- <h1>{data.title}</h1> -->
	<!-- <div>{@html data.content}</div> -->

	<h3 class="font-semibold text-3xl sm:text-4xl md:text-5xl py-4">Goals</h3>
	<ul>
		<li class="text-base sm:text-lg md:text-xl">Site hosting 🌐</li>
		<ul>
			<li>✅ Registered a domain name with <a href="id.ie">Irish Domains</a> 🇮🇪</li>
			<li>✅ Pointed my domain to Netlify nameservers 🛣️</li>
			<li>✅ The Netlify build is triggered off commits to the Github repo 🪝</li>
		</ul>
		<br />
		<li class="text-base sm:text-lg md:text-xl">Become familiar with HTML and CSS</li>
		<ul>
			<li>
				🔁 Gotten more used to HTML, like remembering where to place the / in a closing tag 😅
			</li>
			<li>
				<s>✅ Added a style sheet from <a href="https://picocss.com/docs/">Pico CSS</a> 🎨</s>
			</li>
		</ul>
		<br />
		<li class="text-base sm:text-lg md:text-xl">Website analytics 📈</li>
		<ul>
			<li>
				I tried connecting this site to <a href="https://firebase.google.com/">Firebase</a> but failed
				👺
			</li>
			<li>Wondering is it worth using my own database to track analytics? 🤔</li>
			<li>🧾 CV download counter</li>
		</ul>
		<br />
		<li class="text-base sm:text-lg md:text-xl">Connect to a database</li>
		<ul>
			<li>✅ I tested a Pocketbase instance on a Linode server which worked very nicely</li>
			<li>I like the look of setting up Prisma 😙</li>
			<li>Maybe set up basic database with Prisma then swap to Pocketbase?</li>
			<li>A blog input for me?</li>
		</ul>
		<br />
		<li class="text-base sm:text-lg md:text-xl">Resources for visitors</li>
		<ul>
			<li>📄 Add CV download link</li>
		</ul>
	</ul>
</main>
