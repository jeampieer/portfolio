import "@/app/globals.css";
import Link from "next/link";

export default function GlobalNotFound() {
    return (
        <html lang="es">
            <body>
                <main className="not-found container">
                    <p className="eyebrow">404 / SIGNAL LOST</p>
                    <h1>Esta señal no llegó.</h1>
                    <p>La página que buscas no está en esta órbita.</p>
                    <Link className="button button-primary" href="/es">
                        Volver al inicio / Back to home
                    </Link>
                </main>
            </body>
        </html>
    );
}
