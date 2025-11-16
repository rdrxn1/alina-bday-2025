# Birthday Desktop

This Vite + React project powers a retro desktop that celebrates Alina. The new Photos app lets you curate multi-photo "pages" using a JSON document so you can keep adding memories without touching the UI code.

## Editing the Photos app

1. **Add photo files** to `src/assets/photos`. The build automatically imports everything in that directory, so feel free to drop in JPG/PNG/WebP files (or keep the included placeholders).
2. **Describe pages** inside `src/data/photoPages.json`.

```jsonc
{
  "pages": [
    {
      "id": "sunrise",
      "title": "Sunrise playlist",
      "showTitle": true,
      "caption": "Snapshots of slow mornings and sleepy smiles.",
      "entries": [
        { "type": "text", "content": "A note that shows inside the layout." },
        { "type": "image", "file": "placeholder-aurora.svg", "alt": "Description" }
      ]
    }
  ]
}
```

- Set `showTitle` to `false` on a page if you want a clean, caption-only spread.
- Add as many `entries` as you need. Every `image` entry references a filename inside `src/assets/photos`, while `text` entries render as little notes inline with your pictures.

Whenever you save the JSON file or add/remove photo assets, the Photos window will automatically update with pagination controls.
