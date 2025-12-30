<script lang="ts">
    import { appState } from "$lib/app-state.svelte";
    import { Button } from "$lib/components/ui/button";
    import { Card } from "$lib/components/ui/card";
    import { fade, fly } from "svelte/transition";
    import { Check, ArrowRight, BarChart3, Users, Zap } from "lucide-svelte";

    let step: number = 0;
    
    const steps = [
        {
            title: "Welcome to your Copilot",
            description: "Your new AI-powered companion for making data-driven product decisions.",
            icon: Zap,
            color: "bg-yellow-100 text-yellow-600"
        },
        {
            title: "Connect your Data",
            description: "We integrate with Jira, Linear, and Amplitude to bring all your context into one place.",
            icon: BarChart3,
            color: "bg-blue-100 text-blue-600"
        },
        {
            title: "Collaborate with Team",
            description: "Invite your stakeholders to vote on priorities and provide feedback on decisions.",
            icon: Users,
            color: "bg-purple-100 text-purple-600"
        }
    ];

    function nextStep() {
        if (step < steps.length - 1) {
            step++;
        } else {
            appState.completeOnboarding();
        }
    }
</script>

<div class="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4" in:fade>
    <div class="w-full max-w-2xl">
        <div class="mb-8 flex justify-between items-center px-2">
            <div class="flex space-x-2">
                {#each steps as _, i}
                    <div 
                        class="h-2 rounded-full transition-all duration-500 ease-out {i <= step ? 'w-8 bg-primary' : 'w-2 bg-slate-200'}"
                    ></div>
                {/each}
            </div>
            <button class="text-sm text-slate-400 hover:text-slate-600" onclick={() => appState.completeOnboarding()}>
                Skip tutorial
            </button>
        </div>

        {#key step}
            <div in:fly={{ x: 20, duration: 400, delay: 100 }} out:fade={{ duration: 200 }} class="relative">
                <Card class="border-0 shadow-2xl overflow-hidden">
                    {@const currentStep = steps[step]}
                    {@const StepIcon = currentStep.icon}
                    <div class="grid md:grid-cols-2 min-h-[400px]">
                        <div class="p-8 flex flex-col justify-center space-y-6 bg-white">
                            <div class={`w-14 h-14 rounded-2xl flex items-center justify-center ${currentStep.color}`}>
                                <StepIcon size={28} />
                            </div>
                            
                            <div class="space-y-2">
                                <h2 class="text-2xl font-bold tracking-tight">{currentStep.title}</h2>
                                <p class="text-slate-500 leading-relaxed">
                                    {currentStep.description}
                                </p>
                            </div>

                            <div class="pt-4">
                                <Button onclick={nextStep} class="group">
                                    {step === steps.length - 1 ? "Get Started" : "Continue"}
                                    <ArrowRight class="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Button>
                            </div>
                        </div>
                        
                        <div class="bg-slate-50 p-8 flex items-center justify-center border-l border-slate-100">
                            <!-- Mock UI for each step -->
                            {#if step === 0}
                                <div class="relative w-full aspect-square max-w-[240px]">
                                    <div class="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-2xl shadow-lg opacity-20 animate-pulse"></div>
                                    <div class="absolute inset-4 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center">
                                        <Zap class="text-indigo-500 h-12 w-12" />
                                    </div>
                                    <div class="absolute -right-4 -bottom-4 bg-white p-3 rounded-lg shadow-lg border border-slate-100 animate-bounce">
                                        <div class="flex items-center space-x-2">
                                            <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                                            <span class="text-xs font-medium">AI Ready</span>
                                        </div>
                                    </div>
                                </div>
                            {:else if step === 1}
                                <div class="space-y-3 w-full max-w-[240px]">
                                    {#each ['Jira', 'Linear', 'Amplitude'] as tool}
                                        <div class="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-200 shadow-sm">
                                            <span class="font-medium text-sm">{tool}</span>
                                            <div class="h-5 w-9 bg-green-100 rounded-full flex items-center justify-end px-1">
                                                <div class="h-3 w-3 bg-green-500 rounded-full"></div>
                                            </div>
                                        </div>
                                    {/each}
                                </div>
                            {:else}
                                <div class="w-full max-w-[240px] space-y-4">
                                    <div class="flex -space-x-3 justify-center">
                                        {#each [1,2,3,4] as i}
                                            <div class="w-10 h-10 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-xs font-medium text-slate-600">
                                                U{i}
                                            </div>
                                        {/each}
                                        <div class="w-10 h-10 rounded-full border-2 border-white bg-indigo-100 flex items-center justify-center text-xs font-medium text-indigo-600">
                                            +5
                                        </div>
                                    </div>
                                    <div class="text-center text-xs text-slate-400">
                                        Team members ready to collaborate
                                    </div>
                                </div>
                            {/if}
                        </div>
                    </div>
                </Card>
            </div>
        {/key}
    </div>
</div>
