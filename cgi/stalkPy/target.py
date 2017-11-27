#!/usr/bin/env python27

import datetime
import os

import history
import fbapi
import status
	# Import modules for CGI handling 
import cgi, cgitb 
form = cgi.FieldStorage() 
   # Get data from fields
tname = form.getvalue('tname')
tid  = form.getvalue('tid')


# Get data from fields
# IS RUNNING?
if form.getvalue('active'):
   on_flag = "ON"
else:
   on_flag = "OFF"

# chosen from list?   
if form.getvalue('dropdown'):
   subject = form.getvalue('dropdown')
else:
   subject = "Not set"   
   
print "Content-type:text/html\r\n\r\n"
print "<html>"
print "<head>"
print "<title>Target Via Python</title>"
print "</head>"
print "<body>"
print "<h2>Hello user = %s</h2>" % (me)
print "<h2> PROGRAM IS CURRENTLY %s</h2>" % on_flag
print "<h3>Friends List:<h3>"
print "<form action='/cgi-bin/target.py' method='POST' target='target.py'>"
print "<h3>Friends List:</h3>"
print "<select name='dropdown'>"
for user in users:
  print "<option value=" + fbapi.get_user_name(user[users])+">"+ fbapi.get_user_name(user[users])+"</option>"
print "</select>"
print "<input type='submit' value='Submit'>"	
print "<h3>Target ID = %s</h3>" % (tid)
print "<h4>Target user = %s</h4>" % (tname)
print "</body>"
print "</html>"
