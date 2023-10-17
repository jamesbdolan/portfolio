<script>
	import Step from './Step.svelte';

	let steps = [
		{ name: 'Portfolio', icon: 'fa-solid fa-palette' },
		{ name: 'Python networking app', icon: 'fa-solid fa-puzzle-piece' },
		{ name: 'Fancy devops showcase', icon: 'fa-solid fa-hammer' }
	];

	let benefits = [
		{
			name: 'a self starter',
			description:
				'I began my career as a database engineer for a martech product completing tickets for data ingestion pipelines, ETL jobs, and dashboard queries. Once I gained my credibility in the team I kickstarted and pushed for projects: reducing our memory footprint; refactoring and simplifying the codebase; migrating our codebase from SVN to Git; introducing DevOps practises.'
		},
		{
			name: 'an enthusiastic learner',
			description:
				'Whatever technology is best for the job, I am eager to learn'
		},
		{
			name: 'an excellent communicator',
			description:
				"I like to document everything I do in runbooks so that as I work, the record is clear for those after me. It also hugely benefits learning for me and my team."
		}
	];
</script>

<main class="flex flex-col flex-1 p-4">
	<section id="introPage" class="grid grid-cols-1 lg:grid-cols-2 gap-10 py-8 sm:py-14">
		<div class="flex flex-col lg_justify-center text-center lg:text-left gap-6 md:gap-8 lg:gap-10">
			<h2 class="font-semi-bold text-4xl sm:text-5xl md:text-6xl">
				Hi! I'm <span class="poppins text-violet-400">James Dolan</span><br />
				DevOps Engineer
			</h2>
			<p class="text-base sm:text-lg md:text-xl">
				I am based in Melbourne 🇦🇺 and available immediately. <br />
				This site aims to consolidate and showcase my skills in DevOps <br /> and tie together the variety
				of things I have experience in.
			</p>
			<a
				href="www.linkedin.com/in/jamesbdolan"
				target="_blank"
				class="blueShadow mx-auto lg:mr-auto text-base sm:text-lg md:text-xl poppins relative overflow-hidden px-6 py-3 group rounded-full bg-white text-slate-950 curser-pointer"
			>
				<div
					class="absolute top-0 right-full w-full h-full bg-violet-400 opacity-20 group-hover:translate-x-full z-0 duration-200"
				/>
				<h4 class="relative z-9">Get in touch &rarr;</h4>
			</a>
		</div>
		<div class="relative shadow-2xl grid place-items-center">
			<!-- svelte-ignore a11y-img-redundant-alt -->
			<img
				src={'images/profile10.png'}
				alt="Profile image"
				class="object-cover z-[2] max-h-[70vh]"
			/>
		</div>
	</section>
	<section id="projects" class="py-32 lg:py-32 flex-col">
		<div class="flex flex-col gap-20 text-center">
			<h3 class="font-semibold text-3xl sm:text-4xl md:text-5xl">
				Curious to <span class="poppins text-violet-400">see</span> my work?
			</h3>
			<!-- <a
				href="https://youtu.be/-2UjwQzxvBQ?si=gnLOyd6WmvLMJx6d"
				target="_blank"
				class="mx-auto px-4 py-2 rounded-full border border-solid border-white flex item-center gap-2 -mb-4 sm:-mb-0 -mt-10 hover:border-violet-700 duration-200"
			>
				<i class="fa-regular fa-circle-play py-1" />
				<p>Watch the video</p>
			</a> -->

			<div class="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-10">
				<Step step={steps[0]}>
					Website built with SvelteKit and TailwindCSS, deployed using Netflify
				</Step>
				<Step step={steps[1]}>TODO</Step>
				<Step step={steps[2]} />
			</div>
		</div>
	</section>
	<section
		id="about"
		class="py-20 pt-10 lg:pt-16 lg:py-32 flex flex-col gap-16 sm:gap-20 md:gap-24 relative"
	>
		<div
			class="flex flex-col gap-2 text-center relative before:absolute before:top-0 before:left-0 before:w-2/3 before:h-1.5 before:bg-violet-700 after:absolute after:bottom-0 after:right-0 after:w-2/3 after:h-1.5 after:bg-violet-700 py-4"
		>
			<h6 class="text-large sm:text-xl md:text-2xl">Want to know more?</h6>
			<h3 class="font-semibold text-3xl sm:text-4xl md:text-5xl">
				A bit <span class="poppins text-violet-400">about</span> me.
			</h3>
		</div>
		<p class="mx-auto poppins font-semibold text-lg sm:text-xl md:text-2xl">I am . . .</p>

		<div class="flex flex-col gap-20 w-full mx-auto max-w-[800px]">
			{#each benefits as benefit, index}
				<div class="flex gap-6 sm:gap-8">
					<p class="poppins text-4xl sm:text-5xl md:text-6xl text-slate-500 font-semibold">
						0{index + 1}
					</p>
					<div class="flex flex-col gap-6 sm:gap-8">
						<h3 class="text-2xl sm:text-3xl md:text-5xl">
							{benefit.name}
						</h3>
						<p>{benefit.description}</p>
					</div>
				</div>
			{/each}
		</div>
	</section>
</main>

<h3>Goals</h3>
<p>The emoji are here to jazz it up 🌸</p>
<ul>
	<li>Site hosting 🌐</li>
	<ul>
		<li>✅ Registered a domain name with <a href="id.ie">Irish Domains</a> 🇮🇪</li>
		<li>✅ Pointed my domain to Netlify nameservers 🛣️</li>
		<li>✅ The Netlify build is triggered off commits to the Github repo 🪝</li>
	</ul>
	<li>Become familiar with HTML and CSS</li>
	<ul>
		<li>🔁 Gotten more used to HTML, like remembering where to place the / in a closing tag 😅</li>
		<li><s>✅ Added a style sheet from <a href="https://picocss.com/docs/">Pico CSS</a> 🎨</s></li>
	</ul>
	<li>Website analytics 📈</li>
	<ul>
		<li>
			I tried connecting this site to <a href="https://firebase.google.com/">Firebase</a> but failed
			👺
		</li>
		<li>Wondering is it worth using my own database to track analytics? 🤔</li>
		<li>🧾 CV download counter</li>
	</ul>
	<li>Connect to a database</li>
	<ul>
		<li>✅ I tested a Pocketbase instance on a Linode server which worked very nicely</li>
		<li>I like the look of setting up Prisma 😙</li>
		<li>Maybe set up basic database with Prisma then swap to Pocketbase?</li>
		<li>A blog input for me?</li>
	</ul>
	<li>Resources for visitors</li>
	<ul>
		<li>📄 Add CV download link</li>
	</ul>
</ul>
