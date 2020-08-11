from datetime import datetime as Datetime
from time import sleep
import traceback

from rediscluster import RedisCluster

startup_nodes = [
    {"host" : "127.0.0.1", "port" : 6379},
    {"host" : "127.0.0.1", "port" : 16379},
    {"host" : "127.0.0.1", "port" : 26379},
    {"host" : "127.0.0.1", "port" : 36379},
    {"host" : "127.0.0.1", "port" : 46379},
    {"host" : "127.0.0.1", "port" : 56379}
]

rc = RedisCluster(startup_nodes=startup_nodes, decode_responses=True)

for i in range(5000):
    try:
        msg = str(Datetime.now())
        rc.set(i, msg)
        sleep(1)
        print(f'Key: {i}; Message: {rc.get(i)}')
        sleep(1)
    except Exception as ex:
        traceback.print_exc()


