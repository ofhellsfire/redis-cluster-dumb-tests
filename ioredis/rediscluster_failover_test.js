var Redis = require("ioredis");

var cluster = new Redis.Cluster([
  {'host': '127.0.0.1', 'port': 6379},
  {'host': '127.0.0.1', 'port': 16379},
  {'host': '127.0.0.1', 'port': 26379},
  {'host': '127.0.0.1', 'port': 36379},
  {'host': '127.0.0.1', 'port': 46379},
  {'host': '127.0.0.1', 'port': 56379}
]);

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function bar(i) {
    try {
        await cluster.set(i, new Date())
        await sleep(1000)
        const val = await cluster.get(i)
        console.log(`Key: ${i}; Message: ${val}`)
        await sleep(1000)
    } catch (err) {
        console.error(err)
        throw err
    }
}

async function baz() {
    let i = 0
    while (true) {
        await bar(i)
        i++
    }
}

baz()

