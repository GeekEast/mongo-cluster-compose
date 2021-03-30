rs.initiate()
rs.add('node-a:27017')
rs.add('node-b:27017')

cfg = rs.conf();
cfg.members[1].priority = 0;
cfg.members[1].hidden = true;
cfg.members[1].slaveDelay = 10; //seconds
rs.reconfig(cfg);