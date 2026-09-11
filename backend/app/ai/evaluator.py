from langchain_google_genai import ChatGoogleGenerativeAI
from app.config.settings import settings
from app.ai.prompts import build_evaluation_prompt, format_rubric
from app.ai.output_schema import EvaluationOutput

# Initialize LLM only if API key is present
llm = None
if settings.GEMINI_API_KEY:
    llm = ChatGoogleGenerativeAI(
        model="gemini-3.6-flash",
        google_api_key=settings.GEMINI_API_KEY,
        temperature=0.0
    )

async def evaluate_submission(title: str, requirements: str, language: str, code: str) -> EvaluationOutput:
    if not llm:
        raise ValueError("GEMINI_API_KEY is not set.")
    
    prompt = build_evaluation_prompt()
    rubric_text = format_rubric()
    
    # Use LangChain's structured output
    evaluator_chain = prompt | llm.with_structured_output(EvaluationOutput)
    
    result = await evaluator_chain.ainvoke({
        "title": title,
        "requirements": requirements,
        "language": language,
        "code": code,
        "rubric": rubric_text
    })
    
    return result
