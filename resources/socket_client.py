"""This script creates a simple TCP client using Python's socket library. It establishes a connection to a server 
running on localhost at port 50055, sends a message "Hello World" to the server, and then waits to receive a response 
of up to 1024 bytes. Once the response is received, it is printed to the console. The socket is automatically closed 
after communication is complete."""
import socket

host = "localhost"
port = 50055

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    s.connect((host, port))
    print("Socket connected")
    s.sendall(b'Hello World')
    print("Sent 'Hello World'")
    data = s.recv(1024)

    print(data)
