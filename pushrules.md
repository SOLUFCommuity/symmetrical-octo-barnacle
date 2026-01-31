
# Push Rules & Contribution Guidelines: APP QUANTUM

This document outlines the rules and best practices for contributing to the "Symmetrical Octo Barnacle" repository. Following these guidelines helps maintain a clean, readable, and manageable codebase.

## 📜 Table of Contents

1.  [General Philosophy](#-general-philosophy)
2.  [Branching Strategy](#-branching-strategy)
3.  [Commit Message Format](#-commit-message-format)
4.  [Pull Request (PR) Process](#-pull-request-pr-process)
5.  [Code Quality Standards](#-code-quality-standards)

---

### 💡 General Philosophy

- **Commit Often, Push Often:** Small, logical commits are easier to review and revert if necessary.
- **Write for Others:** Your code, commit messages, and PR descriptions should be clear to other developers.
- **Test Your Changes:** Ensure the application runs correctly before submitting a pull request.

### 🌿 Branching Strategy

Direct pushes to `main` and `develop` branches are **prohibited**. All work must be done on separate branches and merged via Pull Requests.

#### **Branch Naming Conventions:**

-   **Features:** For new functionality.
    -   Format: `feature/<short-description>`
    -   Example: `feature/add-quantum-telemetry-export`

-   **Fixes:** For bug fixes.
    -   Format: `fix/<issue-number-or-description>`
    -   Example: `fix/qber-calculation-error`

-   **Documentation:** For changes to documentation (e.g., `readme.md`).
    -   Format: `docs/<description>`
    -   Example: `docs/update-setup-instructions`

-   **Refactoring:** For code changes that neither fix a bug nor add a feature.
    -   Format: `refactor/<area-of-refactor>`
    -   Example: `refactor/optimize-dashboard-rendering`

-   **Chores:** For build process, tooling, or dependency updates.
    -   Format: `chore/<description>`
    -   Example: `chore/update-react-version`

### ✍️ Commit Message Format

We follow the **Conventional Commits** specification. This creates an explicit commit history that is easy to read and automate.

#### **Format:**

```
<type>(<scope>): <subject>

[optional body]

[optional footer]
```

-   **Type:** Must be one of the following:
    -   `feat`: A new feature.
    -   `fix`: A bug fix.
    -   `docs`: Documentation only changes.
    -   `style`: Changes that do not affect the meaning of the code (white-space, formatting, etc).
    -   `refactor`: A code change that neither fixes a bug nor adds a feature.
    -   `perf`: A code change that improves performance.
    -   `test`: Adding missing tests or correcting existing tests.
    -   `chore`: Changes to the build process or auxiliary tools and libraries.

-   **Scope (optional):** A noun describing the section of the codebase affected.
    -   Examples: `simulator`, `dashboard`, `encryption`, `ci`

-   **Subject:** A short, imperative-tense description of the change (max 50 characters).

#### **Examples:**

-   `feat(simulator): add noise model configuration panel`
-   `fix(encryption): handle invalid key injection from QKD`
-   `docs(readme): add file structure diagram`
-   `style(dashboard): reformat threat monitoring chart component`
-   `refactor(AISecurityAudit): move Gemini API call to a separate hook`

### 🔄 Pull Request (PR) Process

1.  **Create a PR:** Open a Pull Request from your `feature/...` or `fix/...` branch into the `develop` branch.
2.  **Write a Clear Description:**
    -   The PR title should be concise and follow the commit message format.
    -   The description should explain *what* the change is and *why* it's being made.
    -   If it resolves an issue, link it (e.g., "Closes #42").
3.  **Ensure Checks Pass:** All automated checks (linting, building, etc.) must pass.
4.  **Request a Review:** Request a review from at least one other team member.
5.  **Merge:** Once approved and all checks are green, the PR can be squashed and merged by a maintainer.

### ⭐ Code Quality Standards

-   **Follow Existing Style:** Maintain the existing code style and conventions used throughout the project.
-   **No commented-out code:** Remove dead or commented-out code before committing.
-   **Readable and Self-Documenting:** Write code that is easy to understand. Add comments only for complex logic that isn't self-explanatory.
-   **No Console Logs:** Remove `console.log` and other debugging statements before creating a PR.
