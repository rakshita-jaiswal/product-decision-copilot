<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';
    import { appState } from "$lib/app-state.svelte";
    import AuthScreen from "$lib/components/auth-screen.svelte";
    import OnboardingFlow from "$lib/components/onboarding-flow.svelte";
	import { 
		LayoutDashboard, 
		Inbox, 
		GitPullRequest, 
		ListTodo, 
		Settings, 
		Search,
		Bell,
		Menu,
		X,
        LogOut
	} from 'lucide-svelte';
    import { fade } from 'svelte/transition';
    import { writable } from 'svelte/store';

	let { children } = $props();
	let isMobileMenuOpen = writable(false);

	const navigation = [
		{ name: 'Dashboard', href: '/', icon: LayoutDashboard },
		{ name: 'Feature Inbox', href: '/inbox', icon: Inbox },
		{ name: 'Decision Log', href: '/decisions', icon: GitPullRequest },
		{ name: 'Prioritization', href: '/prioritization', icon: ListTodo },
	];

	function updateMobileMenu() {
		isMobileMenuOpen.update(open => !open);
	}

	function toggleMobileMenu() {
		updateMobileMenu();
	}
</script>

{#if !$appState.isAuthenticated}
    <AuthScreen />
{:else}
    {#if !$appState.hasCompletedOnboarding}
        <OnboardingFlow />
    {/if}

    <div class="min-h-screen bg-background flex flex-col md:flex-row font-sans text-foreground {!$appState.hasCompletedOnboarding ? 'blur-sm pointer-events-none' : ''}" in:fade>
        <!-- Mobile Header -->
        <div class="md:hidden flex items-center justify-between p-4 border-b border-border bg-card">
            <div class="flex items-center gap-2 font-semibold text-lg">
                <div class="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">
                    P
                </div>
                <span>Product Copilot</span>
            </div>
            <button onclick={toggleMobileMenu} class="p-2 hover:bg-accent rounded-md">
                {#if $isMobileMenuOpen}
                    <X class="w-6 h-6" />
                {:else}
                    <Menu class="w-6 h-6" />
                {/if}
            </button>
        </div>

        <!-- Sidebar -->
        <aside class="{$isMobileMenuOpen ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-64 border-r border-border bg-card/50 backdrop-blur-xl fixed md:sticky top-0 h-[calc(100vh-65px)] md:h-screen z-50 transition-all duration-300">
            <div class="p-6 hidden md:flex items-center gap-3 font-bold text-xl tracking-tight">
                <div class="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/20">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
                </div>
                <span>Product Copilot</span>
            </div>

            <div class="px-4 py-2">
                <div class="relative">
                    <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input 
                        type="text" 
                        placeholder="Search decisions..." 
                        class="w-full bg-secondary/50 border-none rounded-xl pl-9 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground transition-all"
                    />
                </div>
            </div>

            <nav class="flex-1 px-4 py-4 space-y-1">
                {#each navigation as item}
                    <a 
                        href={item.href}
                        class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                        {$page.url.pathname === item.href 
                            ? 'bg-primary text-primary-foreground shadow-md shadow-primary/25' 
                            : 'text-muted-foreground hover:text-foreground hover:bg-accent'}"
                        onclick={() => updateMobileMenu()}
                    >
                        <item.icon class="w-4 h-4" />
                        {item.name}
                    </a>
                {/each}
            </nav>

            <div class="p-4 border-t border-border space-y-1">
                <button class="flex items-center gap-3 px-3 py-2.5 w-full rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
                    <Settings class="w-4 h-4" />
                    Settings
                </button>
                <button 
                    class="flex items-center gap-3 px-3 py-2.5 w-full rounded-xl text-sm font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                    onclick={() => appState.logout()}
                >
                    <LogOut class="w-4 h-4" />
                    Sign Out
                </button>
                
                <div class="mt-4 flex items-center gap-3 px-3 pt-2">
                    <div class="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-medium text-sm shadow-md">
                        {$appState.user?.name?.charAt(0) || 'U'}
                    </div>
                    <div class="flex flex-col">
                        <span class="text-sm font-medium">{$appState.user?.name || 'User'}</span>
                        <span class="text-xs text-muted-foreground">Product Manager</span>
                    </div>
                </div>
            </div>
        </aside>

        <!-- Main Content -->
        <main class="flex-1 min-w-0 overflow-auto bg-slate-50/50">
            <header class="hidden md:flex items-center justify-between px-8 py-6 border-b border-border/40 bg-white/50 backdrop-blur-sm sticky top-0 z-10">
                <h1 class="text-2xl font-semibold tracking-tight">
                    {#if $page.url.pathname === '/'}
                        Dashboard
                    {:else if $page.url.pathname === '/inbox'}
                        Feature Inbox
                    {:else if $page.url.pathname === '/decisions'}
                        Decision Log
                    {:else if $page.url.pathname === '/prioritization'}
                        Prioritization
                    {/if}
                </h1>
                <div class="flex items-center gap-4">
                    <button class="relative p-2 hover:bg-accent rounded-full transition-colors">
                        <Bell class="w-5 h-5 text-muted-foreground" />
                        <span class="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full border-2 border-background"></span>
                    </button>
                </div>
            </header>
            <div class="p-4 md:p-8 max-w-7xl mx-auto">
                {@render children()}
            </div>
        </main>
    </div>
{/if}
