import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideQuillConfig } from 'ngx-quill';

import { routes } from './router/app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    // Même configuration (toolbar + formats) que TDAppy_front : le HTML produit ici doit être
    // structuré à l'identique de celui que l'utilisateur final verra sur l'article.
    provideQuillConfig({
      modules: {
        toolbar: [['bold', 'italic', 'underline', 'strike'], ['blockquote'], ['link']],
        clipboard: {
          matchVisual: false,
        },
      },
      formats: ['bold', 'italic', 'underline', 'strike', 'blockquote', 'link', 'header'],
    }),
  ],
};
