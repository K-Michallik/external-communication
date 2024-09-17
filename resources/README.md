# Resources for testing this sample
This folder contains additional resources for testing the external communication Polyscope X samples. It currently contains the following Python scripts:
- **socket_client.py** - A simple socket client to connect to the URCap's server running in a backend container. Change the IP and port as necessary.
- **socket_server.py** - A simple socket server which a URCap backend client can connect to. The IP should stay the same to listen on all interfaces that host's firewall permits. Change the port as necessary.