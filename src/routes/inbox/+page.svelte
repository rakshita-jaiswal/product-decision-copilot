<script lang="ts">
	import { Inbox, AlertCircle, Bug, Lightbulb, Zap, MoreHorizontal, Check, X } from 'lucide-svelte';

	let requests = $state([
		{ 
			id: 1, 
			title: "Add dark mode support", 
			source: "Slack #feedback", 
			requester: "Enterprise Client A", 
			type: "Feature", 
			urgency: "High",
			tags: ["VIP", "UI/UX"],
			description: "Client A is requesting dark mode for their night shift operators."
		},
		{ 
			id: 2, 
			title: "Login page timeout error", 
			source: "Support Email", 
			requester: "User 492", 
			type: "Bug", 
			urgency: "Critical",
			tags: ["Auth", "Stability"],
			description: "Users are getting timed out immediately after logging in."
		},
		{ 
			id: 3, 
			title: "Integration with Salesforce", 
			source: "Sales Call", 
			requester: "Sales Team", 
			type: "Strategic", 
			urgency: "Medium",
			tags: ["Integration", "Q3 Goal"],
			description: "Sales team says this is a blocker for 2 deals."
		},
		{ 
			id: 4, 
			title: "Update copyright year in footer", 
			source: "Internal", 
			requester: "Marketing", 
			type: "Tech Debt", 
			urgency: "Low",
			tags: ["Quick Win"],
			description: "Footer still says 2023."
		}
	]);

	function getTypeIcon(type) {
		switch (type) {
			case 'Bug': return Bug;
			case 'Feature': return Lightbulb;
			case 'Strategic': return Zap;
			default: return Inbox;
		}
	}

	function getTypeColor(type) {
		switch (type) {
			case 'Bug': return 'text-red-500 bg-red-500/10';
			case 'Feature': return 'text-blue-500 bg-blue-500/10';
			case 'Strategic': return 'text-purple-500 bg-purple-500/10';
			default: return 'text-gray-500 bg-gray-500/10';
		}
	}
</script>

<div class="space-y-6">
	<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
		<div>
			<h2 class="text-lg font-semibold">Smart Feature Intake</h2>
			<p class="text-sm text-muted-foreground">Review and categorize incoming requests from various channels.</p>
		</div>
		<div class="flex gap-2">
			<button class="px-4 py-2 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-md text-sm font-medium transition-colors">
				Sync Sources
			</button>
			<button class="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-md text-sm font-medium transition-colors">
				Add Request
			</button>
		</div>
	</div>

	<div class="grid gap-4">
		{#each requests as request}
			{@const SvelteComponent = getTypeIcon(request.type)}
			<div class="group relative bg-card border border-border rounded-xl p-5 hover:border-primary/50 transition-all duration-200 shadow-sm">
				<div class="flex flex-col sm:flex-row gap-4 justify-between items-start">
					<div class="flex gap-4 items-start flex-1">
						<div class={`p-2.5 rounded-lg ${getTypeColor(request.type)}`}>
							<SvelteComponent class="w-5 h-5" />
						</div>
						<div class="space-y-1">
							<div class="flex items-center gap-2 flex-wrap">
								<h3 class="font-medium text-base">{request.title}</h3>
								{#if request.urgency === 'Critical' || request.urgency === 'High'}
									<span class="px-2 py-0.5 rounded-full text-xs font-medium bg-red-500/10 text-red-500 border border-red-500/20">
										{request.urgency}
									</span>
								{/if}
								{#each request.tags as tag}
									<span class="px-2 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground border border-border">
										{tag}
									</span>
								{/each}
							</div>
							<p class="text-sm text-muted-foreground line-clamp-2">{request.description}</p>
							<div class="flex items-center gap-4 pt-2 text-xs text-muted-foreground">
								<span class="flex items-center gap-1">
									<Inbox class="w-3 h-3" /> {request.source}
								</span>
								<span class="w-1 h-1 rounded-full bg-border"></span>
								<span>Requested by <span class="text-foreground font-medium">{request.requester}</span></span>
							</div>
						</div>
					</div>

					<div class="flex sm:flex-col gap-2 w-full sm:w-auto">
						<button class="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">
							<Check class="w-4 h-4" />
							<span class="sm:hidden">Approve</span>
							<span class="hidden sm:inline">Draft Ticket</span>
						</button>
						<button class="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-md text-sm font-medium hover:bg-secondary/80 transition-colors">
							<X class="w-4 h-4" />
							<span>Dismiss</span>
						</button>
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>
