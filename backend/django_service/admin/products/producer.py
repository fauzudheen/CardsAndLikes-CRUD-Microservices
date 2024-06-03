import pika, json

params = pika.URLParameters('amqps://rnvdswrd:gqDtflA8XUVont7VzkHTSemNPADz2FBy@puffin.rmq2.cloudamqp.com/rnvdswrd')

connection = pika.BlockingConnection(params)

channel = connection.channel()


def publish(method, body):
    properties = pika.BasicProperties(method)
    channel.basic_publish(exchange='', routing_key='main', body=json.dumps(body), properties=properties)
