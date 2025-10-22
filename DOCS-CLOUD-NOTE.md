Cloud-Only Documentation Note

This repository has moved to a cloud-first architecture. The app stores all files and application state on Filestack CDN. References in older documentation to "persistent storage", "IndexedDB", or "localStorage" refer to a prior design and are now deprecated.

Key points:

- All files (images, videos, audio) are uploaded to Filestack CDN.
- The `data` state object is saved to Filestack as a JSON state file.
- localStorage is used only for minimal configuration: API keys, policy/signature, cloud state pointers.
- Any mention of IndexedDB or persistent/local storage in older docs is historical and safe to ignore.

If you want, I can clean up the README in-place to remove the deprecated sections, but because the README includes duplicated and malformed sections, I recommend reviewing `DOCS-CLOUD-NOTE.md` as the authoritative current guidance and then later consolidating the README in a follow-up task.
