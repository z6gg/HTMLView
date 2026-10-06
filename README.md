# HTMLView

Renders `.html` attachments as a live page right inside Discord, instead of having to open them in a browser.

It's a Vencord userplugin. One file. Drop it in and any `.html` file someone sends shows up as an embedded preview under the message.

## Install

Needs the same Vencord build setup as my other plugins. If you already have a `VencordBuild` folder from FileSizeBypass or similar:

```text
cd your VencordBuild/Vencord/src/userplugins/
git clone https://github.com/z6gg/HTMLView.git
cd ../../..
pnpm build && pnpm inject
```

Don't have one yet? Follow the Manual Install steps on FileSizeBypass, then come back here.

Don't move or delete the created folder afterwards.

## Notes

- Only kicks in for `.html` attachments under 2MB.
- Preview runs sandboxed (`allow-scripts allow-forms allow-popups`), but it's still rendering someone else's HTML. If a file looks sketchy, don't interact with it.
- If the plugin ever gets updated, `cd` into `src/userplugins/HTMLView` and:

```text
git pull
cd ../../..
pnpm build && pnpm inject
```

---

*Vibe coded with Claude Sonnet 5.*
