import logging

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)-8s | %(name)s | %(message)s",
    datefmt="%H:%M:%S",
)

from app import mcp

if __name__ == "__main__":
    mcp.run(transport="streamable-http")
