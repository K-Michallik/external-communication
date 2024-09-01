from fastapi import FastAPI, HTTPException
import uvicorn
import socket

app = FastAPI()
PORT = 50052


@app.get("/")
def root():
    return {"message": "Welcome to the simple External Communicator client"}


@app.get("/connect")
def connect_to_device(ip: str, port: int = 50051, message: str = "Hello world"):
    try:
        # Create a socket connection to the socket server
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            s.connect((ip, port))

            # Send the provided message to the socket server
            s.sendall(message.encode())

            # Receive the response from the socket server
            data = s.recv(1024)

            # Decode the received data and return as JSON response
            response = data.decode()
            return {"response": response}

    except ConnectionRefusedError:
        raise HTTPException(status_code=500, detail="Connection to the socket server refused.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        s.close()


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=PORT)
