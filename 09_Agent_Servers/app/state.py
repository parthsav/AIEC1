from typing import Literal

from langgraph.graph import MessagesState

class HelpfulState(MessagesState):
    loop_count: int
    helpful: Literal["yes", "no"]