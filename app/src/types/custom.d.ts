// Type declarations for custom attributes

declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    'data-cursor-text'?: string;
  }
}

export {};
