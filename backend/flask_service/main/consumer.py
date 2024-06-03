import pika, json
from main import Product, db, app

params = pika.URLParameters('amqps://rnvdswrd:gqDtflA8XUVont7VzkHTSemNPADz2FBy@puffin.rmq2.cloudamqp.com/rnvdswrd')

connection = pika.BlockingConnection(params)

channel = connection.channel()

channel.queue_declare(queue='main')

def callback(ch, method, properties, body):
    print('Received in main')
    data = json.loads(body)

    with app.app_context():
        try:
            if properties.content_type == 'product_created':
                product = Product(id=data['id'], title=data['title'], image=data['image'])
                db.session.add(product)
                db.session.commit()
                print('Product Created')

            elif properties.content_type == 'product_updated':
                product = Product.query.get(data['id'])
                product.title = data['title']
                product.image = data['image']
                db.session.commit()
                print('Product Updated')

            elif properties.content_type == 'product_deleted':
                product = Product.query.get(data)
                db.session.delete(product)
                db.session.commit()
                print('Product Deleted')

        except Exception as e:
            print(f"Error: {e}")

channel.basic_consume(queue='main', on_message_callback=callback, auto_ack=True)

print('Started Consuming')

channel.start_consuming()

channel.close()