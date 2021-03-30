## Create Mongo Cluster using Docker


### Set Replica Sync Delay
```javascript
// local/mongo/init-cluster.js
// ...
cfg.members[1].slaveDelay = 30; //seconds
// ...
```

### Replica Mode
- **create** stack
```sh
sh stack.sh build
```
- **destroy** stack
```sh
sh stack.sh destroy
```

### Accessing using Node.js
```sh
yarn                        # install deps
yarn initd                  # seed data via primary node
yarn index                  # query using secondary nodes
```

<!-- I will add the sharded version in future -->
