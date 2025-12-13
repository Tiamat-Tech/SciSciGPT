from typing import Any, List, Annotated, Dict, Any, TypedDict, Literal
from langchain_core.messages import AIMessage, HumanMessage, ToolMessage, AnyMessage
from typing_extensions import Annotated
from langgraph.graph import add_messages
from langchain_core.language_models import BaseChatModel


class AgentState(TypedDict):
	messages: Annotated[list[AnyMessage], add_messages]
	messages_str: str
	metadata: Dict[str, Any]
	current: str
	next: str