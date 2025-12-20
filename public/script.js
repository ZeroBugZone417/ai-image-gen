function download() {
  const url = document.getElementById('ytUrl').value;
  if (!url) {
    document.getElementById('msg').innerText = 'Paste a YouTube link';
    return;
  }
  window.location.href = `/ytmp3?url=${encodeURIComponent(url)}`;
}
