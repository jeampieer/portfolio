import Image from "next/image";
import { siteConfig } from "@/config/site";

export function OrbitalScene({ label, caption }: { label: string; caption: string }) {
    return (
        <div className="orbital-scene">
            <div className="scene-coordinate mono" aria-hidden="true">
                J.01 <span>∞</span>
            </div>
            <div className="orbital-art" aria-hidden="true">
                <div className="orbit-halo" />
                <div className="orbit orbit-outer" />
                <div className="orbit orbit-middle" />
                <div className="orbit orbit-inner" />
                <div className="orbital-core">
                    {siteConfig.portrait ? (
                        <Image
                            src={siteConfig.portrait}
                            alt=""
                            fill
                            sizes="(max-width: 640px) 240px, 320px"
                            loading="eager"
                            className="portrait"
                        />
                    ) : (
                        <>
                            <div className="core-grid" />
                            <span className="core-monogram">
                                j<span>.</span>
                            </span>
                            <span className="core-caption mono">HELLO, WORLD_</span>
                        </>
                    )}
                </div>
                <div className="hero-orbiter">
                    <svg className="hero-orbit-trail" viewBox="0 0 100 100" fill="none">
                        <path
                            d="M 37.6 1.56 A 50 50 0 0 1 50 0"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            vectorEffect="non-scaling-stroke"
                        />
                    </svg>
                    <div className="orbit-satellite satellite-one" />
                </div>
                <div className="orbit-satellite satellite-two" />
                <div className="orbit-cross cross-one">+</div>
                <div className="orbit-cross cross-two">+</div>
            </div>
            <div className="scene-tag mono">
                <span className="signal-dot" />
                {label}
            </div>
            <p className="scene-caption">{caption}</p>
        </div>
    );
}
