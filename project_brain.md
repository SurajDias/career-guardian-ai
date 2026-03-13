## Master Testing & Refinement Prompt

Act as a senior full-stack engineer and QA reviewer. Analyze the entire project (frontend, backend, configuration, and dependencies). Work through the project in strict phases and do not skip steps.

### Phase 1 — Project Understanding
Read the full repository structure and determine:
- frontend framework and build system
- backend framework and runtime
- API routes and data flow
- environment variables and configuration
- required dependencies and services

Explain how the system is expected to run locally.

### Phase 2 — Dependency & Environment Validation
Check if all dependencies required by the frontend and backend are declared correctly.  
Identify missing packages, incorrect versions, or environment variables.  
Provide exact installation or configuration commands where necessary.

### Phase 3 — Startup Verification
Attempt to start the backend and frontend independently.

Verify:
- backend server runs without errors
- frontend builds and runs successfully
- environment variables load correctly

If an error occurs:
- identify the root cause
- modify the exact file that must be changed
- show the corrected code block

### Phase 4 — API & Integration Testing
Test the connection between frontend and backend.

Check:
- API endpoints
- request/response formats
- CORS configuration
- error handling
- authentication if present

Fix any mismatch between frontend requests and backend responses.

### Phase 5 — Functional Testing
Simulate real user flows through the application.

Verify each core feature works end-to-end.

If a feature fails:
- diagnose the problem
- fix the logic or configuration
- explain the reasoning

### Phase 6 — Code Quality & Structure Review
Evaluate:
- folder structure
- modularity
- naming conventions
- separation of concerns
- unnecessary complexity

Refactor only when necessary and provide improved code snippets.

### Phase 7 — Performance & Stability
Identify:
- inefficient API calls
- redundant frontend renders
- blocking backend operations
- improper error handling

Provide optimizations where needed.

### Phase 8 — Final System Validation
Confirm the project runs end-to-end with:
- frontend rendering correctly
- backend responding correctly
- APIs integrated
- no runtime errors

Provide a final checklist confirming the project is production-ready.
