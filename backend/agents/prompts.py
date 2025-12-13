from langchain.hub import pull

tool_eval_prompt = pull("erzhuoshao/sciscigpt-tool-eval:3452c5e1")
visual_eval_prompt = pull("erzhuoshao/sciscigpt-visual-eval:4be9277a")
task_eval_prompt = pull("erzhuoshao/sciscigpt-task-eval:7d5d09e8")

research_manager_prompt = pull("erzhuoshao/sciscigpt_research_manager:latest")

specialist_prompt_dict = {
    "literature_specialist": pull("erzhuoshao/sciscigpt_literature_specialist:latest"),
    "database_specialist": pull("erzhuoshao/sciscigpt_database_specialist:latest"),
    "analytics_specialist": pull("erzhuoshao/sciscigpt_analytics_specialist:latest"),
}