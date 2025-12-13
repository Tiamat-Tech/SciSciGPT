from langchain.hub import pull

tool_eval_prompt = pull("erzhuoshao/sciscigpt-tool-eval:3452c5e1")
visual_eval_prompt = pull("erzhuoshao/sciscigpt-visual-eval:4be9277a")
task_eval_prompt = pull("erzhuoshao/sciscigpt-task-eval:7d5d09e8")

research_manager_prompt = pull("erzhuoshao/sciscigpt_research_manager:84e9c6d5")

specialist_prompt_dict = {
    "literature_specialist": pull("erzhuoshao/sciscigpt_literature_specialist:d2b445d1"),
    "database_specialist": pull("erzhuoshao/sciscigpt_database_specialist:7a63ad88"),
    "analytics_specialist": pull("erzhuoshao/sciscigpt_analytics_specialist:ec0aefe0"),
}