<script lang="ts">
	import { Search, Filter, Plus, ChevronDown, ExternalLink } from 'lucide-svelte';

	let decisions = $state([
		{
			id: 'DEC-104',
			title: 'Deprioritize Dark Mode for Q1',
			status: 'Approved',
			date: '2023-10-24',
			author: 'Sarah Jenkins',
			context: 'Engineering resources are constrained due to the backend migration.',
			tradeoffs: 'Will disappoint 15% of users requesting it, but ensures stability of core platform.',
			stakeholders: ['Engineering', 'Product', 'Support']
		},
		{
			id: 'DEC-103',
			title: 'Switch Payment Provider to Stripe',
			status: 'In Review',
			date: '2023-10-22',
			author: 'Mike Ross',
			context: 'Current provider has high failure rates in EU region.',
			tradeoffs: 'Higher fees per transaction (2.9% vs 2.5%) but expected 10% lift in conversion.',
			stakeholders: ['Finance', 'Engineering']
		},
		{
			id: 'DEC-102',
			title: 'Sunset Legacy API v1',
			status: 'Approved',
			date: '2023-10-15',
			author: 'Jane Doe',
			context: 'Maintenance cost is too high, only 2% traffic remaining.',
			tradeoffs: 'Requires forced migration for 5 enterprise clients.',
			stakeholders: ['Engineering', 'Customer Success']
		}
	]);

	let searchQuery = $state('');
</script>

<div class="space-y-6">
	<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
		<div>
			<h2 class="text-lg font-semibold">Decision Context Memory</h2>
			<p class="text-sm text-muted-foreground">A searchable log of all product decisions, context, and tradeoffs.</p>
		</div>
		<button class="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-md text-sm font-medium transition-colors flex items-center gap-2">
			<Plus class="w-4 h-4" />
			Log Decision
		</button>
	</div>

	<div class="flex gap-4 items-center bg-card p-2 rounded-lg border border-border">
		<div class="relative flex-1">
			<Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
			<input 
				type="text" 
				placeholder="Search decisions (e.g., 'Why did we delay dark mode?')" 
				bind:value={searchQuery}
				class="w-full bg-transparent border-none pl-9 pr-4 py-2 text-sm focus:ring-0 placeholder:text-muted-foreground"
			/>
		</div>
		<div class="h-6 w-[1px] bg-border"></div>
		<button class="px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground flex items-center gap-2">
			<Filter class="w-4 h-4" />
			Filters
		</button>
	</div>

	<div class="space-y-4">
		{#each decisions as decision}
			<div class="bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all">
				<div class="p-5 border-b border-border/50">
					<div class="flex items-start justify-between gap-4">
						<div>
							<div class="flex items-center gap-3 mb-1">
								<span class="text-xs font-mono text-muted-foreground">{decision.id}</span>
								<span class={`px-2 py-0.5 rounded-full text-xs font-medium ${
									decision.status === 'Approved' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'
								}`}>
									{decision.status}
								</span>
							</div>
							<h3 class="text-lg font-semibold">{decision.title}</h3>
						</div>
						<div class="flex items-center gap-2 text-sm text-muted-foreground">
							<span>{decision.date}</span>
							<div class="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-foreground font-medium text-xs ml-2">
								{decision.author.split(' ').map(n => n[0]).join('')}
							</div>
						</div>
					</div>
				</div>
				
				<div class="p-5 bg-secondary/20 grid md:grid-cols-2 gap-6">
					<div class="space-y-2">
						<h4 class="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Context & Why</h4>
						<p class="text-sm leading-relaxed">{decision.context}</p>
					</div>
					<div class="space-y-2">
						<h4 class="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Tradeoffs</h4>
						<p class="text-sm leading-relaxed">{decision.tradeoffs}</p>
					</div>
				</div>

				<div class="px-5 py-3 bg-secondary/40 border-t border-border/50 flex items-center justify-between">
					<div class="flex items-center gap-2">
						<span class="text-xs text-muted-foreground">Stakeholders:</span>
						<div class="flex gap-1">
							{#each decision.stakeholders as stakeholder}
								<span class="px-2 py-0.5 rounded text-xs bg-background border border-border text-muted-foreground">
									{stakeholder}
								</span>
							{/each}
						</div>
					</div>
					<button class="text-xs font-medium text-primary hover:underline flex items-center gap-1">
						View in Jira <ExternalLink class="w-3 h-3" />
					</button>
				</div>
			</div>
		{/each}
	</div>
</div>
