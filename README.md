### Simplified event Bus with node-nats-streaming

#### Configure environment variables into project (.env)
```
NATS_CLUSTER_ID=<ClusterId>
NATS_CLIENT_ID=<ClientId>
NATS_URL=<NatsUrl>
```

#### Connect into nats with wrapper

```js
  import crypto from 'crypto'

  import Nats, { Publisher, Subscriber } from './nats-event-bus'

  const start = async () => {
    const config = {
      clusterId: process.env.NATS_CLUSTER_ID,
      clientId: process.env.NATS_CLIENT_ID || crypto.randomBytes(10).toString('hex'),
      options: {
        url: process.env.NATS_URL
      }
    }

    await Nats.connect(config)
  }

```


#### Create an Publisher

```js
  import crypto from 'crypto'

  import Nats, { Publisher, Subscriber } from './nats-event-bus'

  const start = async () => {
    // ...conect into nats-streaming server

    const Model = "products"
    const Event = "update"
    const data = {
      body: {
        product: {
          id: 1,
          title: 'Title of publiduct'
        }
      }
    }

    Publisher.create().emit(model, Event, data)
  }

```


#### Create an Subscriber

```js
  import crypto from 'crypto'

  import Nats, { Publisher, Subscriber } from './nats-event-bus'

  const start = async () => {
    // ...conect into nats-streaming server

    const Model = "products"
    const Event = "update"
    const group = "products-service"
    
    const eventHandler = ({ event, data }, message) => {

      // Your login here ...


      // Ack Message
      message.ack();
    }, {
      queueGroupName: group
    }

    Subscriber.create().sub(Model, Event, eventHandler)  
  }

```