// Function to convert HTML attribute names to JSX (e.g., class -> className)
function convertAttrs(attrs) {
  const htmlToJsxAttrs = {
    'class': 'className',
    'for': 'htmlFor',
    'accesskey': 'accessKey',
    'contenteditable': 'contentEditable',
    'crossorigin': 'crossOrigin',
    'datetime': 'dateTime',
    'formaction': 'formAction',
    'formenctype': 'formEncType',
    'formmethod': 'formMethod',
    'formnovalidate': 'formNoValidate',
    'formtarget': 'formTarget',
    'maxlength': 'maxLength',
    'mediagroup': 'mediaGroup',
    'novalidate': 'noValidate',
    'radiogroup': 'radioGroup',
    'readonly': 'readOnly',
    'spellcheck': 'spellCheck',
    'srcdoc': 'srcDoc',
    'srcset': 'srcSet',
    'tabindex': 'tabIndex',
    'usemap': 'useMap'
  };

  let result = '';
  
  for (const [key, value] of Object.entries(attrs)) {
    const jsxKey = htmlToJsxAttrs[key.toLowerCase()] || key;
    
    if (key.toLowerCase() === 'style') {
      // Convert style string to object
      const styleObj = {};
      value.split(';').forEach(style => {
        const [prop, val] = style.split(':');
        if (prop && val) {
          const camelCase = prop.trim().replace(/-([a-z])/g, g => g[1].toUpperCase());
          styleObj[camelCase] = val.trim();
        }
      });
      result += ` style={${JSON.stringify(styleObj)}}`;
    } else {
      result += ` ${jsxKey}="${value}"`;
    }
  }
  
  return result;
}

// Simple HTML parser - converts HTML string to JSX
export function htmlToJsx(htmlString) {
  if (!htmlString || !htmlString.trim()) {
    return '';
  }

  let jsx = '';
  let i = 0;
  const len = htmlString.length;

  while (i < len) {
    // Check for opening tag
    if (htmlString[i] === '<') {
      const tagEnd = htmlString.indexOf('>', i);
      if (tagEnd === -1) {
        jsx += htmlString[i];
        i++;
        continue;
      }

      const tagContent = htmlString.substring(i + 1, tagEnd);
      
      // Check if it's a closing tag
      if (tagContent.startsWith('/')) {
        jsx += `</${tagContent.substring(1)}>`;
        i = tagEnd + 1;
      }
      // Check if it's a comment
      else if (tagContent.startsWith('!--')) {
        jsx += `{/* ${tagContent.substring(3, tagContent.length - 2)} */}`;
        i = tagEnd + 1;
      }
      // Check if it's a self-closing tag
      else if (tagContent.endsWith('/')) {
        const parts = tagContent.substring(0, tagContent.length - 1).trim().split(/\s+/);
        const tagName = parts[0];
        const attrsStr = parts.slice(1).join(' ');
        
        // Parse attributes
        const attrs = {};
        const attrRegex = /(\w+)\s*=\s*["']([^"']*)["']/g;
        let match;
        while ((match = attrRegex.exec(attrsStr)) !== null) {
          attrs[match[1]] = match[2];
        }
        
        jsx += `<${tagName}${convertAttrs(attrs)} />`;
        i = tagEnd + 1;
      }
      // Opening tag
      else {
        const parts = tagContent.trim().split(/\s+/);
        const tagName = parts[0];
        const attrsStr = parts.slice(1).join(' ');
        
        // Parse attributes
        const attrs = {};
        const attrRegex = /(\w+[-\w]*)\s*=\s*["']([^"']*)["']/g;
        let match;
        while ((match = attrRegex.exec(attrsStr)) !== null) {
          attrs[match[1]] = match[2];
        }
        
        jsx += `<${tagName}${convertAttrs(attrs)}>`;
        i = tagEnd + 1;
      }
    }
    // Text content
    else {
      let textEnd = htmlString.indexOf('<', i);
      if (textEnd === -1) {
        textEnd = len;
      }
      
      const text = htmlString.substring(i, textEnd).trim();
      if (text) {
        // Escape special characters
        const escaped = text
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/&amp;/g, '&')
          .replace(/"/g, '\\"');
        jsx += escaped;
      }
      i = textEnd;
    }
  }

  return jsx;
}

// Wrap JSX in a React component template
export function wrapInComponent(jsxCode, componentName = 'Component') {
  return `import React from 'react';

export default function ${componentName}() {
  return (
    <>
      ${jsxCode}
    </>
  );
}`;
}
