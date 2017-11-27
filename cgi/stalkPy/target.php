<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">

</head>
<body>

<form action="/cgi-bin/stalkPy/target.py" method="POST" target="_blank">

<input type="radio" name="active" value="On" /> ON
<input type="radio" name="active" value="Off" /> OFF
<br>

Target Name: <input type="text" name="tname"><br />
Target ID: <input type="text" name="tid" />

<input type="submit" value="Submit"/>
</form>