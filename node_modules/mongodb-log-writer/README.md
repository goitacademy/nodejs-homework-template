# mongodb-log-writer

A library for writing MongoDB logv2 messages.

```js
import { MongoLogManager, mongoLogId } from 'mongodb-log-writer';

const manager = new MongoLogManager({
  directory: os.homedir() + '/.app-logs',
  retentionDays: 30,
  onwarn: console.warn,
  onerror: console.error,
  gzip: true
});
await manager.cleanupOldLogfiles();

const writer = manager.createLogWriter();
writer.info('component', mongoLogId(12345), 'context', 'message', { foo: 'bar' });
```

## LICENSE

Apache-2.0
