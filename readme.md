# Redis Cluster Dumb Tests

Repo that contains write/read commands for Redis Cluster of vairous clients to test Redis Cluster failover.

## Tests

Approach is very simple:

1. Initialize a counter with 0.
2. Write a message to Redis cluster with the key == counter and value == current date.
3. Sleep.
4. Get a message from Redis cluster with the key == counter.
5. Sleep and increment the counter by 1.
6. Go to \#2

While test script is running, you may turn off one of the Redis master (by stopping the container or by turning network off or by other means) and check how client behaves.

## Docker Environment

For convenience repo contains docker-compose file that deploys Redis Cluster (3 + 3)

Up Redis Cluster execute:

```
docker-compose -f docker-compose-rediscluster.yaml up -d
```

Stop/start Redis Cluster node:

```
docker-compose -f docker-compose-rediscluster.yaml stop redis-node-<X>
docker-compose -f docker-compose-rediscluster.yaml start redis-node-<X>
```

Get Redis Cluster status:

```
docker-compose -f docker-compose-rediscluster.yaml exec redis-cli cluster info
```

Destroy Redis Cluster:

```
docker-compose -f docker-compose-rediscluster.yaml down -v
```

## Clients

### Python

- redis-py-cluster

```
cd redis-py-cluster
pip install -r requirements.txt
python rediscluster_failover_test.py 
```

### Node.js

- ioredis

```
cd ioredis
npm install
npm start
```
