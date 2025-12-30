<script lang="ts">
	import { Info, ArrowUpDown, Calculator } from 'lucide-svelte';

	let features = $state([
		{ id: 1, name: 'One-click Checkout', reach: 1000, impact: 3, confidence: 0.8, effort: 4 },
		{ id: 2, name: 'User Analytics Dashboard', reach: 500, impact: 2, confidence: 0.9, effort: 6 },
		{ id: 3, name: 'Email Notifications', reach: 800, impact: 1, confidence: 0.9, effort: 2 },
		{ id: 4, name: 'Social Login (Google/GitHub)', reach: 1200, impact: 2, confidence: 0.7, effort: 3 },
		{ id: 5, name: 'Advanced Reporting Export', reach: 200, impact: 3, confidence: 1.0, effort: 8 },
	]);

	function calculateRice(feature) {
		return Math.round((feature.reach * feature.impact * feature.confidence) / feature.effort);
	}

	let sortedFeatures = $derived([...features].sort((a, b) => calculateRice(b) - calculateRice(a)));
</script>

<div class="space-y-6">
	<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
		<div>
			<h2 class="text-lg font-semibold">Transparent RICE Baseline</h2>
			<p class="text-sm text-muted-foreground">Prioritize features based on Reach, Impact, Confidence, and Effort.</p>
		</div>
		<button class="px-4 py-2 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-md text-sm font-medium transition-colors flex items-center gap-2">
			<Calculator class="w-4 h-4" />
			Recalculate All
		</button>
	</div>

	<div class="rounded-xl border border-border bg-card overflow-hidden">
		<div class="overflow-x-auto">
			<table class="w-full text-sm text-left">
				<thead class="bg-secondary/50 text-muted-foreground font-medium border-b border-border">
					<tr>
						<th class="px-6 py-4 w-[30%]">Feature Name</th>
						<th class="px-4 py-4 text-center">
							<div class="flex items-center justify-center gap-1 cursor-help" title="How many users will this impact over a single quarter?">
								Reach <Info class="w-3 h-3" />
							</div>
						</th>
						<th class="px-4 py-4 text-center">
							<div class="flex items-center justify-center gap-1 cursor-help" title="3 = Massive, 2 = High, 1 = Medium, 0.5 = Low, 0.25 = Minimal">
								Impact <Info class="w-3 h-3" />
							</div>
						</th>
						<th class="px-4 py-4 text-center">
							<div class="flex items-center justify-center gap-1 cursor-help" title="1.0 = High confidence, 0.8 = Medium, 0.5 = Low">
								Confidence <Info class="w-3 h-3" />
							</div>
						</th>
						<th class="px-4 py-4 text-center">
							<div class="flex items-center justify-center gap-1 cursor-help" title="Person-months">
								Effort <Info class="w-3 h-3" />
							</div>
						</th>
						<th class="px-6 py-4 text-right font-bold text-foreground">RICE Score</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-border">
					{#each sortedFeatures as feature}
						<tr class="hover:bg-accent/50 transition-colors group">
							<td class="px-6 py-4 font-medium text-foreground">
								{feature.name}
								<div class="flex gap-2 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
									<button class="text-xs text-primary hover:underline">Edit</button>
									<button class="text-xs text-muted-foreground hover:text-foreground">View Details</button>
								</div>
							</td>
							<td class="px-4 py-4 text-center font-mono text-muted-foreground">{feature.reach}</td>
							<td class="px-4 py-4 text-center font-mono text-muted-foreground">{feature.impact}x</td>
							<td class="px-4 py-4 text-center font-mono text-muted-foreground">{feature.confidence * 100}%</td>
							<td class="px-4 py-4 text-center font-mono text-muted-foreground">{feature.effort} mo</td>
							<td class="px-6 py-4 text-right">
								<span class="inline-flex items-center justify-center min-w-[3rem] px-2 py-1 rounded-md bg-primary/10 text-primary font-bold">
									{calculateRice(feature)}
								</span>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>

	<div class="grid md:grid-cols-3 gap-4">
		<div class="p-4 rounded-lg border border-border bg-card/50">
			<h3 class="font-medium mb-2 text-sm">Reach Formula</h3>
			<p class="text-xs text-muted-foreground">
				Users per quarter. Pulls from analytics if integrated, otherwise manual estimate.
			</p>
		</div>
		<div class="p-4 rounded-lg border border-border bg-card/50">
			<h3 class="font-medium mb-2 text-sm">Impact Scale</h3>
			<p class="text-xs text-muted-foreground">
				3 = Massive, 2 = High, 1 = Medium, 0.5 = Low, 0.25 = Minimal. Based on adoption rates.
			</p>
		</div>
		<div class="p-4 rounded-lg border border-border bg-card/50">
			<h3 class="font-medium mb-2 text-sm">Confidence Score</h3>
			<p class="text-xs text-muted-foreground">
				Calculated based on requirements completeness (3 fields filled = 80%, etc).
			</p>
		</div>
	</div>
</div>
