from langchain_community.utilities import SQLDatabase
import os

##### Data Extraction Tools
from .sql import sql_list_table_tool, sql_get_schema_tool, sql_query_tool
from .name import search_name_tool

##### Data Analysis Tools
from .sandbox import python_jupyter_tool, r_jupyter_tool, julia_jupyter_tool

##### Literature Review
from .literature import search_literature_advanced_tool

tools = [
    sql_list_table_tool, sql_get_schema_tool, sql_query_tool, 
    search_name_tool, 
	python_jupyter_tool, r_jupyter_tool, julia_jupyter_tool,
    search_literature_advanced_tool
]

enabled_tools = [
    sql_list_table_tool, sql_get_schema_tool, sql_query_tool, search_name_tool,
    python_jupyter_tool, r_jupyter_tool, julia_jupyter_tool, 
    search_literature_advanced_tool
]