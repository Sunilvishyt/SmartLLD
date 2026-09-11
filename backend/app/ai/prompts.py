from langchain_core.prompts import ChatPromptTemplate

RUBRIC = [
    {
        "name": "Requirement Understanding",
        "description": "Did the candidate understand the requirements? Score 0-10"
    },
    {
        "name": "Class Design",
        "description": "Are the classes meaningful? Score 0-10"
    },
    {
        "name": "Responsibilities",
        "description": "Does every class own a single responsibility? Score 0-10"
    },
    {
        "name": "Relationships",
        "description": "Are inheritance/composition used appropriately? Score 0-10"
    },
    {
        "name": "Encapsulation",
        "description": "Score 0-10"
    },
    {
        "name": "Abstraction",
        "description": "Score 0-10"
    },
    {
        "name": "Coupling",
        "description": "Score 0-10"
    },
    {
        "name": "Cohesion",
        "description": "Score 0-10"
    },
    {
        "name": "Extensibility",
        "description": "Could new features be added easily? Score 0-10"
    },
    {
        "name": "Naming",
        "description": "Score 0-10"
    }
]

SYSTEM_PROMPT = """You are an expert Low-Level Design interviewer with over 15 years of experience.
Your job is NOT to determine whether there is only one correct solution.
Multiple valid designs may exist.
Your goal is to help the learner improve.
Always evaluate based on software engineering principles instead of personal preference.

Focus on:
- Responsibilities
- Encapsulation
- Coupling
- Cohesion
- Abstraction
- SOLID
- Extensibility
- Naming
- Maintainability

Do NOT criticize stylistic choices unless they reduce maintainability.
Always explain WHY something is good or bad.
Never invent requirements that were not present.

Every suggestion must contain:
1. What is wrong
2. Why it is wrong
3. How to improve
4. Expected benefit

Never deduct marks because the learner used a different design than you would.
Only deduct marks when there is engineering evidence.
Avoid subjective opinions.
Never recommend unnecessary design patterns (e.g. do not suggest Factory/Singleton unless needed).

If the solution is incomplete, evaluate only what exists. Do not assume missing code.
Clearly mention which parts were unavailable for evaluation.
"""

def build_evaluation_prompt() -> ChatPromptTemplate:
    user_template = """Problem:
{title}

---------------------------------

Requirements:
{requirements}

---------------------------------

Language:
{language}

---------------------------------

Candidate Submission:
{code}

---------------------------------

Evaluate according to the rubric below. Each category is worth 10 points.

Rubric:
{rubric}
"""
    
    prompt = ChatPromptTemplate.from_messages([
        ("system", SYSTEM_PROMPT),
        ("user", user_template)
    ])
    
    return prompt

def format_rubric() -> str:
    lines = []
    for index, item in enumerate(RUBRIC, 1):
        lines.append(f"{index}. {item['name']}\n{item['description']}\n---------------------------------")
    return "\n".join(lines)
