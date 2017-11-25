# -*- coding: UTF-8 -*-
# pip install fbchat

from fbchat import Client
from fbchat.models import *


class MessageBotWatcher(Client):
	def onMessageDelivered(self, author_id, message, thread_id, thread_type, ts, *kwargs):
    # If you're the author
		if author_id != self.uid:
			print("Message you sent has been delivered! {} in {} ({}): {}".format(author_id, thread_id, thread_type.name, message))

client = MessageBotWatcher('trendy@three.com.au', 'Joker999')
client.listen()

# Fetches a list of the 20 top threads you're currently chatting with
threads = client.fetchThreadList()
# Fetches the next 10 threads
threads += client.fetchThreadList(offset=20, limit=10)
print("Threads: {}".format(threads))
# Gets the last 10 messages sent to the thread
messages = client.fetchThreadMessages(thread_id='<thread id>', limit=10)
# Since the message come in reversed order, reverse them
messages.reverse()
# Prints the content of all the messages
for message in messages:
  print(message.text)