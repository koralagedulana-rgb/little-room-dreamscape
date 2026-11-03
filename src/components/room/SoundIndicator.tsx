export function SoundIndicator({ playing }: { playing: boolean }) {
  return (
    <span className="sound-indicator" data-playing={playing} role="img" aria-label={playing ? "Music playing" : "Music paused"}>
      <span /><span /><span /><span /><span />
    </span>
  );
}