export function ProjectArtwork({ label }: { label: string }) {
    return (
        <div className="project-artwork" role="img" aria-label={label}>
            <div className="preview-window" aria-hidden="true">
                <div className="preview-toolbar">
                    <div className="preview-dots">
                        <i />
                        <i />
                        <i />
                    </div>
                    <span className="mono">jeampieer.tech</span>
                    <span>↗</span>
                </div>
                <div className="preview-content">
                    <span className="preview-label mono">JEAMPIEER.TECH</span>
                    <span className="preview-word">
                        Ideas.
                        <br />
                        Code.
                        <br />
                        <em>Orbit.</em>
                    </span>
                    <div className="preview-orbit">
                        <span>j.</span>
                    </div>
                    <div className="preview-bottom mono">
                        <span>ORBITAL SIGNAL</span>
                        <span>01 — ∞</span>
                    </div>
                </div>
            </div>
            <span className="artwork-coordinate mono" aria-hidden="true">
                EXPLORATION_001
            </span>
        </div>
    );
}
