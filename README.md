# HTML to JSX Converter

A React web app that instantly converts HTML/text content into JSX/React code.

## Features

✨ **Easy HTML to JSX Conversion** - Paste HTML and get clean JSX output
📦 **Component Wrapping** - Automatically wrap converted code in a React component
⚙️ **Customizable Component Names** - Set your own component name
📋 **Copy to Clipboard** - Copy converted JSX with a single click
📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
🎨 **Beautiful UI** - Modern gradient design with smooth interactions

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/kprav33n97/html2jsx.git
cd html2jsx

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The build output will be in the `dist` folder.

## Usage

1. Paste your HTML code in the left input area
2. (Optional) Toggle "Wrap in component" to auto-wrap in a React component
3. (Optional) Change the component name if wrapped
4. Click "Convert to JSX"
5. Copy the converted JSX to your clipboard

## Features Explained

### HTML to JSX Attributes
- `class` → `className`
- `for` → `htmlFor`
- `style="color: red;"` → `style={{color: "red"}}`
- And many more HTML to JSX attribute mappings

### Component Wrapping
When enabled, wraps your JSX in a React functional component template with proper imports.

## Live Demo

[Visit the live app](https://kprav33n97.github.io/html2jsx/)

## Technologies Used

- **React 18** - UI component library
- **Vite** - Fast build tool and dev server
- **JavaScript** - HTML parsing and conversion logic

## License

This project is open source and available under the MIT License.

## Contributing

Pull requests are welcome! Feel free to open an issue or submit a PR.

---

Made with ❤️ for React developers
