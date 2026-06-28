// All audio files are pre-generated MP3s served from /audio/.
// No runtime API calls needed.
export function playKhmer(key) {
  const audio = new Audio(`${import.meta.env.BASE_URL}audio/${key}.mp3`);
  audio.play().catch(err => console.warn('Audio play failed:', err));
}
