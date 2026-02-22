import { useState } from 'react';
import { htmlToJsx, wrapInComponent } from './htmlToJsx';

export default function App() {
  const [htmlInput, setHtmlInput] = useState('');
  const [jsxOutput, setJsxOutput] = useState('');
  const [componentName, setComponentName] = useState('MyComponent');
  const [wrapComponent, setWrapComponent] = useState(true);
  const [copied, setCopied] = useState(false);

  const handleConvert = () => {
    try {
      const converted = htmlToJsx(htmlInput);
      let output = converted;
      
      if (wrapComponent) {
        output = wrapInComponent(converted, componentName);
      }
      
      setJsxOutput(output);
    } catch (error) {
      setJsxOutput(`Error: ${error.message}`);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(jsxOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setHtmlInput('');
    setJsxOutput('');
  };

  return (
    <div className="container">
      <header className="header">
        <h1>🚀 HTML to JSX Converter</h1>
        <p>Convert your HTML markup to React JSX format instantly</p>
      </header>

      <div className="settings">
        <div className="setting-group">
          <label>
            <input
              type="checkbox"
              checked={wrapComponent}
              onChange={(e) => setWrapComponent(e.target.checked)}
            />
            Wrap in component
          </label>
        </div>
        
        {wrapComponent && (
          <div className="setting-group">
            <label htmlFor="componentName">Component name:</label>
            <input
              id="componentName"
              type="text"
              value={componentName}
              onChange={(e) => setComponentName(e.target.value)}
              placeholder="MyComponent"
              className="component-input"
            />
          </div>
        )}
      </div>

      <div className="editor-container">
        <div className="editor-section">
          <h2>HTML Input</h2>
          <textarea
            value={htmlInput}
            onChange={(e) => setHtmlInput(e.target.value)}
            placeholder="Paste your HTML here..."
            className="editor"
          />
        </div>

        <div className="button-group">
          <button onClick={handleConvert} className="btn btn-primary">
            Convert to JSX
          </button>
          <button onClick={handleClear} className="btn btn-secondary">
            Clear
          </button>
        </div>

        <div className="editor-section">
          <h2>JSX Output</h2>
          <textarea
            value={jsxOutput}
            readOnly
            placeholder="JSX output will appear here..."
            className="editor output"
          />
          {jsxOutput && (
            <button
              onClick={handleCopy}
              className={`btn btn-copy ${copied ? 'copied' : ''}`}
            >
              {copied ? '✓ Copied!' : 'Copy to Clipboard'}
            </button>
          )}
        </div>
      </div>

      <footer className="footer">
  <p>
     Made with ❤️ for React developers © {new Date().getFullYear()}
  </p>
</footer>
    </div>
  );
}
