# SmartLLD

SmartLLD is an AI-based low-level design (LLD) practice platform. It provides design problems, a coding workspace for submitting solutions, attempt history, and AI-powered evaluation feedback.

## Features

- Browse LLD practice problems and their requirements.
- Solve problems in the frontend coding editor.
- Submit attempts for AI-based evaluation.
- Review scores, feedback, and previous attempts.

## Project Structure

```text
SmartLLD/
├── backend/     # FastAPI API and AI evaluation services
└── frontend/    # React + Vite web application
```

## Prerequisites

- Git
- Node.js and npm
- Python 3.12 or newer
- A Gemini API key and PostgreSQL connection string for the backend

## Setup

### 1. Clone the repository

```bash
git clone <repository-url>
cd SmartLLD
```

### 2. Start the frontend

Open a terminal in the `frontend` directory:

```bash
cd frontend
npm i
npm run dev
```

The Vite development server will print the local frontend URL in the terminal.

### 3. Configure and start the backend

Open another terminal in the `backend` directory and create the environment file from the example:

```bash
cd backend
copy .env.example .env
```

On macOS or Linux, use `cp .env.example .env` instead.

Update `.env` with the required values:

```env
GEMINI_API_KEY=your-gemini-api-key
POSTGRES_URL=your-postgres-connection-string
```

Create and activate a virtual environment, then install the backend dependencies:

**Windows PowerShell:**

```powershell
python -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

**macOS/Linux:**

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

Run the backend from the `backend` directory:

```bash
uvicorn app.main:app
```

The API is available at `http://localhost:8000`. Interactive API documentation is available at `http://localhost:8000/docs`.

## API Endpoints

The backend server runs on port `8000`.

### Root

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/` | Check that the backend is running. |

### Problems

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/problems/` | List all available problems. |
| GET | `/problems/{problem_id}` | Get the details of a specific problem. |

### Attempts

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/attempts/` | Submit a solution attempt for evaluation. |
| GET | `/attempts/history` | Get the current attempt history. |

The `POST /attempts/` endpoint expects a JSON body:

```json
{
	"problem_id": "two-sum",
	"language": "python",
	"code": "class Solution:\n    pass"
}
```

### Evaluation

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/evaluation/{attempt_id}` | Get the score and feedback for an attempt. |

## API Response Models

- Problem list items include `id`, `title`, and `difficulty`.
- Problem details include `id`, `title`, `difficulty`, `description`, `requirements`, and optional `starter_code`.
- Submitted attempts return an `attempt_id` and `status`.
- Attempt history includes the attempt number, problem ID, score, creation time, and status.
- Evaluation results include the status, optional score, and optional feedback.

## Development Notes

Start both servers during development:

```text
Frontend: http://localhost:5173
Backend:  http://localhost:8000
```

The frontend is configured to use the backend at `http://localhost:8000`.


# AI Usage

## Overview

AI was used as an engineering assistant throughout the project to accelerate research, validate architectural decisions, and improve prompt design. Final implementation, architectural choices, and trade-off decisions were made after reviewing and evaluating the suggestions rather than accepting them blindly.

---

## 1. Technology Stack Selection

### AI Suggestion

AI suggested using **FastAPI** for the backend because of its excellent compatibility with the LangChain ecosystem, asynchronous support, automatic OpenAPI documentation, and clean architecture for REST APIs.

For the frontend, AI suggested **React** due to its component-based architecture and ecosystem support for developer tools such as Monaco Editor.

### Decision

These recommendations were accepted because they simplified the integration of AI evaluation while keeping the project modular and maintainable.

---

## 2. Code Editor Selection

### AI Suggestion

AI recommended integrating **Monaco Editor** instead of a basic textarea for code submissions.

### Decision

This suggestion was accepted because Monaco provides:

- Syntax highlighting
- Multiple language support
- Auto-completion
- Bracket matching
- Line numbering
- A familiar VS Code-like editing experience

Since learners spend most of their time writing code, improving the editing experience directly improves the overall learning experience.

---

## 3. AI Evaluation Strategy

### AI Suggestion

Instead of asking the LLM to simply score the submission, AI suggested designing a structured evaluation rubric.

### Decision

This approach was adopted.

The evaluator assesses the submission using dimensions such as:

- Requirement Understanding
- Class Responsibilities
- Abstraction
- Encapsulation
- Coupling
- Cohesion
- Extensibility
- Maintainability
- Naming

The model returns structured JSON containing:

- Overall score
- Category-wise scores
- Evidence
- Concerns
- Improvement suggestions

This provides actionable feedback instead of a generic AI response.

---

## 4. Backend Architecture

### AI Suggestion

AI proposed separating the application into multiple layers instead of placing business logic directly inside API routes.

### Decision

This architecture was adopted.

The backend follows a layered structure:

- Routers
- Services
- Repository
- Database
- AI Evaluation Layer

This separation improves maintainability, testability, and future extensibility.

---

## 5. Evaluation Abstraction

### AI Suggestion

AI suggested introducing an `Evaluator` interface instead of directly coupling the application to Gemini.

### Decision

This suggestion was accepted because it allows future support for additional evaluation mechanisms such as:

- Rule-based evaluation
- Human review
- Other LLM providers

without changing the overall practice workflow.

---
## 6. Prompt Engineering

AI assisted in refining the evaluation prompts used by the LLM. Multiple prompt iterations were explored to improve consistency and reduce subjective feedback.

The final prompt was designed to:

- Follow a fixed evaluation rubric
- Return structured JSON
- Provide evidence for each observation
- Explain concerns rather than only assigning scores
- Offer actionable suggestions for improvement

This resulted in more consistent and useful evaluations across different LLD solutions.
## Engineering Judgment

Although AI assisted with research, architecture discussions, prompt engineering, and design exploration, all major product decisions—including the MVP scope, user flow, domain model, evaluation workflow, API design, and trade-offs—were reviewed and selected based on the project requirements.

AI was treated as an engineering assistant rather than an automated code generator.