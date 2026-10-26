---
doc: ship
status: in_progress
---

# JobPulse — Delivery Checklist

Technical delivery notes only. Project descriptions, narration, submission answers and exit-survey responses must be written by the learner.

## Build readiness
- [x] Scope, PRD, specification and build checklist approved.
- [x] All build slices, hands-on review, final review and learning wrap-up completed.
- [x] User explicitly approved the English version and the end of 5-build.
- [x] Existing checks passed for application revision `ef1dfc8`: 9 Node tests, Vite production build and the full Chrome journey. Local server responds with HTTP 200 during shipping preparation.
- [x] App map refreshed, checked offline and shared: `devpost/app-map.html`.

## Public repository and license
- [x] Reviewed tracked filenames and all four existing commits. The learner profile and .env files have never been tracked; ignore rules remain active. History search found no matches for the credential patterns checked. This is a targeted audit, not a guarantee against every possible secret format.
- [x] Course tooling folders and other unrelated untracked files are excluded from intended staging.
- [ ] Confirm code license and copyright holder. Agent recommendation: MIT, copyright 2026 JobPulse contributors; awaiting user agreement.
- [ ] Add the approved LICENSE and identify third-party font licenses separately in technical documentation.
- [x] Preserved both font copyright notices and SIL OFL 1.1 in `public/licenses/FONTS-OFL.txt`, included in production builds; README identifies them separately. Code license still awaits approval.
- [ ] Authenticate GitHub CLI interactively in the user's terminal/browser. Do not paste tokens into chat.
- [ ] Obtain explicit authorization to create a public repository and push the included code and history.
- [ ] Check whether JobPulse already exists on the authenticated account before creating it.
- [ ] Create/link the authorized public repository, push intended commits and verify anonymous access.
- Repository URL: pending.

GitHub CLI 2.103.3 is available as a portable copy outside the project. No GitHub account is currently authenticated and no remote is configured. Source: https://github.com/cli/cli/releases/tag/v2.103.3.

## Demo video — recording mechanics
- [ ] Check the actual Devpost form for its required video duration, format and hosting constraints. The actual hackathon/form URL has not been provided or verified; do not assume a duration limit.
- [ ] Confirm the recording sequence with the learner, using the already-approved journey below.
- [ ] Record the functioning application in the browser, with the DEMO notice visible. Use the learner's own narration if any; this document is not a narration script.
- [ ] Upload the short recording and verify that reviewers can open it without signing in.
- Video URL: pending.

Suggested screen actions, from the approved core journey:
1. Open `http://127.0.0.1:5173` and use Reset DEMO if necessary.
2. Show Company dashboard: 8 reviews, 5 approvals and 3 rejections.
3. In Review offers, Reject an offer, select Salary and add a brief recommendation without personal information; Submit review.
4. Return to Company dashboard: show 9 reviews, 4 rejections, the updated Salary count and the new comment.
5. Approve another offer, reload to show persistence, finish the round and show View results and Reset DEMO.

On Windows, Xbox Game Bar (`Win+G`) can record an active browser window; `Win+Alt+R` starts/stops recording where supported. Keep unrelated windows and account details out of the capture. If the shortcut is unavailable, use the screen recorder already available on the computer. A local recording is sufficient; deployment is optional.

## Devpost submission — learner-owned
- [ ] Open the actual hackathon's submission form and check its current required fields.
- [ ] Learner writes/confirms the project name, short description and all other required answers. The agent may point out gaps and correct spelling/grammar, but does not draft or rewrite submission copy.
- [ ] Add the accessible video URL and public GitHub URL.
- [ ] Learner completes the exit survey.
- [ ] Learner submits on Devpost and confirms completion. Do not mark submitted before confirmation.
- Submission URL: pending.

## Current blockers
License/publication authorization, interactive GitHub authentication, actual Devpost form URL and learner-recorded video are still needed. No public repository has been created or pushed, and no Devpost submission has been made.
