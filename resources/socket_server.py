"""This script implements a simple TCP server using Python's socket library. The server binds to all available 
network interfaces on the machine (0.0.0.0) and listens on port 50051 for incoming connections. When a client 
connects, the server enters a loop where it receives data from the client and echoes it back. The connection is kept 
open until the client sends no more data, at which point the connection is closed, and the server continues to listen 
for new clients."""

import socket

HOST = '0.0.0.0'
PORT = 50051

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    s.bind((HOST, PORT))
    s.listen()
    print(f"Socket server is listening on {HOST}:{PORT}")

    while True:
        # Accept a new connection
        conn, address = s.accept()
        print('Connected by', address)
        with conn:
            while True:
                data = conn.recv(1024)
                if not data:
                    print(f"Connection closed by {address}")
                    break

                # Echo back the received data
                conn.sendall(data)
                print(f"Echoed back: {data.decode()}")
