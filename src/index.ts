import type { App } from 'vue';
import * as components from './components';
import './styles/main.css';

export * from './components';

export default {
    install(app: App) {
        for (const key in components) {
            app.component(key, (components as any)[key]);
        }
    }
};