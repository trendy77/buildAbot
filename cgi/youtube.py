#!/usr/bin/env python27

import requests
import json

# Make it a bit prettier..
print "-" * 30
print "Most Popular Videos on YouTube"
print "-" * 30

r = requests.get("http://gdata.youtube.com/feeds/api/standardfeeds/top_rated?v=2&alt=jsonc")
r.text

# Convert it to a Python dictionary
data = json.loads(r.text)

for item in data['data']['items']:

	print "Video Title: %s" % (item['title'])

    print "Video Category: %s" % (item['category'])

    print "Video ID: %s" % (item['id'])

    print "Video Rating: %f" % (item['rating'])

    print "Embed URL: %s" % (item['player']['default'])

    print

