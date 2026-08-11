import { addMessageAccessory, removeMessageAccessory } from "@api/MessageAccessories";
import definePlugin from "@utils/types";
import { useEffect, useState } from "@webpack/common";
import type { Message } from "discord-types/general";

const MAX_SIZE = 2 * 1024 * 1024; // 2MB safety cap

function HtmlPreview({ url }: { url: string; }) {
    const [content, setContent] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;
        fetch(url)
            .then(r => r.text())
            .then(text => { if (!cancelled) setContent(text); })
            .catch(() => { if (!cancelled) setContent(null); });
        return () => { cancelled = true; };
    }, [url]);

    if (content == null) return null;

    return (
        <iframe
            srcDoc={content}
            sandbox="allow-scripts allow-forms allow-popups"
            style={{
                width: "100%",
                height: "500px",
                border: "1px solid var(--background-modifier-accent)",
                borderRadius: "8px",
                background: "#fff",
                marginTop: "4px"
            }}
        />
    );
}

export default definePlugin({
    name: "HTMLView",
    description: "Renders .html attachments as a live page inline, instead of having to open them in a browser",
    authors: [{ name: "You", id: 0n }],
    dependencies: ["MessageAccessoriesAPI"],

    start() {
        addMessageAccessory("HTMLView", props => {
            const attachments = (props.message as Message)?.attachments ?? [];
            const htmlFiles = attachments.filter(
                a => a.filename?.toLowerCase().endsWith(".html") && a.size < MAX_SIZE
            );
            if (!htmlFiles.length) return null;

            return (
                <>
                    {htmlFiles.map(file => (
                        <HtmlPreview key={file.id} url={file.url} />
                    ))}
                </>
            );
        });
    },

    stop() {
        removeMessageAccessory("HTMLView");
    }
});
