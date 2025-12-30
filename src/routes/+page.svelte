<script lang="ts">
	import { ArrowUpRight, TrendingUp, Users, AlertCircle, CheckCircle2, Clock } from 'lucide-svelte';
    import { Button } from "$lib/components/ui/button";
    import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "$lib/components/ui/card";

	const stats = [
		{ label: 'Pending Requests', value: '12', change: '+2', trend: 'up', icon: Clock, color: "text-orange-500", bg: "bg-orange-50" },
		{ label: 'Decisions Made', value: '84', change: '+12%', trend: 'up', icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-50" },
		{ label: 'Active Features', value: '6', change: 'On track', trend: 'neutral', icon: TrendingUp, color: "text-blue-500", bg: "bg-blue-50" },
		{ label: 'Stakeholders', value: '24', change: 'Active', trend: 'neutral', icon: Users, color: "text-indigo-500", bg: "bg-indigo-50" },
	];

	const recentDecisions = [
		{ title: 'Deprioritize Dark Mode for Q1', author: 'Sarah J.', date: '2h ago', status: 'Approved', impact: 'High' },
		{ title: 'Switch to Stripe Connect', author: 'Mike R.', date: '5h ago', status: 'Review', impact: 'Critical' },
		{ title: 'Update Mobile Navigation', author: 'Jane D.', date: '1d ago', status: 'Approved', impact: 'Medium' },
        { title: 'Q3 Roadmap Finalization', author: 'Alex K.', date: '2d ago', status: 'Pending', impact: 'High' },
	];

	const topRiceItems = [
		{ title: 'One-click Checkout', score: 720, reach: 1000, impact: 3, confidence: 0.8, effort: 4 },
		{ title: 'User Analytics Dashboard', score: 540, reach: 500, impact: 2, confidence: 0.9, effort: 6 },
		{ title: 'Email Notifications', score: 480, reach: 800, impact: 1, confidence: 0.9, effort: 2 },
	];
</script>

<div class="space-y-8">
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
            <h2 class="text-lg font-medium text-slate-500">Overview</h2>
            <p class="text-sm text-slate-400">Track your product velocity and impact.</p>
        </div>
        <div class="flex gap-2">
            <Button variant="outline" class="bg-white">Export Report</Button>
            <Button class="bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20">
                <span class="mr-2">+</span> New Decision
            </Button>
        </div>
    </div>

	<!-- Stats Grid -->
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
		{#each stats as stat}
			<div class="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all duration-200 group">
				<div class="flex items-center justify-between mb-4">
					<span class="text-sm text-slate-500 font-medium">{stat.label}</span>
					<div class={`p-2 rounded-lg ${stat.bg}`}>
                        <stat.icon class={`w-4 h-4 ${stat.color}`} />
                    </div>
				</div>
				<div class="flex items-end justify-between">
					<span class="text-3xl font-bold tracking-tight text-slate-900">{stat.value}</span>
					<span class="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-100">
						{stat.change}
					</span>
				</div>
			</div>
		{/each}
	</div>

	<div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
		<!-- Recent Decisions -->
		<div class="lg:col-span-2 space-y-4">
			<div class="flex items-center justify-between">
				<h2 class="text-lg font-semibold text-slate-800">Recent Decisions</h2>
				<a href="/decisions" class="text-sm text-primary hover:underline flex items-center gap-1 font-medium">
					View all <ArrowUpRight class="w-3 h-3" />
				</a>
			</div>
			<Card class="border-0 shadow-sm bg-white overflow-hidden">
                <CardContent class="p-0">
                    {#each recentDecisions as decision, i}
                        <div class="p-5 flex items-center justify-between hover:bg-slate-50 transition-colors {i !== recentDecisions.length - 1 ? 'border-b border-slate-100' : ''}">
                            <div class="flex items-start gap-4">
                                <div class="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-sm font-bold text-indigo-600 border border-indigo-100">
                                    {decision.author.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div>
                                    <h3 class="font-semibold text-sm text-slate-900">{decision.title}</h3>
                                    <p class="text-xs text-slate-500 mt-1">by {decision.author} • {decision.date}</p>
                                </div>
                            </div>
                            <div class="flex items-center gap-3">
                                <span class="px-3 py-1 rounded-full text-xs font-medium border
                                    {decision.status === 'Approved' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                                     decision.status === 'Review' ? 'bg-amber-50 text-amber-600 border-amber-100' : 
                                     'bg-slate-100 text-slate-600 border-slate-200'}">
                                    {decision.status}
                                </span>
                            </div>
                        </div>
                    {/each}
                </CardContent>
			</Card>
		</div>

		<!-- Top Priorities -->
		<div class="space-y-4">
			<div class="flex items-center justify-between">
				<h2 class="text-lg font-semibold text-slate-800">Top Priorities (RICE)</h2>
				<a href="/prioritization" class="text-sm text-primary hover:underline flex items-center gap-1 font-medium">
					View all <ArrowUpRight class="w-3 h-3" />
				</a>
			</div>
			<div class="space-y-3">
				{#each topRiceItems as item}
					<div class="p-5 rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-md hover:border-indigo-100 transition-all duration-200 group cursor-pointer">
						<div class="flex items-center justify-between mb-3">
							<h3 class="font-semibold text-sm truncate pr-4 text-slate-800 group-hover:text-indigo-600 transition-colors">{item.title}</h3>
							<span class="text-lg font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">{item.score}</span>
						</div>
						<div class="grid grid-cols-4 gap-2 text-xs text-slate-500">
							<div class="flex flex-col items-center p-1 rounded bg-slate-50">
								<span class="font-bold text-slate-700">{item.reach}</span>
								<span class="text-[10px] uppercase tracking-wider mt-0.5">Reach</span>
							</div>
							<div class="flex flex-col items-center p-1 rounded bg-slate-50">
								<span class="font-bold text-slate-700">{item.impact}</span>
								<span class="text-[10px] uppercase tracking-wider mt-0.5">Imp</span>
							</div>
							<div class="flex flex-col items-center p-1 rounded bg-slate-50">
								<span class="font-bold text-slate-700">{item.confidence * 100}%</span>
								<span class="text-[10px] uppercase tracking-wider mt-0.5">Conf</span>
							</div>
							<div class="flex flex-col items-center p-1 rounded bg-slate-50">
								<span class="font-bold text-slate-700">{item.effort}</span>
								<span class="text-[10px] uppercase tracking-wider mt-0.5">Eff</span>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>
