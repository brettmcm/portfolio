# Preview workflow

The user wants a working preview link after every batch of website edits, on any branch, without needing to ask. They review on iOS and iPadOS in Safari.

- Complete appropriate validation, commit the edits, and push the working branch to GitHub to trigger a Vercel preview. The user authorizes these commits, branch pushes, and preview deployments as part of making edits.
- Keep preview work on a non-production branch. If working on `main`, create a preview branch before pushing. Never merge into `main`, promote a deployment, or publish to the live site unless the user requests it.
- Use the existing Vercel project `portfolio-preview` (`prj_I0MAN1ObqWYbmmQ2T3QfSXplsJgZ`) in team `team_SNLOe8hkZF5fyrz5kfPIi5YC`, connected to `brettmcm/portfolio`. Do not create a new project for each edit or branch.
- Wait for the deployment for the pushed commit to be `READY`, and verify that it serves the updated content. If Git integration does not start a deployment, create a preview deployment for that branch and commit through the connected Vercel tools. In the deployment API, omit `target` for preview; do not set it to `production`.
- Include a clickable HTTPS preview link in the final response. Prefer the branch alias when verified; otherwise use the deployment URL. Explain that Vercel sign-in may be required if relevant.
- Localhost links do not work on the user's separate iPhone or iPad. Do not offer localhost as the completed preview.
- If deployment or verification is blocked, state the specific blocker and do not claim an older preview contains the new edits.
