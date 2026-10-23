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
