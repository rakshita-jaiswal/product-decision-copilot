<script lang="ts">
    import { appState } from "$lib/app-state.svelte";
    import { Button } from "$lib/components/ui/button";
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";
    import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "$lib/components/ui/card";
    import { fade, fly } from "svelte/transition";

    let isLogin: boolean = true;
    let email: string = "";
    let password: string = "";
    let name: string = "";
    let isLoading: boolean = false;
    let errorMessage: string = "";

    function handleSubmit(e: Event) {
        e.preventDefault();
        isLoading = true;
        errorMessage = "";

        // Use appState register/login which validates against localStorage
        if (isLogin) {
            const res = appState.login(email, password)
            if (!res?.success) {
                errorMessage = res?.message || 'Sign in failed'
                isLoading = false
                return
            }
            isLoading = false
            return
        }

        const res = appState.register(email, name || 'Product Manager', password)
        if (!res?.success) {
            errorMessage = res?.message || 'Sign up failed'
            isLoading = false
            return
        }
        isLoading = false
    }
</script>

<div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 p-4" in:fade>
    <div class="w-full max-w-md" in:fly={{ y: 20, duration: 800, delay: 200 }}>
        <div class="text-center mb-8">
            <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary text-primary-foreground mb-4 shadow-lg shadow-primary/30">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
            </div>
            <h1 class="text-3xl font-bold tracking-tight text-slate-900">Product Decision Copilot</h1>
            <p class="text-slate-500 mt-2">Make better product decisions, faster.</p>
        </div>

        <Card class="border-0 shadow-xl shadow-indigo-100/50 overflow-hidden">
            <CardHeader class="space-y-1 pb-6">
                <CardTitle class="text-2xl text-center">{isLogin ? 'Welcome back' : 'Create an account'}</CardTitle>
                <CardDescription class="text-center">
                    {isLogin ? 'Enter your credentials to access your workspace' : 'Enter your details to get started'}
                </CardDescription>
            </CardHeader>
            <CardContent>
                {#if errorMessage}
                    <div class="text-sm text-destructive mb-2">{errorMessage}</div>
                {/if}
                <form onsubmit={handleSubmit} class="space-y-4">
                    {#if !isLogin}
                        <div class="space-y-2" in:fly={{ y: -10, duration: 300 }}>
                            <Label for="name">Full Name</Label>
                            <Input id="name" bind:value={name} placeholder="Alice Product" required />
                        </div>
                    {/if}
                    <div class="space-y-2">
                        <Label for="email">Email</Label>
                        <Input id="email" type="email" bind:value={email} placeholder="alice@company.com" required />
                    </div>
                    <div class="space-y-2">
                        <Label for="password">Password</Label>
                        <Input id="password" type="password" bind:value={password} required />
                    </div>
                    
                    <Button type="submit" class="w-full h-11 text-base mt-6" disabled={isLoading}>
                        {#if isLoading}
                            <span class="animate-spin mr-2">⟳</span> {isLogin ? 'Signing in...' : 'Creating account...'}
                        {:else}
                            {isLogin ? 'Sign In' : 'Sign Up'}
                        {/if}
                    </Button>
                </form>
            </CardContent>
            <CardFooter class="flex flex-col space-y-4 bg-slate-50/50 pt-6">
                <div class="text-sm text-center text-slate-500">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                    <button 
                        class="text-primary font-medium hover:underline ml-1"
                        onclick={() => isLogin = !isLogin}
                    >
                        {isLogin ? 'Sign up' : 'Sign in'}
                    </button>
                </div>
            </CardFooter>
        </Card>
        
        <div class="mt-8 text-center text-xs text-slate-400">
            &copy; 2025 Product Decision Copilot. All rights reserved.
        </div>
    </div>
</div>
