# script-selector

Builds a CLI menu to select and run your NPM package.json scripts

## Install

```
npm i -D @gld5000-cli/script-selector
```

## Example Usage

### Import (.mjs)

```
import { runSelector } from '@gld5000-cli/script-selector'
```

### Run Script Selector

```
runSelector();
```

### Example package.json scripts (input)

```
"scripts": {
    "//batch:renamer": "Batch rename images to e.g. de-duplicate file names based on parent folders",
    "batch:renamer": "clear && node src/utils/file-scripts/imageProcessing/batchRename.mjs",
    "//image:object": "Create TypeScript image object files for use in codebase",
    "image:object": "clear && node src/utils/file-scripts/imageProcessing/batchImageObject.mjs",
    "//image:normalise": "Process images, converting png to jpg and appending dimensions to filenames ready for upload to SFCC",
    "image:normalise": "clear && node src/utils/file-scripts/imageProcessing/batchJpg.mjs",
    "//image:normalise:resize-even": "Resizes images to even sizes, converting png to jpg and appending dimensions to filenames ready for upload to SFCC",
    "image:normalise:resize-even": "clear && node src/utils/file-scripts/imageProcessing/batchJpgEven.mjs",
    "//frames-folder-animate-single": "Process one folder of images, converting png, jpg etc. to animated webp and mp4",
    "frames-folder-animate-single": "clear && node src/utils/file-scripts/imageProcessing/batchWebp.mjs",
    "//frames-folder-animate-multi": "Process multiple folders of images, converting png, jpg etc. to animated webp and mp4",
    "frames-folder-animate-multi": "clear && node src/utils/file-scripts/imageProcessing/batchWebpMulti.mjs"
  },
```

### Example Output

```
1. batch:renamer: Batch rename images to e.g. de-duplicate file names based on parent folders
2. image:object: Create TypeScript image object files for use in codebase
3. image:normalise: Process images, converting png to jpg and appending dimensions to filenames ready for upload
4. image:normalise:resize-even: Resizes images to even sizes, converting png to jpg and appending dimensions to filenames ready for upload
5. frames-folder-animate-single: Process one folder of images, converting png, jpg etc. to animated webp and mp4
6. frames-folder-animate-multi: Process multiple folders of images, converting png, jpg etc. to animated webp and mp4

Enter line number to select (default is batch:renamer: Batch rename images to e.g. de-duplicate file names based on parent folders):
```

## Supported Commands

- clear
- echo
- node [file]

### E.G.:

```
"clear && echo 'Hello' && node test.mjs"
```

## Update

```
npm update @gld5000-cli/script-selector
```

## Uninstall

```
npm uninstall @gld5000-cli/script-selector
```

## Execute Directly from NPM

```
npx @gld5000-cli/script-selector
```
