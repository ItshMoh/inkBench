import Link from "next/link"
import { ImageIllustration } from "../components/image-illustrations"

export function HeroSection() {
    return (
        <section>
            <div className="py-24 md:pt-32 lg:pt-44">
                <div className="mx-auto mb-12 max-w-5xl px-6">
                    <ImageIllustration />
                    <div className="relative mt-6 grid items-end gap-6 md:-mt-12 md:grid-cols-2">
                        <h1 className="text-balance text-4xl font-semibold sm:text-5xl lg:text-6xl">Roots of your PolkaVM Smart Contracts</h1>
                        <div className="space-y-6 pt-20">
                            <p className="text-muted-foreground text-balance text-lg">Deploy and profile PolkaVM smart contracts with InkBench. Test Ink! and Solidity contracts in-memory, measure gas consumption, and optimize performance without running a full blockchain node.</p>
                            <Link
                                href="/dashboard"
                                className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                            >
                                Start Benchmarking
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}