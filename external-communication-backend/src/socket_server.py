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