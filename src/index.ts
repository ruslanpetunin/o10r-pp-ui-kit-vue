import type { App, FunctionPlugin } from 'vue';
import * as components from './components';
import './style.css';

export * from './components';

const connect: FunctionPlugin = (app: App) => {
  for (const key in components) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    app.component(key, (components as any)[key]);
  }
}

export default connect;
