import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// TODO: PWA機能（オフラインでも、キャッシュによってWebページが見れる機能）がデフォルトで無効化されている
serviceWorker.unregister();
// PWA有効化　（開発中はキャッシュされると更新内容の確認が大変になるので無効化する）
// serviceWorker.register();
