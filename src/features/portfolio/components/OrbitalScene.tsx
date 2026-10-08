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
                <div className="orbit-satellite satellite-one" />
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
