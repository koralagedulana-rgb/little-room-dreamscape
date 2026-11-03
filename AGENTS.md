<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep room editing controls in the collapsible drawer on the builder route; the room stage remains independently interactive when the drawer is closed.
- Size the room canvas to the viewport and overlay the editing drawer instead of resizing the stage, so opening controls preserves the room layout.
- Personal frame photos use optional per-item image data in the existing device-local room save; resize uploads in the browser before saving and retain the previous photo if storage fails.
- Keep window artwork in a dedicated SVG component with instance-unique clipping IDs and a bundled outdoor image; preserve the catalog footprint so saved arrangements do not shift.
- Keep music playback in the room-level provider using the official browser-only YouTube iframe API; derive song metadata and indicators from player feedback so closing menus never interrupts music or falsely reports playback.
- Render fairy-light variants through shared artwork with optional per-item color in the existing room save; undefined colors keep a warm default so old arrangements remain compatible.
