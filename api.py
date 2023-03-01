import pymysql.cursors
from http.server import HTTPServer, BaseHTTPRequestHandler
import json
import urllib.parse

global connection
global cursor

class APIHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        if '?' in self.path:
            path, qs = self.path.split('?')
            params = urllib.parse.parse_qs(qs)
        else:
            path = self.path
        if path == '/users':
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            sql = "SELECT * FROM users;"
            if 'params' in locals():
                sql += "WHERE username='{}';".format(params['username'][0])
                cursor.execute(sql)
                users = cursor.fetchone()
            else:
                cursor.execute(sql)
                users = cursor.fetchall()
            self.wfile.write(json.dumps(users).encode())
            return
        if path == '/overdrafts':
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            sql = "SELECT * FROM overdrafts;"
            if 'params' in locals():
                sql += "WHERE username='{}';".format(params['username'][0])
            cursor.execute(sql)
            users = cursor.fetchall()
            self.wfile.write(json.dumps(users).encode())
            return
        if path == '/transfers':
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            sql = "SELECT * FROM transfers;"
            if 'params' in locals():
                if 'username' in params.keys():
                    sql += "WHERE origin='{}' OR destination='{}';".format(params['username'][0], params['username'][0])
            cursor.execute(sql)
            users = cursor.fetchall()
            self.wfile.write(json.dumps(users).encode())
            return
        else:
            self.send_response(404)
            return
    def do_POST(self):
        if self.path == '/users':
            content_len = int(self.headers.get('Content-Length', 0))
            post_body = self.rfile.read(content_len).decode()
            if post_body == '':
                self.send_error(400, "Empty request body")
                return
            data = json.loads(post_body)
            if 'username' not in data.keys() or 'password' not in data.keys():
                self.send_error(400, "Username or password not in request")
                return
            sql = "INSERT INTO users(username, password, balance) VALUES ('{}', '{}', 0)".format(data['username'], data['password'])
            cursor.execute(sql)
            self.send_response(201, "User created succesfully")
            return
        if self.path == '/overdrafts':
            content_len = int(self.headers.get('Content-Length', 0))
            post_body = self.rfile.read(content_len).decode()
            if post_body == '':
                self.send_error(400, "Empty request body")
                return
            data = json.loads(post_body)
            if 'username' not in data.keys() or 'amount' not in data.keys():
                self.send_error(400, "Username or amount not in request")
                return
            sql = "INSERT INTO overdrafts(username, amount, managed, approved) VALUES ('{}', {}, False, False)".format(data['username'], data['amount'])
            cursor.execute(sql)
            self.send_response(201, "Overdraft requested")
            return
        if self.path == '/transfers':
            content_len = int(self.headers.get('Content-Length', 0))
            post_body = self.rfile.read(content_len).decode()
            if post_body == '':
                self.send_error(400, "Empty request body")
                return
            data = json.loads(post_body)
            if 'origin' not in data.keys() or 'destination' not in data.keys() or 'amount' not in data.keys():
                self.send_error(400, "Origin, destination or amount not in request")
                return
            sql = "INSERT INTO transfers(origin, destination, amount) VALUES ('{}', {}, {})".format(data['origin'], data['destination'], data['amount'])
            cursor.execute(sql)
            self.send_response(201, "Transfer completed")
            return
        if self.path == '/approve':
            content_len = int(self.headers.get('Content-Length', 0))
            post_body = self.rfile.read(content_len).decode()
            if post_body == '':
                self.send_error(400, "Empty request body")
                return
            data = json.loads(post_body)
            if 'id' not in data.keys() or 'approval' not in data.keys():
                self.send_error(400, "Overdraft id or approval status not in request")
                return
            sql = "UPDATE overdrafts SET approved={} AND managed=True WHERE id={}".format(data['approved'], data['id'])
            cursor.execute(sql)
            if data['approved']:
                sql = "SELECT username, amount FROM overdrafts WHERE id={}".format(data['id'])
                cursor.execute(sql)
                username, amount = cursor.fetchone()
                sql = "SELECT balance FROM users WHERE username={}".format(username)
                cursor.execute(sql)
                balance = cursor.fetchone()
                sql = "UPDATE users SET balance={} WHERE username={}".format(balance + amount, username)
                cursor.execute(sql)
            self.send_response(203, "Overdraft managed")
            return
        if self.path == '/set-balance':
            content_len = int(self.headers.get('Content-Length', 0))
            post_body = self.rfile.read(content_len).decode()
            if post_body == '':
                self.send_error(400, "Empty request body")
                return
            data = json.loads(post_body)
            if 'username' not in data.keys() or 'balance' not in data.keys():
                self.send_error(400, "Username or new balance not in request")
                return
            sql = "UPDATE users SET balance={} WHERE username={}".format(data['balance'], data['username'])
            cursor.execute(sql)
            self.send_response(203, "Balance updated")
            return


connection = pymysql.connect(host='localhost',
                             user='dbuser',
                             password='insecurebank',
                             database='bank',
                             cursorclass=pymysql.cursors.DictCursor)
cursor = connection.cursor()
httpd = HTTPServer(('localhost', 8080), APIHandler)
httpd.serve_forever()
